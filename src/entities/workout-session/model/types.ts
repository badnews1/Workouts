/**
 * Типы для состояния тренировки
 */

/**
 * Результат выполнения упражнения
 */
export interface ExerciseResult {
  value: string;
  timestamp: number;
}

/**
 * Сохраненное состояние тренировки
 */
export interface SavedWorkoutState {
  workoutId: string;
  isCompleted?: boolean;
  totalTime: number;
  completedExercises: number[];
  results: Record<string, number>;
  bandSelections: Record<string, string>;
  completionDate?: string;
}

/**
 * Завершенная тренировка
 */
export interface CompletedWorkout {
  workoutId: string;
  completionDate: string;
  totalTime: number;
  results: Record<string, number>;
  bandSelections: Record<string, string>;
}