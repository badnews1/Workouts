/**
 * useWeightGoalForm - Хук управления формой целевого веса
 * 
 * Управляет состоянием формы и сохранением целевого веса
 */

import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface WeightGoalData {
  targetWeight: number | null;
  targetDate: string;
}

interface UseWeightGoalFormParams {
  initialWeight: number | null;
  initialDate: string;
  onSave: (weight: number, date?: string) => void;
}

export function useWeightGoalForm({
  initialWeight,
  initialDate,
  onSave,
}: UseWeightGoalFormParams) {
  const [targetWeight, setTargetWeight] = useState(initialWeight?.toString() || '');
  const [targetDate, setTargetDate] = useState(initialDate);

  const handleSave = () => {
    if (!targetWeight) {
      toast.error('Укажите целевой вес');
      return;
    }
    
    onSave(parseFloat(targetWeight), targetDate || undefined);
    toast.success('Цель по весу сохранена');
  };

  return {
    targetWeight,
    targetDate,
    setTargetWeight,
    setTargetDate,
    handleSave,
  };
}
