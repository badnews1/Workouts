import { Clock, Check, Lock, Play } from 'lucide-react';
import { Workout } from '../../../entities/workout';

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

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getBorderColor = () => {
    if (isCompleted) return '#10b981';
    if (isLocked) return '#e5e7eb';
    return color;
  };

  const getBackgroundColor = () => {
    if (isCompleted) return hexToRgba('#10b981', 0.05);
    if (isLocked) return '#f9fafb';
    return '#ffffff';
  };

  return (
    <div
      className="w-full rounded-3xl p-5 transition-all cursor-pointer hover:shadow-md"
      onClick={!isLocked ? onClick : undefined}
      style={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: getBorderColor(),
        backgroundColor: getBackgroundColor(),
      }}
    >
      <div className="flex items-start gap-4">
        {/* Иконка статуса */}
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: isCompleted ? '#10b981' : isLocked ? '#e5e7eb' : color
          }}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          ) : isLocked ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white" strokeWidth={0} />
          )}
        </div>

        {/* Основная информация */}
        <div className="flex-1">
          <h3 className={`text-base font-semibold mb-1 ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
            {workout.name}
          </h3>
          <div className={`flex items-center gap-3 text-sm mb-3 ${isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>~{totalMinutes} мин</span>
            </div>
            <span>•</span>
            <span>
              {exerciseCount} {exerciseCount === 1 ? 'упражнение' : exerciseCount < 5 ? 'упражнения' : 'упражнений'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}