import type { Snack } from '../../types';
import { useStudents } from '../../hooks/useStudents';
import { useSnacks } from '../../hooks/useSnacks';
import { useCreateOrder } from '../../hooks/useOrders';
import OrderForm from './OrderForm';
import Modal from '../ui/Modal';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import ErrorState from '../ui/ErrorState';

interface OrderModalProps {
  preSelectedSnack?: Snack;
  defaultStudentId?: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OrderModal({
  preSelectedSnack,
  defaultStudentId,
  onClose,
  onSuccess,
}: OrderModalProps) {
  const { data: students, isLoading: studentsLoading, isError: isStudentsError, error: studentsError, refetch: refetchStudents } = useStudents();
  const { data: snacks, isLoading: snacksLoading, isError: isSnacksError, error: snacksError, refetch: refetchSnacks } = useSnacks();
  const createOrder = useCreateOrder();

  const handleSubmit = async (studentId: number, snackId: number, quantity: number) => {
    try {
      await createOrder.mutateAsync({
        studentId,
        snackId,
        quantity,
      });
      onSuccess();
      onClose();
    } catch {
      // Error handled by mutation toast
    }
  };

  return (
    <Modal title="Place Order" onClose={onClose} stickyHeader>
      {studentsLoading || snacksLoading ? (
        <LoadingSkeleton rows={3} variant="list" />
      ) : isStudentsError || isSnacksError ? (
        <ErrorState message="Failed to load necessary data" error={studentsError || snacksError} onRetry={() => { refetchStudents(); refetchSnacks(); }} />
      ) : students && students.length > 0 && snacks && snacks.length > 0 ? (
        <OrderForm
          students={students}
          snacks={snacks}
          preSelectedSnack={preSelectedSnack}
          defaultStudentId={defaultStudentId}
          onSubmit={handleSubmit}
          isLoading={createOrder.isPending}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-surface-400">No students found. Create a student first.</p>
        </div>
      )}
    </Modal>
  );
}
