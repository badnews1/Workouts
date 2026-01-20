/**
 * AddFoodPage - Страница выбора продуктов для добавления
 * 
 * Позволяет искать и выбирать продукты из базы
 * 
 * Роут: /add-food?meal=breakfast&date=2024-01-17
 */

import { useSearchParams } from 'react-router';
import { Header, getTodayDateKey } from '@/shared';
import { type MealType, MEAL_NAMES } from '@/entities/food';
import { FoodSearchSection } from '@/widgets/food-search';
import { useAddFoodLogic } from '../model/useAddFoodLogic';
import { Button } from '@/components/ui/button';

export function AddFoodPage() {
  const [searchParams] = useSearchParams();
  const meal = searchParams.get('meal') as MealType || 'breakfast';
  const date = searchParams.get('date') || getTodayDateKey();
  
  // Вся логика в хуке
  const {
    activeTab,
    searchQuery,
    filteredFoods,
    filteredRecipes,
    selectedIds,
    setActiveTab,
    setSearchQuery,
    handleToggleFavorite,
    handleToggleRecipeFavorite,
    handleAddSelectedFoods,
    handleFoodClick,
    handleRecipeClick,
    handleCreateFood,
    handleCreateRecipe,
    handleBack,
    togglePending,
    getPendingItem,
  } = useAddFoodLogic({ meal, date });

  return (
    <div className="h-full bg-white flex flex-col">
      <Header 
        title={`Добавить в ${MEAL_NAMES[meal]}`} 
        onBack={handleBack} 
      />
      
      <div className="flex-1 flex flex-col px-4 py-4 pb-24">
        {/* Секция поиска и списка продуктов/рецептов */}
        <FoodSearchSection
          searchQuery={searchQuery}
          activeTab={activeTab}
          onSearchChange={setSearchQuery}
          onTabChange={setActiveTab}
          foods={filteredFoods}
          recipes={filteredRecipes}
          selectedIds={selectedIds}
          getPendingItem={getPendingItem}
          onTogglePending={togglePending}
          onToggleFavorite={handleToggleFavorite}
          onFoodClick={handleFoodClick}
          onRecipeClick={handleRecipeClick}
          onToggleRecipeFavorite={handleToggleRecipeFavorite}
          onCreateFood={handleCreateFood}
          onCreateRecipe={handleCreateRecipe}
        />
      </div>

      {/* Кнопка "Готово" внизу */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-4 border-black">
        <Button
          onClick={handleAddSelectedFoods}
          variant="primary"
          className="w-full uppercase"
          size="default"
        >
          Готово {selectedIds.size > 0 && `(${selectedIds.size})`}
        </Button>
      </div>
    </div>
  );
}