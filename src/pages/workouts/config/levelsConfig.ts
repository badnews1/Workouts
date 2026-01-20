/**
 * levelsConfig - Конфигурация названий и описаний уровней
 */

export const LEVEL_NAMES = [
  'Новичок',
  'Базовый',
  'Продвинутый новичок',
  'Средний',
  'Продвинутый',
  'Опытный',
  'Эксперт',
  'Мастер',
] as const;

export const LEVEL_DESCRIPTIONS = [
  'Начальная подготовка',
  'Основы силы',
  'Развитие выносливости',
  'Сложные элементы',
  'Силовая база',
  'Продвинутые техники',
  'Сложные элементы',
  'Мастерство владения телом',
] as const;

/**
 * Получает название уровня по номеру (1-8)
 */
export function getLevelName(level: number): string {
  return LEVEL_NAMES[level - 1] || `Уровень ${level}`;
}

/**
 * Получает описание уровня по номеру (1-8)
 */
export function getLevelDescription(level: number): string {
  return LEVEL_DESCRIPTIONS[level - 1] || 'Нажмите, чтобы начать';
}
