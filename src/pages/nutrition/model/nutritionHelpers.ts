/**
 * nutritionHelpers - Вспомогательные функции для страницы питания
 */

import type { MealDataState } from '@/entities/food';

/**
 * Подсчитывает общие макронутриенты за день
 */
export function calculateDailyTotals(mealData: MealDataState): {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
} {
  let totals = { calories: 0, protein: 0, fat: 0, carbs: 0 };

  Object.values(mealData).forEach((mealItems) => {
    mealItems.forEach((item) => {
      totals.calories += item.calories;
      totals.protein += item.protein;
      totals.fat += item.fat;
      totals.carbs += item.carbs;
    });
  });

  return totals;
}
