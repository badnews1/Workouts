import { Check, Lock, Flame } from 'lucide-react';
import { Period } from '@/entities/workout';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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

  // Определяем state для Card
  const getCardState = (): 'completed' | 'current' | 'locked' | 'default' => {
    if (isCompleted) return 'completed';
    if (isCurrent) return 'current';
    if (isLocked) return 'locked';
    return 'default';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Завершено';
    if (isCurrent) return 'Начато';
    return 'Закрыто';
  };

  const renderIcon = () => {
    if (isCompleted) {
      return (
        <div 
          className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-[3px] border-black"
          style={{ 
            backgroundColor: 'var(--brand-white)',
          }}
        >
          <Check className="w-6 h-6" style={{ color: 'var(--brand-green)' }} strokeWidth={3} />
        </div>
      );
    }
    if (isCurrent) {
      return (
        <div 
          className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-[3px] border-black"
          style={{ 
            backgroundColor: 'var(--brand-black)',
          }}
        >
          <Flame className="w-6 h-6" style={{ color: 'var(--brand-yellow)' }} strokeWidth={2.5} />
        </div>
      );
    }
    return (
      <div 
        className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-[3px] border-black"
        style={{ 
          backgroundColor: 'var(--brand-gray)',
        }}
      >
        <Lock className="w-5 h-5 text-gray-400" strokeWidth={2.5} />
      </div>
    );
  };

  return (
    <Card
      as="button"
      onClick={onClick}
      disabled={isLocked}
      state={getCardState()}
      size="lg"
      className={`w-full p-4 ${isLocked ? 'cursor-not-allowed' : ''}`}
      style={{
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Иконка */}
        {renderIcon()}

        {/* Основная информация */}
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-black uppercase ${isLocked ? 'text-gray-400' : 'text-black'}`}>
              {period.name}
            </h3>
            {/* Процент или прогресс-бар */}
            {isCurrent && period.progress !== undefined ? (
              <div className="flex items-center gap-2">
                <Progress 
                  value={period.progress} 
                  size="sm"
                  variant="primary"
                  className="w-16 bg-white"
                />
                <span 
                  className="text-sm font-black text-black"
                >
                  {period.progress}%
                </span>
              </div>
            ) : isCompleted ? (
              <div className="flex items-center gap-2">
                <Progress 
                  value={100} 
                  size="sm"
                  variant="primary"
                  className="w-16 bg-white"
                />
                <span className="text-sm font-black text-black">100%</span>
              </div>
            ) : (
              <span className="text-sm font-black text-gray-400">0%</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-xs font-bold ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
              {period.duration || period.frequency}
              {period.duration && period.frequency && ` • ${period.frequency}`}
            </p>
            {/* Статус */}
            <Badge
              size="sm"
              style={{
                backgroundColor: isCompleted ? 'var(--brand-white)' : isCurrent ? 'var(--brand-black)' : 'var(--brand-gray)',
                color: isCompleted ? 'var(--brand-green)' : isCurrent ? 'var(--brand-white)' : '#9ca3af',
              }}
            >
              {getStatusText()}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}