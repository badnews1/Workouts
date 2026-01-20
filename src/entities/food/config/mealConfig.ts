/**
 * mealConfig - Конфигурация приемов пищи
 */

import type { MealType } from '../model/types';

export const MEAL_NAMES: Record<MealType, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
} as const;
