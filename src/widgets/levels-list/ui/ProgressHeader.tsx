import { Award, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProgressHeaderProps {
  programName: string;
  programDescription?: string;
  currentLevel: number;
  totalLevels: number;
  totalWorkouts: number;
  completedWorkouts: number;
  color: string;
}

export function ProgressHeader({ 
  programName, 
  programDescription,
  currentLevel, 
  totalLevels, 
  totalWorkouts,
  completedWorkouts,
  color 
}: ProgressHeaderProps) {
  const progressPercentage = totalWorkouts > 0 
    ? Math.round((completedWorkouts / totalWorkouts) * 100) 
    : 0;

  const isCompleted = progressPercentage === 100;

  return (
    <Card 
      size="xl"
      backgroundColor={isCompleted ? 'var(--brand-green)' : 'var(--brand-yellow)'}
      className="p-5 mb-6"
    >
      {/* Верхняя часть - название программы */}
      <div className="mb-4">
        <h1 className="text-3xl font-black uppercase tracking-tight text-black mb-1">
          {programName}
        </h1>
        {programDescription && (
          <p className="text-sm font-bold text-gray-700">{programDescription}</p>
        )}
      </div>

      {/* Прогресс-бар */}
      <div className="mb-4 relative">
        <Progress 
          value={progressPercentage} 
          size="lg"
          variant={isCompleted ? 'secondary' : 'primary'}
          className="bg-gray-100"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-base font-black text-black">
            {progressPercentage}%
          </span>
        </div>
      </div>

      {/* Нижняя часть - статистика */}
      <div className="flex items-center gap-3">
        <Badge 
          size="md"
          className="flex-1 bg-black text-white justify-center gap-2 py-2"
        >
          <Award className="w-4 h-4" strokeWidth={2.5} />
          <span className="uppercase">
            Уровень {currentLevel} из {totalLevels}
          </span>
        </Badge>
        <Badge 
          size="md"
          className="flex-1 bg-black text-white justify-center gap-2 py-2"
        >
          <Flame className="w-4 h-4" strokeWidth={2.5} />
          <span className="uppercase">
            Тренировок: {completedWorkouts}
          </span>
        </Badge>
      </div>
    </Card>
  );
}