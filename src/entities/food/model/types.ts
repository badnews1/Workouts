/**
 * entities/food/model/types.ts
 * 
 * Типы для работы с продуктами питания
 */

/**
 * Тип приема пищи
 */
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/**
 * Пищевая ценность продукта
 */
export interface NutritionalValue {
  // Основные КБЖУ
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  
  // Витамины
  betaCarotene?: number; // мг
  vitaminA?: number; // мкг
  vitaminB1?: number; // мг (Тиамин)
  vitaminB2?: number; // мг (Рибофлавин)
  vitaminB3?: number; // мг (Ниацин)
  vitaminB4?: number; // мг (Холин)
  vitaminB5?: number; // мг (Пантотеновая кислота)
  vitaminB6?: number; // мг
  vitaminB7?: number; // мкг (Биотин)
  vitaminB9?: number; // мкг (Фолиевая кислота)
  vitaminB12?: number; // мкг
  vitaminC?: number; // мг
  vitaminD3?: number; // мкг
  vitaminE?: number; // мг
  vitaminK?: number; // мкг
  
  // Минералы
  boron?: number; // мкг
  iron?: number; // мг
  iodine?: number; // мкг
  potassium?: number; // мг
  calcium?: number; // мг
  cobalt?: number; // мкг
  magnesium?: number; // мг
  manganese?: number; // мг
  copper?: number; // мг
  molybdenum?: number; // мкг
  sodium?: number; // мг
  selenium?: number; // мкг
  sulfur?: number; // мг
  salt?: number; // г
  phosphorus?: number; // мг
  fluoride?: number; // мкг
  chromium?: number; // мкг
  zinc?: number; // мг
  
  // Дополнительные данные
  saturatedFat?: number; // г
  monounsaturatedFat?: number; // г
  polyunsaturatedFat?: number; // г
  sugar?: number; // г
  fiber?: number; // г
  cholesterol?: number; // мг
  omega3?: number; // г
  omega6?: number; // г
  caffeine?: number; // мг
}

/**
 * Продукт питания (полная информация)
 */
export interface Food {
  id: string;
  name: string;
  brand: string;
  category: string;
  unit: string; // 'г', 'мл'
  per100g: NutritionalValue;
  isFavorite: boolean;
  createdAt: string;
}

/**
 * Элемент приема пищи (продукт с количеством)
 */
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  amount?: number; // количество грамм/мл
  unit?: string;
  brand?: string;
  foodId?: string; // ссылка на исходный продукт
}

/**
 * Alias для pending продуктов (временный выбор перед добавлением)
 */
export type PendingFoodItem = FoodItem;

/**
 * Структура данных о приемах пищи за день
 */
export interface MealData {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snack: FoodItem[];
}

/**
 * Цели по питанию (КБЖУ)
 */
export interface NutritionGoals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

/**
 * Запись о приеме пищи для добавления
 */
export interface MealEntry {
  foodId: string;
  name: string;
  brand: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}