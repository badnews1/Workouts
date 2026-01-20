/**
 * Хук для работы с состоянием тренировки
 */

import type { SavedWorkoutState, CompletedWorkout } from './types';

/**
 * Сохранить состояние тренировки
 */
export function saveWorkoutState(state: SavedWorkoutState): void {
  const key = `workout_${state.workoutId}`;
  localStorage.setItem(key, JSON.stringify(state));
}

/**
 * Загрузить состояние тренировки
 */
export function loadWorkoutState(workoutId: string): SavedWorkoutState | null {
  const key = `workout_${workoutId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

/**
 * Удалить состояние тренировки (после завершения)
 */
export function clearWorkoutState(workoutId: string): void {
  const key = `workout_${workoutId}`;
  localStorage.removeItem(key);
}

/**
 * Сохранить завершенную тренировку
 */
export function saveCompletedWorkout(workout: CompletedWorkout): void {
  const key = `workout_${workout.workoutId}_completed`;
  localStorage.setItem(key, JSON.stringify(workout));
}

/**
 * Проверить, завершена ли тренировка
 */
export function isWorkoutCompleted(workoutId: string): boolean {
  const key = `workout_${workoutId}_completed`;
  return localStorage.getItem(key) !== null;
}

/**
 * Получить завершенную тренировку
 */
export function getCompletedWorkout(workoutId: string): CompletedWorkout | null {
  const key = `workout_${workoutId}_completed`;
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

/**
 * Получить все завершенные тренировки
 */
export function getAllCompletedWorkouts(): CompletedWorkout[] {
  const completed: CompletedWorkout[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('workout_') && key.endsWith('_completed')) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          completed.push(JSON.parse(saved));
        } catch {
          // Игнорируем поврежденные данные
        }
      }
    }
  }
  
  return completed;
}

/**
 * Удалить все данные тренировок
 */
export function clearAllWorkoutData(): number {
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('workout_')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  return keysToRemove.length;
}