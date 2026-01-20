/**
 * entities/food - Публичное API
 */

export { useFoods } from './api/useFoods';
export { useMealData } from './api/useMealData';
export { usePendingFoods } from './api/usePendingFoods';
export { useNutritionGoals } from './api/useNutritionGoals';

export type { 
  Food, 
  FoodItem, 
  MealData, 
  MealType, 
  NutritionGoals, 
  MealDataState, 
  NutritionalValue,
  PendingFoodItem,
} from './model/types';

export { MEAL_NAMES } from './config/mealConfig';

export { VITAMINS, MINERALS, ADDITIONAL_DATA, ALL_NUTRIENTS } from './config/nutrients';
export type { NutrientField } from './config/nutrients';