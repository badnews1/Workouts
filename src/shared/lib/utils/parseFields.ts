/**
 * Утилиты для парсинга полей форм
 */

/**
 * Парсит числовые поля объекта из строк в числа
 * 
 * @param fields - Объект с полями для парсинга { fieldName: stringValue, ... }
 * @returns Объект с распарсенными числовыми значениями { fieldName: numberValue, ... }
 * 
 * @example
 * parseNumericFields({ calories: '100', protein: '25.5' })
 * // => { calories: 100, protein: 25.5 }
 */
export function parseNumericFields<T extends Record<string, string>>(
  fields: T
): { [K in keyof T]: number } {
  const result = {} as { [K in keyof T]: number };
  
  for (const key in fields) {
    result[key] = parseFloat(fields[key]);
  }
  
  return result;
}

/**
 * Парсит числовые поля с fallback значениями
 * 
 * @param fields - Объект с полями для парсинга
 * @param fallbacks - Объект с fallback значениями для каждого поля
 * @returns Объект с распарсенными значениями или fallback, если парсинг не удался
 * 
 * @example
 * parseNumericFieldsWithFallback(
 *   { calories: '100', protein: '' },
 *   { calories: 2000, protein: 150 }
 * )
 * // => { calories: 100, protein: 150 }
 */
export function parseNumericFieldsWithFallback<T extends Record<string, string>>(
  fields: T,
  fallbacks: { [K in keyof T]: number }
): { [K in keyof T]: number } {
  const result = {} as { [K in keyof T]: number };
  
  for (const key in fields) {
    const parsed = parseFloat(fields[key]);
    result[key] = isNaN(parsed) ? fallbacks[key] : parsed;
  }
  
  return result;
}