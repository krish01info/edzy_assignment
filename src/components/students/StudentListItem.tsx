import type { Student } from '../../types';
import { getInitials, getAvatarColor } from '../../utils/avatar';

interface StudentListItemProps {
  student: Student;
  onView: (id: number) => void;
}

export default function StudentListItem({ student, onView }: StudentListItemProps) {
  const initials = getInitials(student.name);
  const colorClass = getAvatarColor(student.id);

  return (
    <div className="group bg-surface-800/40 border border-surface-700/40 rounded-xl p-4 transition-all duration-200 hover:bg-surface-800/70 hover:border-surface-600/50 animate-fade-in">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0 shadow-lg`}
        >
          <span className="text-white text-sm font-bold">{initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-surface-100 truncate group-hover:text-white transition-colors">
            {student.name}
          </h3>
          <div className="flex items-center gap-3 mt-0.5">
            <code className="text-xs font-mono text-surface-500 bg-surface-800 px-2 py-0.5 rounded border border-surface-700/50">
              {student.referralCode}
            </code>
            <span className="text-xs text-surface-500">
              Spent: <span className="text-brand-400 font-semibold">${student.totalSpent.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* View button */}
        <button
          onClick={() => onView(student.id)}
          className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white bg-surface-700/50 hover:bg-surface-600/70 rounded-lg transition-all duration-200 flex-shrink-0 flex items-center gap-1.5 active:scale-95"
        >
          View
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
