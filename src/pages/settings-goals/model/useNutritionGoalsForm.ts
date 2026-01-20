/**
 * useNutritionGoalsForm - Хук управления формой целей по питанию
 * 
 * Управляет состоянием формы и сохранением целей КБЖУ
 */

import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { parseNumericFieldsWithFallback } from '@/shared/lib/utils';

interface NutritionGoalsData {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface NutritionGoalsFormData {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}

interface UseNutritionGoalsFormParams {
  initialGoals: NutritionGoalsData;
  onSave: (goals: NutritionGoalsData) => void;
}

export function useNutritionGoalsForm({
  initialGoals,
  onSave,
}: UseNutritionGoalsFormParams) {
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoalsFormData>({
    calories: initialGoals.calories.toString(),
    protein: initialGoals.protein.toString(),
    fat: initialGoals.fat.toString(),
    carbs: initialGoals.carbs.toString(),
  });

  const updateGoal = (field: keyof NutritionGoalsFormData, value: string) => {
    setNutritionGoals(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const goals = parseNumericFieldsWithFallback(
      nutritionGoals,
      {
        calories: 2000,
        protein: 150,
        fat: 70,
        carbs: 200,
      }
    );
    
    onSave(goals);
    toast.success('Цели по питанию сохранены');
  };

  return {
    nutritionGoals,
    updateGoal,
    handleSave,
  };
}