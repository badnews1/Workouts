/**
 * sortExercises - Утилита для сортировки упражнений
 * 
 * Сортирует упражнения так, чтобы невыполненные были первыми,
 * а выполненные - в конце. Внутри каждой группы сохраняется исходный порядок.
 */

import type { Exercise } from '@/entities/workout';

interface SortedExercise {
  exercise: Exercise;
  originalIndex: number;
}

export function sortExercises(
  exercises: Exercise[],
  completedExercises: number[],
  isWorkoutCompleted: boolean
): SortedExercise[] {
  return exercises
    .map((exercise, index) => ({ exercise, originalIndex: index }))
    .sort((a, b) => {
      const aCompleted = completedExercises.includes(a.originalIndex) || isWorkoutCompleted;
      const bCompleted = completedExercises.includes(b.originalIndex) || isWorkoutCompleted;
      
      // Если статус выполнения разный - невыполненные идут первыми
      if (aCompleted !== bCompleted) {
        return aCompleted ? 1 : -1;
      }
      
      // Если статус одинаковый - сохраняем исходный порядок
      return a.originalIndex - b.originalIndex;
    });
}
