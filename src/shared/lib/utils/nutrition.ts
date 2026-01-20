/**
 * Утилиты для расчета КБЖУ
 */

/**
 * Рассчитывает множитель для пересчета КБЖУ на 100г в КБЖУ на порцию
 * 
 * @param amount - Количество
 * @param unit - Единица измерения ('г', 'мл')
 * @returns Множитель для расчета КБЖУ
 */
export function calculateNutritionMultiplier(amount: number, unit: string): number {
  return amount / 100;
}

/**
 * Рассчитывает КБЖУ для указанной порции продукта
 * 
 * @param per100g - КБЖУ на 100г продукта
 * @param amount - Количество
 * @param unit - Единица измерения ('г', 'мл')
 * @returns Рассчитанное КБЖУ с округлением (калории - до целых, БЖУ - до 1 знака)
 */
export function calculatePortionNutrition(
  per100g: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  },
  amount: number,
  unit: string
): {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
} {
  const multiplier = calculateNutritionMultiplier(amount, unit);

  return {
    calories: Math.round(per100g.calories * multiplier),
    protein: Math.round(per100g.protein * multiplier * 10) / 10,
    fat: Math.round(per100g.fat * multiplier * 10) / 10,
    carbs: Math.round(per100g.carbs * multiplier * 10) / 10,
  };
}