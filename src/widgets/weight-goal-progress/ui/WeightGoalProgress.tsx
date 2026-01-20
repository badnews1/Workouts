/**
 * WeightGoalProgress - Виджет прогресса к целевому весу
 * 
 * Отображает прогресс достижения целевого веса с прогресс-баром
 */

import { Weight, Calendar } from 'lucide-react';
import type { Goal } from '@/shared';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WeightGoalProgressProps {
  targetWeight: number;
  progress: number;
  remaining: number;
  isCompleted: boolean;
  daysRemaining: number | null;
  goal: Goal;
}

export function WeightGoalProgress({
  targetWeight,
  progress,
  remaining,
  isCompleted,
  daysRemaining,
  goal,
}: WeightGoalProgressProps) {
  return (
    <Card
      size="xl"
      className="p-6 mb-6"
      backgroundColor={isCompleted ? 'var(--brand-green)' : 'var(--brand-yellow)'}
    >
      <div className="mb-4">
        <h2 className="text-3xl font-black tracking-tight uppercase text-black">
          {isCompleted ? 'Цель достигнута!' : `ЦЕЛЬ: ${targetWeight} КГ`}
        </h2>
        {!isCompleted && (
          <p className="text-sm font-bold text-black mt-1">
            {goal === 'muscle_gain' && 'Набор массы'}
            {goal === 'weight_loss' && 'Похудение'}
            {goal === 'maintain' && 'Поддержание формы'}
          </p>
        )}
      </div>

      {/* Прогресс-бар */}
      <div className="relative mb-4">
        <Progress
          value={progress}
          size="lg"
          variant={isCompleted ? 'secondary' : 'primary'}
          className="bg-gray-100"
          shadow={false}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-black text-black">
            {progress}%
          </span>
        </div>
      </div>

      {/* Статистика */}
      <div className="flex items-center gap-3">
        {!isCompleted && (
          <div 
            className="flex items-center gap-2 px-3 py-2 flex-1"
            style={{
              backgroundColor: 'var(--brand-black)',
              border: '3px solid var(--brand-black)',
            }}
          >
            <Weight className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="text-xs font-black text-white">
              Осталось: {remaining.toFixed(1)} кг
            </span>
          </div>
        )}
        
        {daysRemaining !== null && (
          <div 
            className="flex items-center gap-2 px-3 py-2 flex-1"
            style={{
              backgroundColor: 'var(--brand-black)',
              border: '3px solid var(--brand-black)',
            }}
          >
            <Calendar className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="text-xs font-black text-white">
              {daysRemaining > 0 ? `${daysRemaining} дн.` : daysRemaining === 0 ? 'Сегодня' : 'Просрочено'}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}