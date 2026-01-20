/**
 * FoodList - Список продуктов и рецептов с empty states
 */

import { Plus } from 'lucide-react';
import type { Food, PendingFoodItem } from '@/entities/food';
import type { Recipe } from '@/entities/recipe';
import type { Tab } from '../config';
import { FoodCard } from './FoodCard';
import { RecipeList } from './RecipeList';
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

interface FoodListProps {
  foods: Food[];
  recipes?: Recipe[];
  activeTab: Tab;
  isSearching: boolean;
  selectedIds: Set<string>;
  getPendingItem: (foodId: string) => PendingFoodItem | undefined;
  onTogglePending: (food: Food) => void;
  onToggleFavorite: (foodId: string, e: React.MouseEvent) => void;
  onFoodClick: (foodId: string) => void;
  onRecipeClick?: (recipeId: string) => void;
  onToggleRecipeFavorite?: (recipeId: string) => void;
  onCreateFood: () => void;
  onCreateRecipe?: () => void;
}

export function FoodList({
  foods,
  recipes = [],
  activeTab,
  isSearching,
  selectedIds,
  getPendingItem,
  onTogglePending,
  onToggleFavorite,
  onFoodClick,
  onRecipeClick,
  onToggleRecipeFavorite,
  onCreateFood,
  onCreateRecipe,
}: FoodListProps) {
  const hasSearchResults = foods.length > 0;

  // Вкладка "Мои рецепты"
  if (activeTab === 'my-recipes') {
    const hasRecipes = recipes.length > 0;

    if (hasRecipes) {
      return (
        <RecipeList
          recipes={recipes}
          onRecipeClick={onRecipeClick}
          onToggleFavorite={onToggleRecipeFavorite}
        />
      );
    }

    // Empty state для рецептов
    return (
      <Empty>
        <EmptyIcon variant="emoji">🍽️</EmptyIcon>
        <EmptyTitle>Нет рецептов</EmptyTitle>
        <EmptyDescription>Создайте свой первый рецепт</EmptyDescription>
        {onCreateRecipe && (
          <EmptyActions>
            <Button 
              size="md" 
              variant="primary"
              onClick={onCreateRecipe}
            >
              <Plus size={20} strokeWidth={3} />
              Создать рецепт
            </Button>
          </EmptyActions>
        )}
      </Empty>
    );
  }

  // Список продуктов
  if (hasSearchResults) {
    return (
      <div className="space-y-3">
        {foods.map(food => {
          const isSelected = selectedIds.has(food.id);
          const pendingItem = getPendingItem(food.id);
          
          // Если продукт выбран - берем данные из pending, иначе - дефолтные
          const displayAmount = pendingItem 
            ? (pendingItem.amount || 100)
            : 100;
          const displayCalories = pendingItem 
            ? pendingItem.calories 
            : food.per100g.calories;
          
          return (
            <FoodCard
              key={food.id}
              food={food}
              isSelected={isSelected}
              displayAmount={displayAmount}
              displayCalories={displayCalories}
              onToggleSelect={() => onTogglePending(food)}
              onToggleFavorite={(e) => onToggleFavorite(food.id, e)}
              onClick={() => onFoodClick(food.id)}
            />
          );
        })}
      </div>
    );
  }

  // Empty state для отсутствия продуктов
  return (
    <Empty>
      <EmptyIcon variant="emoji">
        {activeTab === 'favorites' ? '⭐' : '🍎'}
      </EmptyIcon>
      <EmptyTitle>
        {activeTab === 'favorites' ? 'Нет избранных продуктов' : 'Нет продуктов'}
      </EmptyTitle>
      <EmptyDescription>
        {activeTab === 'favorites' 
          ? 'Добавьте продукты в избранное' 
          : 'Добавьте свой первый продукт'}
      </EmptyDescription>
      {activeTab === 'my-foods' && !isSearching && (
        <EmptyActions>
          <Button 
            size="md" 
            variant="primary"
            onClick={onCreateFood}
          >
            <Plus size={20} strokeWidth={3} />
            Добавить продукт
          </Button>
        </EmptyActions>
      )}
    </Empty>
  );
}