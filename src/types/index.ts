// ——— Domain Models ———

export interface Snack {
  id: number;
  name: string;
  price: number;
  ordersCount: number;
}

export interface Student {
  id: number;
  name: string;
  referralCode: string;
  totalSpent: number;
}

export interface Order {
  id: number;
  studentId: number;
  snackId: number;
  quantity: number;
  payableAmount: number;
  createdAt: string;
}

export interface StudentDetail extends Student {
  orders: Order[];
}

// ——— Form Payloads ———

export interface CreateStudentPayload {
  name: string;
  referralCode: string;
}

export interface CreateOrderPayload {
  studentId: number;
  snackId: number;
  quantity: number;
}

// ——— UI State ———

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  dismissing?: boolean;
}

// ——— Snack emoji mapping ———

export const SNACK_EMOJIS: Record<string, string> = {
  'Chicken Sandwich': '🥪',
  'Veggie Wrap': '🌯',
  'Fruit Juice Box': '🧃',
  'Cheese Pizza Slice': '🍕',
  'Chocolate Muffin': '🧁',
  'Granola Bar': '🍫',
  'Iced Tea': '🧊',
  'French Fries': '🍟',
};

export const getSnackEmoji = (name: string): string => {
  return SNACK_EMOJIS[name] || '🍽️';
};
