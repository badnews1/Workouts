/**
 * useCreateFoodForm - Хук управления формой создания продукта
 * 
 * Управляет состоянием формы, валидацией и сохранением нового продукта
 */

import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { parseNumericFields } from '@/shared/lib/utils';
import { useFoods } from '@/entities/food';
import { validateFoodForm, type FoodFormData } from '../lib/validateFoodForm';

interface UseCreateFoodFormProps {
  initialName?: string;
  onSuccess: () => void;
}

export function useCreateFoodForm({ initialName = '', onSuccess }: UseCreateFoodFormProps) {
  const { addFood } = useFoods();
  
  const [formData, setFormData] = useState<FoodFormData>({
    name: initialName,
    brand: '',
    category: '',
    unit: 'г',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
  });

  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  const updateField = <K extends keyof FoodFormData>(field: K, value: FoodFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    const validation = validateFoodForm(formData);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    // Создаем объект с основными КБЖУ
    const nutritionalData: any = {
      calories: formData.calories,
      protein: formData.protein,
      fat: formData.fat,
      carbs: formData.carbs,
    };
    
    // Добавляем витамины если заполнены
    if (formData.betaCarotene) nutritionalData.betaCarotene = formData.betaCarotene;
    if (formData.vitaminA) nutritionalData.vitaminA = formData.vitaminA;
    if (formData.vitaminB1) nutritionalData.vitaminB1 = formData.vitaminB1;
    if (formData.vitaminB2) nutritionalData.vitaminB2 = formData.vitaminB2;
    if (formData.vitaminB3) nutritionalData.vitaminB3 = formData.vitaminB3;
    if (formData.vitaminB4) nutritionalData.vitaminB4 = formData.vitaminB4;
    if (formData.vitaminB5) nutritionalData.vitaminB5 = formData.vitaminB5;
    if (formData.vitaminB6) nutritionalData.vitaminB6 = formData.vitaminB6;
    if (formData.vitaminB7) nutritionalData.vitaminB7 = formData.vitaminB7;
    if (formData.vitaminB9) nutritionalData.vitaminB9 = formData.vitaminB9;
    if (formData.vitaminB12) nutritionalData.vitaminB12 = formData.vitaminB12;
    if (formData.vitaminC) nutritionalData.vitaminC = formData.vitaminC;
    if (formData.vitaminD3) nutritionalData.vitaminD3 = formData.vitaminD3;
    if (formData.vitaminE) nutritionalData.vitaminE = formData.vitaminE;
    if (formData.vitaminK) nutritionalData.vitaminK = formData.vitaminK;
    
    // Добавляем минералы если заполнены
    if (formData.boron) nutritionalData.boron = formData.boron;
    if (formData.iron) nutritionalData.iron = formData.iron;
    if (formData.iodine) nutritionalData.iodine = formData.iodine;
    if (formData.potassium) nutritionalData.potassium = formData.potassium;
    if (formData.calcium) nutritionalData.calcium = formData.calcium;
    if (formData.cobalt) nutritionalData.cobalt = formData.cobalt;
    if (formData.magnesium) nutritionalData.magnesium = formData.magnesium;
    if (formData.manganese) nutritionalData.manganese = formData.manganese;
    if (formData.copper) nutritionalData.copper = formData.copper;
    if (formData.molybdenum) nutritionalData.molybdenum = formData.molybdenum;
    if (formData.sodium) nutritionalData.sodium = formData.sodium;
    if (formData.selenium) nutritionalData.selenium = formData.selenium;
    if (formData.sulfur) nutritionalData.sulfur = formData.sulfur;
    if (formData.salt) nutritionalData.salt = formData.salt;
    if (formData.phosphorus) nutritionalData.phosphorus = formData.phosphorus;
    if (formData.fluoride) nutritionalData.fluoride = formData.fluoride;
    if (formData.chromium) nutritionalData.chromium = formData.chromium;
    if (formData.zinc) nutritionalData.zinc = formData.zinc;
    
    // Добавляем дополнительные данные если заполнены
    if (formData.saturatedFat) nutritionalData.saturatedFat = formData.saturatedFat;
    if (formData.monounsaturatedFat) nutritionalData.monounsaturatedFat = formData.monounsaturatedFat;
    if (formData.polyunsaturatedFat) nutritionalData.polyunsaturatedFat = formData.polyunsaturatedFat;
    if (formData.sugar) nutritionalData.sugar = formData.sugar;
    if (formData.fiber) nutritionalData.fiber = formData.fiber;
    if (formData.cholesterol) nutritionalData.cholesterol = formData.cholesterol;
    if (formData.omega3) nutritionalData.omega3 = formData.omega3;
    if (formData.omega6) nutritionalData.omega6 = formData.omega6;
    if (formData.caffeine) nutritionalData.caffeine = formData.caffeine;

    // Создаем новый продукт через хук
    const newFoodData = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      unit: formData.unit,
      per100g: parseNumericFields(nutritionalData),
    };
    
    addFood(newFoodData);
    toast.success('Продукт добавлен');
    
    // Вызываем callback успеха
    onSuccess();
  };

  return {
    formData,
    isCategoryExpanded,
    setIsCategoryExpanded,
    updateField,
    handleSubmit,
  };
}