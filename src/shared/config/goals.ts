/**
 * shared/config/goals.ts
 * 
 * Конфигурация целей пользователя
 */

import type { Goal, GoalOption } from '../model/types';

/**
 * Конфигурация целей для отображения в UI
 */
export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'mass',
    label: 'Набор массы',
    emoji: '💪',
    color: '#10b981',
  },
  {
    id: 'loss',
    label: 'Похудение',
    emoji: '🔥',
    color: '#ef4444',
  },
  {
    id: 'maintain',
    label: 'Поддержание',
    emoji: '⚖️',
    color: 'var(--brand-white)',
  },
];

/**
 * Названия целей (простой маппинг для текстового отображения)
 */
export const GOAL_NAMES: Record<Goal, string> = {
  mass: 'Набор массы',
  loss: 'Похудение',
  maintain: 'Поддержание',
};