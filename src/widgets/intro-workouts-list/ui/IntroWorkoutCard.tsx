import { Clock, Check, Lock, Play } from 'lucide-react';
import { Workout } from '@/entities/workout';
import { Card } from '@/components/ui/card';

interface IntroWorkoutCardProps {
  workout: Workout;
  isCompleted: boolean;
  isLocked: boolean;
  color: string;
  onClick?: () => void;
}

export function IntroWorkoutCard({ workout, isCompleted, isLocked, color, onClick }: IntroWorkoutCardProps) {
  // Подсчитываем общее время тренировки
  const calculateTotalTime = () => {
    let totalMinutes = 0;
    workout.exercises.forEach(exercise => {
      if (exercise.duration) {
        totalMinutes += Math.floor(exercise.duration / 60);
      }
      if (exercise.type === 'circuit' && exercise.exercises) {
        exercise.exercises.forEach(subEx => {
          if (subEx.duration) {
            totalMinutes += Math.floor(subEx.duration / 60);
          }
        });
      }
    });
    return totalMinutes;
  };

  // Подсчитываем количество упражнений
  const calculateExerciseCount = () => {
    // Считаем все упражнения верхнего уровня, независимо от типа
    return workout.exercises.length;
  };

  const totalMinutes = calculateTotalTime();
  const exerciseCount = calculateExerciseCount();

  // Определяем state для Card
  const getCardState = (): 'completed' | 'current' | 'locked' | 'default' => {
    if (isCompleted) return 'completed';
    if (isLocked) return 'locked';
    return 'current'; // активная тренировка - желтая
  };

  const renderIcon = () => {
    if (isCompleted) {
      return (
        <div 
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: 'var(--brand-white)',
            border: '3px solid var(--brand-black)',
          }}
        >
          <Check className="w-6 h-6" style={{ color: 'var(--brand-green)' }} strokeWidth={3} />
        </div>
      );
    }
    if (isLocked) {
      return (
        <div 
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: 'var(--brand-gray)',
            border: '3px solid var(--brand-black)',
          }}
        >
          <Lock className="w-5 h-5 text-gray-400" strokeWidth={2.5} />
        </div>
      );
    }
    return (
      <div 
        className="w-12 h-12 flex items-center justify-center flex-shrink-0"
        style={{ 
          backgroundColor: 'var(--brand-black)',
          border: '3px solid var(--brand-black)',
        }}
      >
        <Play className="w-6 h-6 fill-current" style={{ color: 'var(--brand-yellow)' }} strokeWidth={0} />
      </div>
    );
  };

  return (
    <Card
      as="button"
      onClick={!isLocked ? onClick : undefined}
      disabled={isLocked}
      state={getCardState()}
      size="lg"
      className={`w-full p-4 ${isLocked ? 'cursor-not-allowed' : ''}`}
      style={{
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Иконка статуса */}
        {renderIcon()}

        {/* Основная информация */}
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-black uppercase ${isLocked ? 'text-gray-400' : 'text-black'}`}>
              {workout.name}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 text-sm font-bold ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" strokeWidth={2.5} />
                <span>~{totalMinutes} мин</span>
              </div>
              <span>•</span>
              <span>
                {exerciseCount} {exerciseCount === 1 ? 'упр.' : exerciseCount < 5 ? 'упр.' : 'упр.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}