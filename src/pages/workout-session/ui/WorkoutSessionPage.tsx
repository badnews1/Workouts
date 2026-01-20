/**
 * WorkoutSessionPage - Страница выполнения тренировки
 * 
 * Активная тренировочная сессия с двумя таймерами (общий и текущего упражнения).
 * Позволяет пошагово проходить упражнения, вводить результаты и автоматически переходить к следующему упражнению.
 * 
 * Роут: /workout-session/:workoutId
 * Query параметры: ?autostart=true - автоматический запуск тренировки
 * Навигация:
 *   - Назад/Завершить → возврат на предыдущую страницу (обычно PeriodDetailPage)
 */

import { Header } from '@/shared';
import { useNavigate, useParams } from 'react-router';
import { findWorkoutById } from '@/entities/workout';
import { 
  TotalTimerCard, 
  ExerciseTimerCard, 
  ExerciseCard,
  useWorkoutTimers,
  useWorkoutProgress,
  useWorkoutPersistence,
  sortExercises,
} from '@/features/workout-session';

export function WorkoutSessionPage() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  
  // Найдем тренировку
  const workout = findWorkoutById(workoutId || '');
  
  // Хуки для управления таймерами
  const {
    totalTime,
    exerciseTimer,
    exerciseTimerRunning,
    setIsRunning,
    setTotalTime,
    startExerciseTimer,
    pauseExerciseTimer,
    resumeExerciseTimer,
    resetExerciseTimer,
    stopAllTimers,
  } = useWorkoutTimers();

  // Хуки для управления прогрессом
  const {
    results,
    bandSelections,
    completedExercises,
    confirmedResults,
    isWorkoutCompleted,
    setResults,
    setBandSelections,
    setCompletedExercises,
    setIsWorkoutCompleted,
    setCompletionDate,
    handleResultChange,
    handleBandSelectionChange,
    handleConfirmResult,
    handleCompleteExercise,
    completeWorkout,
  } = useWorkoutProgress();

  // Хуки для загрузки/сохранения состояния
  const { saveCurrentState, saveToHistory, clearState } = useWorkoutPersistence({
    workoutId: workoutId || '',
    setTotalTime,
    setIsRunning,
    setCompletedExercises,
    setResults,
    setBandSelections,
    setIsWorkoutCompleted,
    setCompletionDate,
  });

  const handleFinish = () => {
    if (!isWorkoutCompleted && workout) {
      // Первое нажатие - завершаем тренировку
      stopAllTimers();
      const { completionDate, allCompleted } = completeWorkout(workout.exercises.length);
      
      const dateString = completionDate.toISOString();
      
      // Сохраняем состояние в localStorage
      saveCurrentState(totalTime, allCompleted, results, bandSelections, dateString);
      
      // Сохраняем завершенную тренировку в историю
      saveToHistory(totalTime, results, bandSelections, dateString);
    } else {
      // Второе нажатие - возвращаемся на страницу периода
      navigate(-1);
    }
  };

  const handleExerciseTimerReset = () => {
    resetExerciseTimer();
  };

  if (!workout) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Тренировка не найдена</p>
      </div>
    );
  }

  // Сортируем упражнения: невыполненные первыми, выполненные в конце
  const sortedExercises = sortExercises(workout.exercises, completedExercises, isWorkoutCompleted);

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header
        title={workout.name}
        onBack={() => navigate(-1)}
      />

      <div className="flex-1 overflow-auto">
        <div className="px-4 pt-4 pb-32">
          {/* Компактная карточка общего таймера */}
          <TotalTimerCard 
            totalTime={totalTime}
            isCompleted={isWorkoutCompleted}
          />

          {/* Единый таймер упражнения - показывается только во время тренировки */}
          {!isWorkoutCompleted && (
            <ExerciseTimerCard
              exerciseTimer={exerciseTimer}
              isRunning={exerciseTimerRunning}
              onStart={startExerciseTimer}
              onPause={pauseExerciseTimer}
              onResume={resumeExerciseTimer}
              onReset={handleExerciseTimerReset}
            />
          )}

          {/* Все упражнения */}
          <div className="space-y-4">
            {sortedExercises.map(({ exercise, originalIndex }, index) => {
              const isCompleted = completedExercises.includes(originalIndex) || isWorkoutCompleted;
              // Первое невыполненное упражнение - активное, остальные невыполненные - заблокированы
              const isLocked = !isCompleted && index > 0 && !completedExercises.includes(sortedExercises[index - 1].originalIndex);
              const isActive = !isCompleted && !isLocked;

              return (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  originalIndex={originalIndex}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  isActive={isActive}
                  results={results}
                  bandSelections={bandSelections}
                  confirmedResults={confirmedResults}
                  onComplete={handleCompleteExercise}
                  onResultChange={handleResultChange}
                  onBandChange={handleBandSelectionChange}
                  onConfirmResult={handleConfirmResult}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Фиксированная кнопка внизу в стиле Neubrutalism */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-4 border-black">
        <button
          onClick={handleFinish}
          className="w-full py-4 font-black text-lg uppercase transition-colors border-4 border-black"
          style={{
            backgroundColor: isWorkoutCompleted ? 'var(--brand-green)' : 'var(--brand-yellow)',
            color: 'var(--brand-black)',
          }}
        >
          {isWorkoutCompleted ? 'Тренировка завершена' : 'Завершить тренировку'}
        </button>
      </div>
    </div>
  );
}