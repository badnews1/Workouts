/**
 * entities/food/api/useFoods.ts
 * 
 * Хук для работы с продуктами питания (localStorage)
 */

import { useState } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks';
import { generateId } from '@/shared/lib/utils';
import type { Food } from '../model/types';

/**
 * Хук для получения всех продуктов пользователя
 */
export function useFoods() {
  const [foods, setFoods] = useLocalStorage<Food[]>('userFoods', []);
  const [isLoading, setIsLoading] = useState(false);

  const loadFoods = () => {
    // Данные уже синхронизированы через useLocalStorage
    setIsLoading(false);
  };

  const addFood = (food: Omit<Food, 'id' | 'isFavorite' | 'createdAt'>): void => {
    const newFood: Food = {
      ...food,
      id: generateId(),
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setFoods([...foods, newFood]);
  };

  const updateFood = (foodId: string, updates: Partial<Food>): void => {
    setFoods(foods.map(food =>
      food.id === foodId ? { ...food, ...updates } : food
    ));
  };

  const deleteFood = (foodId: string): void => {
    setFoods(foods.filter(food => food.id !== foodId));
  };

  const toggleFavorite = (foodId: string): void => {
    const food = foods.find(f => f.id === foodId);
    if (food) {
      updateFood(foodId, { isFavorite: !food.isFavorite });
    }
  };

  const getFoodById = (foodId: string): Food | undefined => {
    return foods.find(food => food.id === foodId);
  };

  const getFavorites = (): Food[] => {
    return foods.filter(food => food.isFavorite);
  };

  return {
    foods,
    isLoading,
    addFood,
    updateFood,
    deleteFood,
    toggleFavorite,
    getFoodById,
    getFavorites,
    reload: loadFoods,
  };
}