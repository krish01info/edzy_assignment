import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useStudents } from '../../hooks/useStudents';
import { useCheckoutCart } from '../../hooks/useCheckoutCart';
import { getSnackEmoji } from '../../types';
import Modal from '../ui/Modal';
import SubmitButton from '../ui/SubmitButton';

export default function CartModal() {
  const { cart, closeCartModal, updateCartQuantity, removeFromCart } = useStore();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { checkout, isCheckingOut } = useCheckoutCart();
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const cartTotal = cart.reduce((total, item) => total + item.snack.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!selectedStudentId) {
      alert('Please select a student');
      return;
    }
    checkout(parseInt(selectedStudentId), cart);
  };

  return (
    <Modal title="Your Cart" onClose={closeCartModal} stickyHeader>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4 opacity-50">🛒</div>
          <p className="text-surface-300">Your cart is empty.</p>
          <button 
            onClick={closeCartModal}
            className="mt-4 text-brand-400 hover:text-brand-300 font-semibold"
          >
            Browse snacks
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items List */}
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.snack.id} className="bg-surface-800/40 border border-surface-700/50 rounded-xl p-4 flex items-center gap-4">
                <div className="text-3xl">
                  {getSnackEmoji(item.snack.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-surface-100 font-semibold truncate">{item.snack.name}</h4>
                  <p className="text-brand-400 font-bold">${item.snack.price.toFixed(2)}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-surface-900 rounded-lg p-1 border border-surface-700">
                  <button 
                    onClick={() => updateCartQuantity(item.snack.id, item.quantity - 1)}
                    disabled={item.quantity <= 1 || isCheckingOut}
                    className="w-8 h-8 rounded-md hover:bg-surface-800 disabled:opacity-50 text-surface-200 transition-colors flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-white text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.snack.id, item.quantity + 1)}
                    disabled={item.quantity >= 5 || isCheckingOut}
                    className="w-8 h-8 rounded-md hover:bg-surface-800 disabled:opacity-50 text-surface-200 transition-colors flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.snack.id)}
                  disabled={isCheckingOut}
                  className="p-2 text-surface-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="h-px bg-surface-700/50 w-full" />

          {/* Student Selector */}
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">
              Select Student for Order <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all cursor-pointer"
              disabled={isCheckingOut || studentsLoading}
            >
              <option value="">Choose a student...</option>
              {students?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.referralCode})
                </option>
              ))}
            </select>
          </div>

          {/* Total & Checkout */}
          <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-surface-300 font-medium">Total Amount</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-amber-400 bg-clip-text text-transparent">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            <SubmitButton 
              isLoading={isCheckingOut} 
              loadingText="Placing Batch Order..."
              className="w-full"
              onClick={handleCheckout}
              disabled={!selectedStudentId || isCheckingOut}
            >
              Checkout Now
            </SubmitButton>
          </div>
        </div>
      )}
    </Modal>
  );
}
