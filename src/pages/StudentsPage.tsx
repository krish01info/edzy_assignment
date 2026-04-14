import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents';
import { useStore } from '../store/useStore';
import { formatOrderDate } from '../utils/date';
import StudentListItem from '../components/students/StudentListItem';
import CreateStudentForm from '../components/students/CreateStudentForm';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

export default function StudentsPage() {
  const { data: students, isLoading, isError, error, refetch } = useStudents();
  const {
    recentOrders,
    clearRecentOrders,
    isCreateStudentModalOpen: showCreateForm,
    openCreateStudentModal: setShowCreateForm,
    closeCreateStudentModal,
  } = useStore();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Students <span className="text-2xl">🎓</span>
              </h1>
              <p className="text-surface-400">
                Manage students and view their spending
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm()}
              className="px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-95 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="hidden sm:inline">New Student</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {/* Student list */}
          {isLoading ? (
            <LoadingSkeleton rows={5} variant="list" />
          ) : isError ? (
            <ErrorState
              message="Failed to load students."
              error={error}
              onRetry={() => refetch()}
            />
          ) : !students || students.length === 0 ? (
            <EmptyState
              message="No students registered yet. Create your first student!"
              ctaLabel="Create Student"
              onCta={() => setShowCreateForm()}
              icon="👥"
            />
          ) : (
            <div className="space-y-3">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="animate-slide-up opacity-0 [animation-fill-mode:forwards]"
                >
                  <StudentListItem
                    student={student}
                    onView={(id) => navigate(`/students/${id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders Sidebar */}
        {recentOrders.length > 0 && (
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-surface-800/40 border border-surface-700/40 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Orders
                </h3>
                <button
                  onClick={clearRecentOrders}
                  className="text-xs text-surface-500 hover:text-red-400 transition-colors px-2 py-1 rounded bg-surface-800/50 hover:bg-surface-700 active:scale-95"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-3">
                {recentOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="bg-surface-900/50 border border-surface-700/30 rounded-lg p-3 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-surface-300">Qty: {order.quantity}</span>
                      <span className="text-brand-400 font-semibold">${order.payableAmount.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-1">
                      {formatOrderDate(order.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Student Modal */}
      {showCreateForm && (
        <CreateStudentForm
          onSuccess={closeCreateStudentModal}
          onClose={closeCreateStudentModal}
        />
      )}
    </div>
  );
}
