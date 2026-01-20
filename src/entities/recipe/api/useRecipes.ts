/**
 * entities/recipe/api/useRecipes.ts
 * 
 * Хук для работы с рецептами (localStorage)
 */

import { useState } from 'react';
import { useLocalStorage } from '@/shared/lib/hooks';
import { generateId } from '@/shared/lib/utils';
import type { Recipe } from '../model/types';

/**
 * Хук для получения всех рецептов пользователя
 */
export function useRecipes() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('userRecipes', []);
  const [isLoading, setIsLoading] = useState(false);

  const loadRecipes = () => {
    // Данные уже синхронизированы через useLocalStorage
    setIsLoading(false);
  };

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'isFavorite' | 'createdAt'>): void => {
    const newRecipe: Recipe = {
      ...recipe,
      id: generateId(),
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setRecipes([...recipes, newRecipe]);
  };

  const updateRecipe = (recipeId: string, updates: Partial<Recipe>): void => {
    setRecipes(recipes.map(recipe =>
      recipe.id === recipeId ? { ...recipe, ...updates } : recipe
    ));
  };

  const deleteRecipe = (recipeId: string): void => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
  };

  const toggleFavorite = (recipeId: string): void => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      updateRecipe(recipeId, { isFavorite: !recipe.isFavorite });
    }
  };

  const getRecipeById = (recipeId: string): Recipe | undefined => {
    return recipes.find(recipe => recipe.id === recipeId);
  };

  const getFavorites = (): Recipe[] => {
    return recipes.filter(recipe => recipe.isFavorite);
  };

  return {
    recipes,
    isLoading,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    getRecipeById,
    getFavorites,
    reload: loadRecipes,
  };
}
