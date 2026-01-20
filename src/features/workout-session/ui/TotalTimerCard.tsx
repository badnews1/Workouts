/**
 * TotalTimerCard - Карточка общего таймера тренировки
 */

import { Timer, CheckCircle2 } from 'lucide-react';
import { formatTime } from '@/shared/lib/utils/time';
import { Card } from '@/components/ui/card';

interface TotalTimerCardProps {
  totalTime: number;
  isCompleted: boolean;
}

export function TotalTimerCard({ totalTime, isCompleted }: TotalTimerCardProps) {
  return (
    <Card 
      size="lg"
      className="p-4 flex items-center gap-3 mb-6"
      backgroundColor={isCompleted ? 'var(--brand-green)' : 'var(--brand-blue)'}
    >
      <div 
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-black border-[3px] border-black"
      >
        {isCompleted ? (
          <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={3} />
        ) : (
          <Timer className="w-5 h-5 text-white" strokeWidth={2.5} />
        )}
      </div>
      <div className="flex-1">
        <p className="text-xs font-black uppercase mb-0.5 text-black">
          {isCompleted ? 'Тренировка завершена' : 'Время тренировки'}
        </p>
        <p className="text-2xl font-black tracking-tight text-black">{formatTime(totalTime)}</p>
      </div>
    </Card>
  );
}