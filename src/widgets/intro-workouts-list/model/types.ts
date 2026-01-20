/**
 * types - Типы для intro-workouts-list widget
 */

import type { Workout } from '@/entities/workout';

/**
 * Структура программы для отображения списка тренировок
 */
export interface WorkoutProgram {
  id: string;
  name: string;
  color: string;
  levels: Array<{
    id: string;
    name: string;
    workouts: Workout[];
  }>;
}
