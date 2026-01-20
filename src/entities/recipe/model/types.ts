/**
 * entities/recipe/model/types.ts
 * 
 * Типы для работы с рецептами
 */

import type { NutritionalValue } from '@/entities/food';

/**
 * Ингредиент рецепта
 */
export interface RecipeIngredient {
  foodId: string;
  name: string;
  amount: number; // количество в граммах или мл
  unit: string; // единица измерения ('г', 'мл')
}

/**
 * Шаг приготовления
 */
export interface RecipeStep {
  id: string;
  order: number;
  description: string;
  timer?: number; // таймер в минутах (опционально)
}

/**
 * Рецепт
 */
export interface Recipe {
  id: string;
  name: string;
  description?: string; // описание рецепта
  /** Ингредиенты рецепта */
  ingredients: RecipeIngredient[];
  /** Пошаговый план приготовления */
  steps: RecipeStep[];
  /** Необходимый инвентарь */
  equipment: string;
  /** Количество порций в рецепте */
  servings: number;
  /** КБЖУ на 100г готового блюда */
  per100g: NutritionalValue;
  /** КБЖУ на порцию */
  perServing: NutritionalValue;
  /** Общий вес готового блюда (в граммах) */
  totalWeight: number;
  /** Избранное */
  isFavorite: boolean;
  /** Дата создания */
  createdAt: string;
}