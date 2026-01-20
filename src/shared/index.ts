/**
 * shared - Публичный API shared слоя
 * 
 * Экспортирует общие компоненты, хуки и утилиты
 */

// UI компоненты
export { Header } from './ui/header';
export { DateSelector } from './ui/date-selector';
export { SettingsSection } from './ui/settings-section';
export { SettingsButton } from './ui/settings-button';
export { IconBox } from './ui/icon-box';

// Хуки
export { useLocalStorage } from './lib/hooks';

// Утилиты
export * from './lib/utils';

// Типы
export type { Goal, GoalOption } from './model';

// Конфигурация
export { GOAL_NAMES, GOAL_OPTIONS } from './config';