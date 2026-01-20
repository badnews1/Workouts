/**
 * entities/food/api/useMealData.ts
 * 
 * Хук для работы с приемами пищи (localStorage)
 */

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks';
import type { MealData, FoodItem, MealType } from '../model/types';

const EMPTY_MEAL_DATA: MealData = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};

/**
 * Хук для получения данных о приемах пищи за определенную дату
 */
export function useMealData(date: string) {
  const key = `nutrition_${date}`;
  const [mealData, setMealData] = useLocalStorage<MealData>(key, EMPTY_MEAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // Сбрасываем loading при изменении даты
  useEffect(() => {
    setIsLoading(false);
  }, [date]);

  const addFoodToMeal = (meal: MealType, food: FoodItem) => {
    const updatedData = {
      ...mealData,
      [meal]: [...mealData[meal], food],
    };
    setMealData(updatedData);
  };

  const addMultipleFoodsToMeal = (meal: MealType, foods: FoodItem[]) => {
    const updatedData = {
      ...mealData,
      [meal]: [...mealData[meal], ...foods],
    };
    setMealData(updatedData);
  };

  const removeFoodFromMeal = (meal: MealType, foodId: string) => {
    const updatedData = {
      ...mealData,
      [meal]: mealData[meal].filter(item => item.id !== foodId),
    };
    setMealData(updatedData);
  };

  const clearMeal = (meal: MealType) => {
    const updatedData = {
      ...mealData,
      [meal]: [],
    };
    setMealData(updatedData);
  };

  return {
    mealData,
    isLoading,
    addFoodToMeal,
    addMultipleFoodsToMeal,
    removeFoodFromMeal,
    clearMeal,
  };
}