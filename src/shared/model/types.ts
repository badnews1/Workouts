/**
 * shared/model/types.ts
 * 
 * Общие типы используемые в приложении
 */

/**
 * Цель пользователя по тренировкам и питанию
 */
export type Goal = 'mass' | 'loss' | 'maintain';

/**
 * Интерфейс для отображения цели
 */
export interface GoalOption {
  id: Goal;
  label: string;
  emoji: string;
  color: string;
}
