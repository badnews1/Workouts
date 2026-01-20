import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
}

export function Header({ title, subtitle, onBack, leftAction, rightAction }: HeaderProps) {
  // Если передан onBack, создаем стандартную кнопку назад
  const backButton = onBack ? (
    <button
      onClick={onBack}
      className="p-2"
      style={{
        backgroundColor: 'var(--brand-yellow)',
        border: '3px solid var(--brand-black)',
      }}
      aria-label="Назад"
    >
      <ChevronLeft className="w-5 h-5" style={{ color: 'var(--brand-black)' }} strokeWidth={3} />
    </button>
  ) : null;

  // leftAction имеет приоритет над onBack для кастомных случаев
  const finalLeftAction = leftAction || backButton;

  return (
    <header 
      className="border-b-4 border-black sticky top-0 z-10"
      style={{ backgroundColor: 'var(--brand-black)' }}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {finalLeftAction && <div>{finalLeftAction}</div>}
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--brand-white)' }}>{title}</h1>
            {subtitle && <p className="text-sm font-bold text-gray-400 mt-1">{subtitle}</p>}
          </div>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
}