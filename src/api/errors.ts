import axios, { type AxiosError } from 'axios';

// ——— Custom API Error ———

export class ApiError extends Error {
  public readonly statusCode: number | null;
  public readonly endpoint: string;
  public readonly isNetworkError: boolean;
  public readonly isTimeoutError: boolean;
  public readonly isServerError: boolean;
  public readonly originalError: AxiosError | Error;

  constructor(error: AxiosError | Error, endpoint: string = 'unknown') {
    const message = extractErrorMessage(error);
    super(message);
    this.name = 'ApiError';
    this.endpoint = endpoint;
    this.originalError = error;

    if (axios.isAxiosError(error)) {
      this.statusCode = error.response?.status ?? null;
      this.isNetworkError = !error.response && error.code !== 'ECONNABORTED';
      this.isTimeoutError = error.code === 'ECONNABORTED';
      this.isServerError = (error.response?.status ?? 0) >= 500;
    } else {
      this.statusCode = null;
      this.isNetworkError = false;
      this.isTimeoutError = false;
      this.isServerError = false;
    }
  }
}

// ——— Error Message Extraction ———

function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;

    // Network error (no response received)
    if (!axiosError.response) {
      if (axiosError.code === 'ECONNABORTED') {
        return 'Request timed out. The server took too long to respond.';
      }
      if (!navigator.onLine) {
        return 'You are offline. Please check your internet connection.';
      }
      return 'Unable to connect to the server. Please make sure the canteen server is running.';
    }

    // Server responded with an error
    const { status, data } = axiosError.response;

    // Try to extract message from response body
    const serverMessage = data?.message || data?.error;
    if (serverMessage && typeof serverMessage === 'string') {
      return serverMessage;
    }

    // Map HTTP status codes to user-friendly messages
    return getStatusCodeMessage(status);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

function getStatusCodeMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input and try again.',
    401: 'You are not authorized. Please log in again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'A conflict occurred. The data may have been modified by someone else.',
    422: 'The data provided is invalid. Please check your input.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'An internal server error occurred. Please try again later.',
    502: 'The server is temporarily unavailable. Please try again later.',
    503: 'The service is currently unavailable. Please try again later.',
  };

  if (status >= 500) {
    return messages[status] || 'A server error occurred. Please try again later.';
  }

  return messages[status] || `Request failed (Error ${status}). Please try again.`;
}

// ——— Error Classification Helpers ———

/** Check if an error is retryable (network/server errors, not client errors) */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.isNetworkError || error.isTimeoutError || error.isServerError;
  }
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (!status) return true;  // Network errors are retryable
    return status >= 500;       // Server errors are retryable
  }
  return false;
}

/** Get a user-friendly error message from any error type */
export function getUserMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  return extractErrorMessage(error);
}
