import { WorkoutProgram } from '../../../entities/workout-program';
import { IntroWorkoutCard } from './IntroWorkoutCard';
import { IntroWorkoutHistory } from './IntroWorkoutHistory';

export interface WorkoutHistoryEntry {
  workoutId: string;
  workoutName: string;
  periodName: string;
  completedDates: string[];
  totalTime?: number;
}

interface IntroWorkoutsListProps {
  program: WorkoutProgram;
  currentLevel: number;
  completedWorkouts?: number;
  history?: WorkoutHistoryEntry[];
  onWorkoutClick?: (workoutId: string) => void;
}

export function IntroWorkoutsList({ 
  program, 
  currentLevel, 
  completedWorkouts = 0,
  history = [],
  onWorkoutClick
}: IntroWorkoutsListProps) {
  // Проверяем завершенность тренировок по истории
  const isWorkoutCompleted = (workoutId: string) => {
    return history.some(entry => entry.workoutId === workoutId);
  };

  // Находим индекс первой незавершенной тренировки
  const firstIncompleteIndex = program.levels[currentLevel].workouts.findIndex(
    workout => !isWorkoutCompleted(workout.id)
  );

  return (
    <div>
      {/* Заголовок */}
      <div className="px-4 mb-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          ТРЕНИРОВКИ
        </h2>
      </div>

      {/* Список тренировок */}
      <div className="px-4 space-y-3 mb-6">
        {program.levels[currentLevel].workouts.map((workout, index) => {
          const isCompleted = isWorkoutCompleted(workout.id);
          // Блокируем тренировки, которые идут после первой незавершенной
          const isLocked = !isCompleted && firstIncompleteIndex !== -1 && index > firstIncompleteIndex;
          
          return (
            <IntroWorkoutCard 
              key={workout.id} 
              workout={workout} 
              isCompleted={isCompleted}
              isLocked={isLocked}
              color={program.color}
              onClick={() => onWorkoutClick?.(workout.id)}
            />
          );
        })}
      </div>

      {/* История тренировок */}
      <IntroWorkoutHistory history={history} />
    </div>
  );
}