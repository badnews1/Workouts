/**
 * entities/food/api/usePendingFoods.ts
 * 
 * Хук для работы с временным состоянием выбранных продуктов
 * Используется при множественном выборе продуктов перед добавлением
 */

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks';
import { generateId, calculatePortionNutrition } from '@/shared/lib/utils';
import type { FoodItem, MealType } from '../model/types';

interface PendingFoodData {
  meal: MealType;
  date: string;
  items: FoodItem[];
}

/**
 * Хук для управления pending продуктами (временный выбор перед добавлением)
 */
export function usePendingFoods(meal: MealType, date: string) {
  const storageKey = `pendingFoodItems_${meal}_${date}`;
  const [pendingData, setPendingData] = useLocalStorage<PendingFoodData | null>(storageKey, null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Синхронизируем selectedIds с pendingData
  useEffect(() => {
    if (pendingData?.items) {
      setSelectedIds(new Set(pendingData.items.map(item => item.foodId)));
    } else {
      setSelectedIds(new Set());
    }
  }, [pendingData]);

  const pendingItems = pendingData?.items || [];

  const savePending = (items: FoodItem[]) => {
    if (items.length === 0) {
      setPendingData(null);
    } else {
      setPendingData({ meal, date, items });
    }
  };

  /**
   * Добавить продукт в pending список
   */
  const addPending = (item: FoodItem) => {
    const updated = [...pendingItems, item];
    savePending(updated);
  };

  /**
   * Удалить продукт из pending списка
   */
  const removePending = (foodId: string) => {
    const updated = pendingItems.filter(item => item.foodId !== foodId);
    savePending(updated);
  };

  /**
   * Обновить количество продукта в pending
   */
  const updatePending = (foodId: string, amount: number) => {
    const updated = pendingItems.map(item =>
      item.foodId === foodId
        ? {
            ...item,
            amount,
            calories: ((item.calories / (item.amount || 100)) * amount),
            protein: ((item.protein / (item.amount || 100)) * amount),
            fat: ((item.fat / (item.amount || 100)) * amount),
            carbs: ((item.carbs / (item.amount || 100)) * amount),
          }
        : item
    );
    savePending(updated);
  };

  /**
   * Проверить, выбран ли продукт
   */
  const isSelected = (foodId: string): boolean => {
    return selectedIds.has(foodId);
  };

  /**
   * Получить pending item для продукта
   */
  const getPendingItem = (foodId: string): FoodItem | undefined => {
    return pendingItems.find(item => item.foodId === foodId);
  };

  /**
   * Переключить выбор продукта (добавить/удалить из pending)
   */
  const togglePending = (food: { id: string; name: string; brand: string; unit: string; per100g: { calories: number; protein: number; fat: number; carbs: number } }) => {
    const existing = pendingItems.find(item => item.foodId === food.id);
    
    if (existing) {
      // Обновляем существующий pending item
      updatePending(food.id, { amount: existing.amount });
      removePending(food.id);
    } else {
      // Добавляем с дефолтными значениями
      const defaultAmount = 100;
      const nutrition = calculatePortionNutrition(food.per100g, defaultAmount, food.unit);
      
      const newItem: FoodItem = {
        id: generateId(),
        foodId: food.id,
        name: food.name,
        brand: food.brand,
        amount: defaultAmount,
        ...nutrition,
      };
      
      addPending(newItem);
    }
  };

  /**
   * Очистить все pending продукты
   */
  const clearPending = () => {
    savePending([]);
  };

  return {
    pendingItems,
    selectedIds,
    addPending,
    removePending,
    updatePending,
    isSelected,
    getPendingItem,
    togglePending,
    clearPending,
  };
}