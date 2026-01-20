/**
 * useAddFoodLogic - Логика страницы добавления продуктов и рецептов
 * 
 * Управляет состоянием поиска, выбора продуктов/рецептов и добавления в прием пищи
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner@2.0.3';
import { generateId } from '@/shared/lib/utils';
import { useFoods, useMealData, usePendingFoods, type MealType, type Food } from '@/entities/food';
import { useRecipes } from '@/entities/recipe';
import type { Tab } from '@/widgets/food-search';

interface UseAddFoodLogicProps {
  meal: MealType;
  date: string;
}

export function useAddFoodLogic({ meal, date }: UseAddFoodLogicProps) {
  const navigate = useNavigate();
  
  // Хуки из entities
  const { foods, toggleFavorite } = useFoods();
  const { recipes, toggleFavorite: toggleRecipeFavorite } = useRecipes();
  const { pendingItems, selectedIds, togglePending, getPendingItem, clearPending } = usePendingFoods(meal, date);
  const { addMultipleFoodsToMeal } = useMealData(date);
  
  // Локальное состояние
  const [activeTab, setActiveTab] = useState<Tab>('my-foods');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация продуктов
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'favorites') {
      return matchesSearch && food.isFavorite;
    }
    
    if (activeTab === 'my-foods') {
      return matchesSearch;
    }
    
    return false;
  });

  // Фильтрация рецептов
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'my-recipes') {
      return matchesSearch;
    }
    
    return false;
  });

  // Переключение избранного для продуктов
  const handleToggleFavorite = (foodId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(foodId);
  };

  // Переключение избранного для рецептов
  const handleToggleRecipeFavorite = (recipeId: string) => {
    toggleRecipeFavorite(recipeId);
  };

  // Добавление выбранных продуктов
  const handleAddSelectedFoods = () => {
    if (selectedIds.size === 0) {
      toast.error('Выберите хотя бы один продукт');
      return;
    }

    // Преобразуем pending items в формат с уникальными ID
    const itemsToAdd = pendingItems.map(item => ({
      ...item,
      id: generateId(),
    }));

    addMultipleFoodsToMeal(meal, itemsToAdd);
    clearPending();
    
    toast.success(`Добавлено продуктов: ${itemsToAdd.length}`);
    navigate(`/nutrition?date=${date}`);
  };

  // Навигация к детальной странице продукта
  const handleFoodClick = (foodId: string) => {
    navigate(`/food-detail?foodId=${foodId}&meal=${meal}&date=${date}`);
  };

  // Навигация к детальной странице рецепта
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe-detail?recipeId=${recipeId}&meal=${meal}&date=${date}`);
  };

  // Навигация к созданию продукта
  const handleCreateFood = () => {
    navigate(`/create-food?meal=${meal}&date=${date}`);
  };

  // Навигация к созданию рецепта
  const handleCreateRecipe = () => {
    navigate('/create-recipe');
  };

  // Возврат назад
  const handleBack = () => {
    clearPending();
    navigate(`/nutrition?date=${date}`);
  };

  return {
    // Состояние
    activeTab,
    searchQuery,
    filteredFoods,
    filteredRecipes,
    selectedIds,
    
    // Функции изменения состояния
    setActiveTab,
    setSearchQuery,
    
    // Обработчики
    handleToggleFavorite,
    handleToggleRecipeFavorite,
    handleAddSelectedFoods,
    handleFoodClick,
    handleRecipeClick,
    handleCreateFood,
    handleCreateRecipe,
    handleBack,
    
    // Вспомогательные функции
    togglePending,
    getPendingItem,
  };
}