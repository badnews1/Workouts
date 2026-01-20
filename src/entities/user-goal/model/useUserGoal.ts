/**
 * Хук для работы с целью пользователя
 */

import { useLocalStorage } from '@/shared/lib/hooks';
import type { UserGoalData } from './types';
import type { Goal } from '@/shared/model/types';

const STORAGE_KEY_GOAL = 'userGoal';
const STORAGE_KEY_TARGET_WEIGHT = 'targetWeight';
const STORAGE_KEY_TARGET_DATE = 'targetDate';

/**
 * Хук для управления целями пользователя
 */
export function useUserGoal() {
  const [goal, setGoal] = useLocalStorage<Goal>(STORAGE_KEY_GOAL, 'muscle_gain');
  const [targetWeightStr, setTargetWeightStr] = useLocalStorage<string | null>(STORAGE_KEY_TARGET_WEIGHT, null);
  const [targetDate, setTargetDate] = useLocalStorage<string | null>(STORAGE_KEY_TARGET_DATE, null);

  const goalData: UserGoalData = {
    goal,
    targetWeight: targetWeightStr ? parseFloat(targetWeightStr) : undefined,
    targetDate: targetDate || undefined,
  };

  /**
   * Обновить основную цель
   */
  const updateGoal = (newGoal: Goal) => {
    setGoal(newGoal);
  };

  /**
   * Обновить целевой вес и дату
   */
  const updateWeightGoal = (targetWeight: number, newTargetDate?: string) => {
    setTargetWeightStr(targetWeight.toString());
    setTargetDate(newTargetDate || null);
  };

  return {
    goalData,
    updateGoal,
    updateWeightGoal,
  };
}