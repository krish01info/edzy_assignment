import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useStudent } from '../hooks/useStudents';
import { useSnacks } from '../hooks/useSnacks';
import { getInitials, getAvatarColor } from '../utils/avatar';
import OrderHistoryTable from '../components/orders/OrderHistoryTable';
import OrderModal from '../components/orders/OrderModal';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorState from '../components/ui/ErrorState';
import type { Snack } from '../types';

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const studentId = parseInt(id || '0');
  const { data: student, isLoading, isError, error, refetch } = useStudent(studentId);
  const { orderModalOptions, openOrderModal, closeOrderModal } = useStore();

  const handlePlaceOrder = () => {
    openOrderModal({ defaultStudentId: student?.id });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton rows={4} variant="list" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState
          message="Failed to load student details."
          error={error}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const initials = getInitials(student.name);
  const colorClass = getAvatarColor(student.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/students')}
        className="flex items-center gap-2 text-sm text-surface-400 hover:text-surface-200 transition-colors mb-6 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Students
      </button>

      {/* Student header card */}
      <div className="bg-surface-800/40 border border-surface-700/40 rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-xl flex-shrink-0`}>
            <span className="text-white text-xl font-bold">{initials}</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{student.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <code className="text-sm font-mono text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-lg">
                {student.referralCode}
              </code>
              <span className="text-surface-400 text-sm">
                Total spent: <span className="text-brand-400 font-bold text-lg">${student.totalSpent.toFixed(2)}</span>
              </span>
            </div>
          </div>

          {/* Place order button */}
          <button
            onClick={handlePlaceOrder}
            className="px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-95 flex items-center gap-2 text-sm flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Place Order
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-surface-700/40">
          <div className="text-center">
            <p className="text-2xl font-bold text-surface-200">{student.orders.length}</p>
            <p className="text-xs text-surface-500 mt-0.5">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-400">${student.totalSpent.toFixed(2)}</p>
            <p className="text-xs text-surface-500 mt-0.5">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-surface-200">
              ${student.orders.length > 0 ? (student.totalSpent / student.orders.length).toFixed(2) : '0.00'}
            </p>
            <p className="text-xs text-surface-500 mt-0.5">Avg. Order</p>
          </div>
        </div>
      </div>

      {/* Order history */}
      <div className="bg-surface-800/40 border border-surface-700/40 rounded-2xl p-6 sm:p-8 animate-slide-up">
        <h2 className="text-lg font-bold text-surface-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          Order History
        </h2>
        <OrderHistoryTable orders={student.orders} onPlaceOrder={handlePlaceOrder} />
      </div>

      {/* Order Modal */}
      {orderModalOptions && (
        <OrderModal
          preSelectedSnack={orderModalOptions.snack}
          defaultStudentId={orderModalOptions.defaultStudentId}
          onClose={closeOrderModal}
          onSuccess={() => {
            closeOrderModal();
            refetch();
          }}
        />
      )}
    </div>
  );
}
