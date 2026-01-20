/**
 * date - Утилиты для работы с датами
 * 
 * Переиспользуемые функции форматирования и работы с датами
 */

/**
 * Форматирует дату в формат "ДД.ММ.ГГГГ"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Форматирует дату и время в формат "ДД.ММ.ГГГГ в ЧЧ:ММ"
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}.${month}.${year} в ${hours}:${minutes}`;
}

/**
 * Форматирует дату с учетом "Сегодня" и "Вчера"
 */
export function formatDateRelative(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  
  if (compareDate.getTime() === today.getTime()) {
    return 'Сегодня';
  } else if (compareDate.getTime() === yesterday.getTime()) {
    return 'Вчера';
  } else {
    const day = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}

/**
 * Возвращает строку для использования в качестве ключа (YYYY-MM-DD)
 */
export function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Возвращает ключ для сегодняшней даты (YYYY-MM-DD)
 */
export function getTodayDateKey(): string {
  return getDateKey(new Date());
}
