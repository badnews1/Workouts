/**
 * Утилиты для расчета КБЖУ рецептов
 */

import type { Food, NutritionalValue } from '@/entities/food';
import type { RecipeIngredient } from './types';

/**
 * Рассчитать КБЖУ рецепта на основе ингредиентов
 */
export function calculateRecipeNutrition(
  ingredients: RecipeIngredient[],
  foods: Food[],
  totalWeight: number,
  servings: number
): {
  per100g: NutritionalValue;
  perServing: NutritionalValue;
  totalNutrition: NutritionalValue;
} {
  // Рассчитываем общее КБЖУ всех ингредиентов
  const totalNutrition: NutritionalValue = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };

  ingredients.forEach((ingredient) => {
    const food = foods.find(f => f.id === ingredient.foodId);
    if (!food) return;

    // Коэффициент: количество ингредиента / 100г
    const multiplier = ingredient.amount / 100;

    totalNutrition.calories += food.per100g.calories * multiplier;
    totalNutrition.protein += food.per100g.protein * multiplier;
    totalNutrition.fat += food.per100g.fat * multiplier;
    totalNutrition.carbs += food.per100g.carbs * multiplier;
  });

  // Рассчитываем КБЖУ на 100г готового блюда
  const per100g: NutritionalValue = {
    calories: Math.round((totalNutrition.calories / totalWeight) * 100),
    protein: Math.round((totalNutrition.protein / totalWeight) * 100 * 10) / 10,
    fat: Math.round((totalNutrition.fat / totalWeight) * 100 * 10) / 10,
    carbs: Math.round((totalNutrition.carbs / totalWeight) * 100 * 10) / 10,
  };

  // Рассчитываем КБЖУ на порцию
  const servingWeight = totalWeight / servings;
  const perServing: NutritionalValue = {
    calories: Math.round((per100g.calories / 100) * servingWeight),
    protein: Math.round((per100g.protein / 100) * servingWeight * 10) / 10,
    fat: Math.round((per100g.fat / 100) * servingWeight * 10) / 10,
    carbs: Math.round((per100g.carbs / 100) * servingWeight * 10) / 10,
  };

  return {
    per100g,
    perServing,
    totalNutrition,
  };
}
