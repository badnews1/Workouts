/**
 * Конфигурация нутриентов (витамины, минералы, дополнительные данные)
 * 
 * Используется для:
 * - Отображения полей в формах
 * - Расчета потребления нутриентов
 * - Отображения детальной информации о продукте
 */

import type { FoodFormData } from '@/features/create-food/lib/validateFoodForm';

export type NutrientField = {
  key: keyof FoodFormData;
  label: string;
  unit: string;
  step?: number;
};

/**
 * Витамины на 100г продукта
 */
export const VITAMINS: NutrientField[] = [
  { key: 'betaCarotene', label: 'Бета-каротин', unit: 'мг', step: 0.01 },
  { key: 'vitaminA', label: 'Витамин А', unit: 'мкг', step: 0.01 },
  { key: 'vitaminB1', label: 'Витамин В1', unit: 'мг', step: 0.01 },
  { key: 'vitaminB2', label: 'Витамин В2', unit: 'мг', step: 0.01 },
  { key: 'vitaminB3', label: 'Витамин В3', unit: 'мг', step: 0.01 },
  { key: 'vitaminB4', label: 'Витамин В4', unit: 'мг', step: 0.01 },
  { key: 'vitaminB5', label: 'Витамин В5', unit: 'мг', step: 0.01 },
  { key: 'vitaminB6', label: 'Витамин В6', unit: 'мг', step: 0.01 },
  { key: 'vitaminB7', label: 'Витамин В7', unit: 'мкг', step: 0.01 },
  { key: 'vitaminB9', label: 'Витамин В9', unit: 'мкг', step: 0.01 },
  { key: 'vitaminB12', label: 'Витамин В12', unit: 'мкг', step: 0.01 },
  { key: 'vitaminC', label: 'Витамин С', unit: 'мг', step: 0.01 },
  { key: 'vitaminD3', label: 'Витамин D3', unit: 'мкг', step: 0.01 },
  { key: 'vitaminE', label: 'Витамин Е', unit: 'мг', step: 0.01 },
  { key: 'vitaminK', label: 'Витамин К', unit: 'мкг', step: 0.01 },
];

/**
 * Минералы на 100г продукта
 */
export const MINERALS: NutrientField[] = [
  { key: 'boron', label: 'Бор', unit: 'мкг', step: 0.01 },
  { key: 'iron', label: 'Железо', unit: 'мг', step: 0.01 },
  { key: 'iodine', label: 'Йод', unit: 'мкг', step: 0.01 },
  { key: 'potassium', label: 'Калий', unit: 'мг', step: 0.01 },
  { key: 'calcium', label: 'Кальций', unit: 'мг', step: 0.01 },
  { key: 'cobalt', label: 'Кобальт', unit: 'мкг', step: 0.01 },
  { key: 'magnesium', label: 'Магний', unit: 'мг', step: 0.01 },
  { key: 'manganese', label: 'Марганец', unit: 'мг', step: 0.01 },
  { key: 'copper', label: 'Медь', unit: 'мг', step: 0.01 },
  { key: 'molybdenum', label: 'Молибден', unit: 'мкг', step: 0.01 },
  { key: 'sodium', label: 'Натрий', unit: 'мг', step: 0.01 },
  { key: 'selenium', label: 'Селен', unit: 'мкг', step: 0.01 },
  { key: 'sulfur', label: 'Сера', unit: 'мг', step: 0.01 },
  { key: 'salt', label: 'Соль', unit: 'г', step: 0.01 },
  { key: 'phosphorus', label: 'Фосфор', unit: 'мг', step: 0.01 },
  { key: 'fluoride', label: 'Фторид', unit: 'мкг', step: 0.01 },
  { key: 'chromium', label: 'Хром', unit: 'мкг', step: 0.01 },
  { key: 'zinc', label: 'Цинк', unit: 'мг', step: 0.01 },
];

/**
 * Дополнительные данные на 100г продукта
 */
export const ADDITIONAL_DATA: NutrientField[] = [
  { key: 'saturatedFat', label: 'Насыщенные жиры', unit: 'г', step: 0.1 },
  { key: 'monounsaturatedFat', label: 'Мононенасыщ. жиры', unit: 'г', step: 0.1 },
  { key: 'polyunsaturatedFat', label: 'Полиненасыщ. жиры', unit: 'г', step: 0.1 },
  { key: 'sugar', label: 'Сахар', unit: 'г', step: 0.1 },
  { key: 'fiber', label: 'Клетчатка', unit: 'г', step: 0.1 },
  { key: 'cholesterol', label: 'Холестерин', unit: 'мг', step: 0.1 },
  { key: 'omega3', label: 'Омега 3', unit: 'г', step: 0.1 },
  { key: 'omega6', label: 'Омега 6', unit: 'г', step: 0.1 },
  { key: 'caffeine', label: 'Кофеин', unit: 'мг', step: 0.1 },
];

/**
 * Все нутриенты (для полного списка)
 */
export const ALL_NUTRIENTS: NutrientField[] = [
  ...VITAMINS,
  ...MINERALS,
  ...ADDITIONAL_DATA,
];
