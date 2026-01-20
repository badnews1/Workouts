/**
 * entities/food/api/useNutritionGoals.ts
 * 
 * Хук для работы с целями по питанию (КБЖУ)
 */

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks';
import type { NutritionGoals } from '../model/types';

const DEFAULT_GOALS: NutritionGoals = {
  calories: 2000,
  protein: 150,
  fat: 65,
  carbs: 250,
};

/**
 * Хук для получения и обновления целей по питанию
 */
export function useNutritionGoals() {
  const [goals, setGoals] = useLocalStorage<NutritionGoals>('nutritionGoals', DEFAULT_GOALS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const loadGoals = () => {
    // Данные уже синхронизированы через useLocalStorage
    setIsLoading(false);
  };

  const updateGoals = (newGoals: NutritionGoals) => {
    setGoals(newGoals);
  };

  const resetGoals = () => {
    setGoals(DEFAULT_GOALS);
  };

  return {
    goals,
    isLoading,
    updateGoals,
    resetGoals,
    reload: loadGoals,
  };
}