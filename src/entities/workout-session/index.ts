/**
 * Публичный API для entities/workout-session
 */

export type { SavedWorkoutState, CompletedWorkout, ExerciseResult } from './model/types';

export {
  saveWorkoutState,
  loadWorkoutState,
  clearWorkoutState,
  saveCompletedWorkout,
  isWorkoutCompleted,
  getCompletedWorkout,
  getAllCompletedWorkouts,
  clearAllWorkoutData,
} from './model/useWorkoutSession';

export { useWorkoutStats } from './model/useWorkoutStats';