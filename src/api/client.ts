import axios from 'axios';
import type { Snack, Student, StudentDetail, Order, CreateStudentPayload, CreateOrderPayload } from '../types';
import { ApiError, isRetryableError } from './errors';

// ——— Axios Instance ———

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10 second timeout
});

// ——— Response Interceptor — wraps all Axios errors into ApiError ———

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const endpoint = error.config?.url || 'unknown';
    throw new ApiError(error, endpoint);
  }
);

// ——— Retry Helper (for idempotent requests) ———

async function withRetry<T>(
  fn: () => Promise<T>,
  { maxRetries = 2, delayMs = 500, shouldRetry = isRetryableError }: {
    maxRetries?: number;
    delayMs?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {},
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries && shouldRetry(error)) {
        // Exponential backoff: 500ms, 1000ms, ...
        await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
        continue;
      }

      throw error;
    }
  }

  throw lastError;
}

// ——— Snacks ———

export const getSnacks = async (): Promise<Snack[]> => {
  const { data } = await api.get<Snack[]>('/snacks');
  return data;
};

// ——— Students ———

export const getStudents = async (): Promise<Student[]> => {
  const { data } = await api.get<Student[]>('/students');
  return data;
};

export const getStudent = async (id: number): Promise<StudentDetail> => {
  if (!id || id <= 0) {
    throw new ApiError(new Error('Invalid student ID'), `/students/${id}`);
  }

  // Fetch student and their orders in parallel
  const [studentRes, ordersRes] = await Promise.all([
    api.get<Student>(`/students/${id}`),
    api.get<Order[]>(`/orders?studentId=${id}`),
  ]);

  // Recompute totalSpent from orders
  const orders = ordersRes.data;
  const totalSpent = orders.reduce((sum, o) => sum + o.payableAmount, 0);

  return {
    ...studentRes.data,
    totalSpent,
    orders,
  };
};

export const createStudent = async (payload: CreateStudentPayload): Promise<Student> => {
  // Validate payload before sending
  if (!payload.name || payload.name.trim().length < 2) {
    throw new ApiError(
      new Error('Student name must be at least 2 characters'),
      '/students'
    );
  }

  const { data } = await api.post<Student>('/students', {
    ...payload,
    name: payload.name.trim(),
    totalSpent: 0,
  });
  return data;
};

// ——— Orders ———

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  // Validate payload
  if (!payload.studentId || payload.studentId <= 0) {
    throw new ApiError(new Error('Please select a valid student'), '/orders');
  }
  if (!payload.snackId || payload.snackId <= 0) {
    throw new ApiError(new Error('Please select a valid snack'), '/orders');
  }
  if (!payload.quantity || payload.quantity < 1 || payload.quantity > 5) {
    throw new ApiError(new Error('Quantity must be between 1 and 5'), '/orders');
  }

  // Step 1: Fetch snack to compute payable amount
  const { data: snack } = await api.get<Snack>(`/snacks/${payload.snackId}`);
  const payableAmount = snack.price * payload.quantity;

  // Step 2: Create the order (the critical step)
  const { data: order } = await api.post<Order>('/orders', {
    ...payload,
    payableAmount,
    createdAt: new Date().toISOString(),
  });

  // Step 3 & 4: Update snack and student counts (non-critical, best-effort with retry)
  // These are "side-effect" updates — if they fail, the order is still valid.
  // The data will self-correct on the next page load since we recompute from orders.

  try {
    await withRetry(() =>
      api.patch(`/snacks/${payload.snackId}`, {
        ordersCount: snack.ordersCount + payload.quantity,
      })
    );
  } catch (error) {
    console.warn('[createOrder] Failed to update snack ordersCount. Will self-correct on next fetch.', error);
  }

  try {
    const { data: student } = await api.get<Student>(`/students/${payload.studentId}`);
    await withRetry(() =>
      api.patch(`/students/${payload.studentId}`, {
        totalSpent: student.totalSpent + payableAmount,
      })
    );
  } catch (error) {
    console.warn('[createOrder] Failed to update student totalSpent. Will self-correct on next fetch.', error);
  }

  return order;
};
