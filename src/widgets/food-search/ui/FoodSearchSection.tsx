/**
 * FoodSearchSection - Секция поиска и выбора продуктов/рецептов
 * 
 * Композиция SearchBar, FoodTabs и FoodList
 */

import type { Food, PendingFoodItem } from '@/entities/food';
import type { Recipe } from '@/entities/recipe';
import type { Tab } from '../config';
import { SearchBar } from './SearchBar';
import { FoodTabs } from './FoodTabs';
import { FoodList } from './FoodList';

interface FoodSearchSectionProps {
  // Состояние поиска и табов
  searchQuery: string;
  activeTab: Tab;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: Tab) => void;
  
  // Продукты и рецепты
  foods: Food[];
  recipes?: Recipe[];
  selectedIds: Set<string>;
  getPendingItem: (foodId: string) => PendingFoodItem | undefined;
  
  // Обработчики для продуктов
  onTogglePending: (food: Food) => void;
  onToggleFavorite: (foodId: string, e: React.MouseEvent) => void;
  onFoodClick: (foodId: string) => void;
  onCreateFood: () => void;
  
  // Обработчики для рецептов
  onRecipeClick?: (recipeId: string) => void;
  onToggleRecipeFavorite?: (recipeId: string) => void;
  onCreateRecipe?: () => void;
}

export function FoodSearchSection({
  searchQuery,
  activeTab,
  onSearchChange,
  onTabChange,
  foods,
  recipes,
  selectedIds,
  getPendingItem,
  onTogglePending,
  onToggleFavorite,
  onFoodClick,
  onCreateFood,
  onRecipeClick,
  onToggleRecipeFavorite,
  onCreateRecipe,
}: FoodSearchSectionProps) {
  const isSearching = searchQuery.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Поиск и кнопка создания */}
      <SearchBar
        searchQuery={searchQuery}
        activeTab={activeTab}
        onSearchChange={onSearchChange}
        onCreateFood={onCreateFood}
        onCreateRecipe={onCreateRecipe}
      />

      {/* Вкладки */}
      <FoodTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Список продуктов/рецептов */}
      <div className="flex-1 overflow-y-auto">
        <FoodList
          foods={foods}
          recipes={recipes}
          activeTab={activeTab}
          isSearching={isSearching}
          selectedIds={selectedIds}
          getPendingItem={getPendingItem}
          onTogglePending={onTogglePending}
          onToggleFavorite={onToggleFavorite}
          onFoodClick={onFoodClick}
          onRecipeClick={onRecipeClick}
          onToggleRecipeFavorite={onToggleRecipeFavorite}
          onCreateFood={onCreateFood}
          onCreateRecipe={onCreateRecipe}
        />
      </div>
    </div>
  );
}