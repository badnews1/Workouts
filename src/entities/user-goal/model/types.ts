/**
 * Типы для целей пользователя
 */

import type { Goal } from '@/shared/model/types';

/**
 * Данные о целях пользователя
 */
export interface UserGoalData {
  /** Основная цель (набор массы, похудение и т.д.) */
  goal: Goal;
  /** Целевой вес (кг) */
  targetWeight?: number;
  /** Целевая дата достижения */
  targetDate?: string;
}
