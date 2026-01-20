/**
 * time - Утилиты для работы со временем
 * 
 * Переиспользуемые функции форматирования времени
 */

/**
 * Форматирует секунды в формат "ММ:СС"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Форматирует секунды в человекочитаемый формат (например, "5 мин")
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} сек`;
  }
  const mins = Math.floor(seconds / 60);
  return `${mins} мин`;
}
