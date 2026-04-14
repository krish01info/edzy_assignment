import type { Order } from '../../types';
import { useSnacks } from '../../hooks/useSnacks';
import { formatOrderDate } from '../../utils/date';
import EmptyState from '../ui/EmptyState';

interface OrderHistoryTableProps {
  orders: Order[];
  onPlaceOrder?: () => void;
}

export default function OrderHistoryTable({ orders, onPlaceOrder }: OrderHistoryTableProps) {
  const { data: snacks } = useSnacks();

  const getSnackName = (snackId: number): string => {
    const snack = snacks?.find((s) => s.id === snackId);
    return snack?.name || `Snack #${snackId}`;
  };


  if (orders.length === 0) {
    return (
      <EmptyState
        message="No orders yet. Place the first order for this student!"
        ctaLabel={onPlaceOrder ? "Place Order" : undefined}
        onCta={onPlaceOrder}
        icon="🛒"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-surface-700/50">
            <th className="text-left text-xs font-semibold text-surface-500 uppercase tracking-wider pb-3 pr-4">Snack</th>
            <th className="text-center text-xs font-semibold text-surface-500 uppercase tracking-wider pb-3 px-4">Qty</th>
            <th className="text-right text-xs font-semibold text-surface-500 uppercase tracking-wider pb-3 px-4">Amount</th>
            <th className="text-right text-xs font-semibold text-surface-500 uppercase tracking-wider pb-3 pl-4">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-800/50">
          {orders.map((order) => (
            <tr key={order.id} className="group hover:bg-surface-800/30 transition-colors">
              <td className="py-3 pr-4">
                <span className="text-sm text-surface-200 font-medium">{getSnackName(order.snackId)}</span>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="text-sm text-surface-400 bg-surface-800 px-2.5 py-0.5 rounded-full">
                  ×{order.quantity}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-semibold text-brand-400">${order.payableAmount.toFixed(2)}</span>
              </td>
              <td className="py-3 pl-4 text-right">
                <span className="text-xs text-surface-500">{formatOrderDate(order.createdAt)}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-surface-700/50">
            <td colSpan={2} className="pt-3 text-sm font-semibold text-surface-300">Total</td>
            <td className="pt-3 text-right text-sm font-bold text-brand-400">
              ${orders.reduce((sum, o) => sum + o.payableAmount, 0).toFixed(2)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
