/**
 * Утилита для генерации уникальных ID
 */

/**
 * Генерирует уникальный ID на основе timestamp и случайной строки
 */
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(7);
}
