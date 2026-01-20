/**
 * foodConfig - Конфигурация категорий и единиц измерения продуктов
 */

export const FOOD_CATEGORIES = [
  'Фрукты и ягоды',
  'Овощи',
  'Мясо и птица',
  'Рыба и морепродукты',
  'Молочные продукты',
  'Крупы и злаки',
  'Хлеб и выпечка',
  'Орехи и семена',
  'Масла и жиры',
  'Сладости',
  'Напитки',
  'Другое',
] as const;

export const MEASUREMENT_UNITS = ['г', 'мл'] as const;

export type FoodCategory = typeof FOOD_CATEGORIES[number];
export type MeasurementUnit = typeof MEASUREMENT_UNITS[number];