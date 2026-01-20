import { Calendar, Flame, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LevelProgressHeaderProps {
  currentPeriod: number;
  totalPeriods: number;
  progress: number;
  currentDay?: number;
  completedWorkouts?: number; // общее количество завершенных тренировок
  totalWorkouts?: number; // общее количество тренировок в уровне
  color: string;
  isIntroPeriod?: boolean; // Флаг для вводного периода
}

export function LevelProgressHeader({
  currentPeriod,
  totalPeriods,
  progress,
  currentDay,
  completedWorkouts,
  totalWorkouts,
  color,
  isIntroPeriod = false,
}: LevelProgressHeaderProps) {
  const isCompleted = progress === 100;

  return (
    <Card
      size="xl"
      backgroundColor={isCompleted ? 'var(--brand-green)' : 'var(--brand-yellow)'}
      className="mx-4 mt-6 mb-6 p-6"
    >
      <div>
        <div className="mb-4">
          <h2 className="text-3xl font-black tracking-tight uppercase text-black">
            Прогресс уровня
          </h2>
        </div>

        {/* Прогресс-бар */}
        <div className="mb-4 relative">
          <Progress 
            value={progress} 
            size="lg"
            variant={isCompleted ? 'secondary' : 'primary'}
            className="bg-gray-100"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-base font-black text-black">
              {progress}%
            </span>
          </div>
        </div>

        {/* Иконки статистики */}
        <div className="flex items-center gap-3">
          {currentDay !== undefined && (
            <Badge 
              size="md"
              className="flex-1 bg-black text-white justify-center gap-2 py-2"
            >
              <Calendar className="w-4 h-4" strokeWidth={2.5} />
              <span className="uppercase">День {currentDay}</span>
            </Badge>
          )}
          <Badge 
            size="md"
            className="flex-1 bg-black text-white justify-center gap-2 py-2"
          >
            <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            <span>
              {isIntroPeriod ? 'Вводный период' : `Период ${currentPeriod}`}
            </span>
          </Badge>
          {completedWorkouts !== undefined && totalWorkouts !== undefined && (
            <Badge 
              size="md"
              className="flex-1 bg-black text-white justify-center gap-2 py-2"
            >
              <Flame className="w-4 h-4" strokeWidth={2.5} />
              <span>{completedWorkouts} из {totalWorkouts} трен.</span>
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}