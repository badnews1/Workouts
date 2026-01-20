/**
 * shared - Публичный API shared слоя
 * 
 * Экспортирует общие компоненты, хуки и утилиты
 */

// UI компоненты
export { Header } from './ui/header';
export { CircularProgress } from './ui/circular-progress';
export { DateSelector } from './ui/DateSelector';
export { SettingsSection } from './ui/SettingsSection';
export { SettingsButton } from './ui/SettingsButton';
export { IconBox } from './ui/icon-box';

// Хуки
export { useLocalStorage } from './lib/hooks';

// Утилиты
export * from './lib/utils';

// Типы
export type { Goal, GoalOption } from './model';

// Конфигурация
export { GOAL_NAMES, GOAL_OPTIONS } from './config';