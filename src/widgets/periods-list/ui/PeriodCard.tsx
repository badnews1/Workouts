import { Check, Lock, Flame } from 'lucide-react';
import { Period } from '../../../entities/workout';

interface PeriodCardProps {
  period: Period;
  color: string;
  onClick?: () => void;
}

export function PeriodCard({ period, color, onClick }: PeriodCardProps) {
  // Определяем цвета и иконки в зависимости от состояния
  const isCompleted = period.isCompleted;
  const isCurrent = period.isCurrent && !isCompleted;
  const isLocked = !period.isUnlocked && !isCompleted && !isCurrent;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getBorderColor = () => {
    if (isCompleted) return '#10b981'; // зеленый
    if (isCurrent) return color; // цвет программы
    return '#e5e7eb'; // серый
  };

  const getBackgroundColor = () => {
    if (isCompleted) return hexToRgba('#10b981', 0.05); // светло-зеленый
    if (isCurrent) return hexToRgba(color, 0.05); // светлый цвет программы
    return '#f9fafb'; // светло-серый
  };

  const getIconBackgroundColor = () => {
    if (isCompleted) return '#10b981'; // зеленый фон
    if (isCurrent) return color; // цвет программы
    return '#e5e7eb'; // серый
  };

  const getStatusColor = () => {
    if (isCompleted) return '#10b981';
    if (isCurrent) return color;
    return '#9ca3af';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Завершено';
    if (isCurrent) return `День ${period.currentDay || 1}`;
    return 'Закрыто';
  };

  const renderIcon = () => {
    if (isCompleted) {
      return (
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: getIconBackgroundColor() }}
        >
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
      );
    }
    if (isCurrent) {
      return (
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: getIconBackgroundColor() }}
        >
          <Flame className="w-6 h-6 text-white" />
        </div>
      );
    }
    return (
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: getIconBackgroundColor() }}
      >
        <Lock className="w-5 h-5 text-gray-500" />
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className="w-full rounded-3xl p-5 transition-all"
      style={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: getBorderColor(),
        backgroundColor: getBackgroundColor(),
      }}
    >
      <div className="flex items-start gap-4">
        {/* Иконка */}
        {renderIcon()}

        {/* Основная информация */}
        <div className="flex-1 text-left">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {period.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {period.duration || period.frequency}
            {period.duration && period.frequency && ` • ${period.frequency}`}
          </p>
        </div>

        {/* Правая часть - прогресс или статус */}
        <div className="flex flex-col items-end gap-1">
          {/* Процент или прогресс-бар */}
          {isCurrent && period.progress !== undefined ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${period.progress}%`,
                      backgroundColor: color 
                    }}
                  />
                </div>
                <span 
                  className="text-sm font-semibold"
                  style={{ color: getStatusColor() }}
                >
                  {period.progress}%
                </span>
              </div>
            </>
          ) : isCompleted ? (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-16 h-1.5 bg-green-600 rounded-full" />
              <span className="text-sm font-semibold text-green-600">100%</span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-gray-400 mb-1">0%</span>
          )}
          
          {/* Статус */}
          <span 
            className="text-sm font-medium"
            style={{ color: getStatusColor() }}
          >
            {getStatusText()}
          </span>
        </div>
      </div>
    </button>
  );
}