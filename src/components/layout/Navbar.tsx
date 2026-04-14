import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../../store/useStore';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, openCartModal } = useStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
      ? 'text-brand-400 bg-brand-500/10'
      : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/snacks" className="flex items-center gap-2.5 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🍱</span>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-brand-400 to-amber-400 bg-clip-text text-transparent">
                CanteenHub
              </span>
              <span className="hidden sm:block text-[10px] text-surface-500 font-medium tracking-wider uppercase -mt-0.5">
                School Ordering
              </span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/snacks" className={linkClass}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                Snacks
              </span>
            </NavLink>
            <NavLink to="/students" className={linkClass}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                Students
              </span>
            </NavLink>
          </div>

          {/* Right side actions - Cart & Mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCartModal}
              className="relative p-2 text-surface-400 hover:text-white transition-colors group"
              aria-label="Open Cart"
            >
              <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/10 rounded-lg transition-colors" />
              <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white shadow-sm shadow-brand-500/50 animate-bounce-in">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 animate-slide-down">
            <NavLink
              to="/snacks"
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center gap-2">🍕 Snacks</span>
            </NavLink>
            <NavLink
              to="/students"
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center gap-2">👥 Students</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

