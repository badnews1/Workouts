/**
 * useFoodDetail - Хук управления деталями продукта
 * 
 * Управляет поиском продукта, расчетом КБЖУ, количеством и добавлением в pending
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner@2.0.3';
import { generateId, calculatePortionNutrition } from '@/shared/lib/utils';
import { useFoods, usePendingFoods, type MealType, type Food } from '@/entities/food';

interface UseFoodDetailParams {
  foodId: string | null;
  meal: MealType;
  date: string;
}

export function useFoodDetail({ foodId, meal, date }: UseFoodDetailParams) {
  const navigate = useNavigate();
  const { foods, toggleFavorite } = useFoods();
  const { updatePending, getPendingItem, addPending, pendingItems } = usePendingFoods(meal, date);
  
  const [amount, setAmount] = useState('100');

  // Находим продукт
  const food = useMemo(() => {
    if (!foodId) return null;
    return foods.find(f => f.id === foodId) || null;
  }, [foodId, foods]);

  // Проверяем наличие pending item и устанавливаем начальное значение
  useEffect(() => {
    if (!foodId || !food) return;
    
    const existingItem = pendingItems.find(item => item.foodId === foodId);
    if (existingItem) {
      setAmount(existingItem.amount?.toString() || '100');
    } else {
      setAmount('100');
    }
  }, [foodId, food?.id, food?.unit]);

  // Редирект если нет продукта
  useEffect(() => {
    if (!foodId) {
      navigate('/nutrition');
      return;
    }

    // Даем время на загрузку продукта
    if (foods.length > 0 && !food) {
      toast.error('Продукт не найден');
      navigate('/nutrition');
    }
  }, [foodId, food, foods.length, navigate]);
  
  // Автоматический расчет КБЖУ на основе количества
  const calculated = useMemo(() => {
    if (!food) return null;
    
    const amountNum = parseFloat(amount) || 0;
    return calculatePortionNutrition(food.per100g, amountNum, food.unit);
  }, [food, amount]);

  const handleAddFood = () => {
    if (!food || !calculated) return;
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Введите корректное количество');
      return;
    }
    
    const mealEntry = {
      id: generateId(),
      foodId: food.id,
      name: food.name,
      brand: food.brand,
      amount: amountNum,
      calories: calculated.calories,
      protein: calculated.protein,
      fat: calculated.fat,
      carbs: calculated.carbs,
    };
    
    // Проверяем, есть ли уже этот продукт в pending
    const existingItem = getPendingItem(food.id);
    if (existingItem) {
      // Обновляем количество
      updatePending(food.id, amountNum);
    } else {
      // Добавляем новый
      addPending(mealEntry);
    }
    
    toast.success('Продукт добавлен в список');
    
    // Возвращаемся на страницу поиска продуктов
    navigate(`/add-food?meal=${meal}&date=${date}`);
  };

  const handleToggleFavorite = () => {
    if (!food) return;
    toggleFavorite(food.id);
  };

  return {
    food,
    amount,
    setAmount,
    calculated,
    handleAddFood,
    handleToggleFavorite,
  };
}