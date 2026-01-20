/**
 * utils - Публичный API утилит
 */

export { formatDate, formatDateTime, formatDateRelative, getDateKey, getTodayDateKey } from './date';
export { formatTime, formatDuration } from './time';
export { generateId } from './generateId';
export { calculateNutritionMultiplier, calculatePortionNutrition } from './nutrition';
export { parseNumericFields, parseNumericFieldsWithFallback } from './parseFields';