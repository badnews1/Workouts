/**
 * validateFoodForm - Валидация формы создания продукта
 * 
 * Проверяет все обязательные поля перед сохранением продукта.
 */

export interface FoodFormData {
  name: string;
  brand: string;
  category: string;
  unit: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  
  // Витамины
  betaCarotene?: string;
  vitaminA?: string;
  vitaminB1?: string;
  vitaminB2?: string;
  vitaminB3?: string;
  vitaminB4?: string;
  vitaminB5?: string;
  vitaminB6?: string;
  vitaminB7?: string;
  vitaminB9?: string;
  vitaminB12?: string;
  vitaminC?: string;
  vitaminD3?: string;
  vitaminE?: string;
  vitaminK?: string;
  
  // Минералы
  boron?: string;
  iron?: string;
  iodine?: string;
  potassium?: string;
  calcium?: string;
  cobalt?: string;
  magnesium?: string;
  manganese?: string;
  copper?: string;
  molybdenum?: string;
  sodium?: string;
  selenium?: string;
  sulfur?: string;
  salt?: string;
  phosphorus?: string;
  fluoride?: string;
  chromium?: string;
  zinc?: string;
  
  // Дополнительные данные
  saturatedFat?: string;
  monounsaturatedFat?: string;
  polyunsaturatedFat?: string;
  sugar?: string;
  fiber?: string;
  cholesterol?: string;
  omega3?: string;
  omega6?: string;
  caffeine?: string;
}

export interface ValidationError {
  isValid: false;
  message: string;
}

export interface ValidationSuccess {
  isValid: true;
}

export type ValidationResult = ValidationError | ValidationSuccess;

export function validateFoodForm(formData: FoodFormData): ValidationResult {
  // Проверка названия
  if (!formData.name.trim()) {
    return {
      isValid: false,
      message: 'Введите название продукта',
    };
  }
  
  // Проверка категории
  if (!formData.category) {
    return {
      isValid: false,
      message: 'Выберите категорию',
    };
  }
  
  // Проверка КБЖУ
  if (!formData.calories || !formData.protein || !formData.fat || !formData.carbs) {
    return {
      isValid: false,
      message: 'Заполните все поля КБЖУ',
    };
  }

  return { isValid: true };
}