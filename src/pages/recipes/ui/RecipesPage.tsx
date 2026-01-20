/**
 * RecipesPage - Страница со списком всех рецептов
 * 
 * Позволяет просматривать все созданные рецепты и создавать новые
 * 
 * Роут: /food
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search } from 'lucide-react';
import { Header } from '@/shared';
import { useRecipes } from '@/entities/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RecipeList } from '@/widgets/food-search';
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions } from '@/components/ui/empty';

export function RecipesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { recipes, toggleRecipeFavorite } = useRecipes();

  // Фильтрация рецептов по поисковому запросу
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe-detail?recipeId=${recipeId}`);
  };

  const handleCreateRecipe = () => {
    navigate('/create-recipe');
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <Header 
        title="Мои рецепты" 
        onBack={() => navigate('/nutrition')}
      />
      
      <div className="flex-1 flex flex-col px-4 py-4 pb-24 overflow-y-auto">
        {/* Поиск */}
        <div className="mb-4">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              size={20} 
              strokeWidth={2.5}
            />
            <Input
              type="text"
              placeholder="Поиск рецептов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Кнопка создания */}
        <Button
          onClick={handleCreateRecipe}
          variant="primary"
          className="w-full mb-4 gap-2"
        >
          <Plus size={20} strokeWidth={3} />
          Создать рецепт
        </Button>

        {/* Список рецептов */}
        {filteredRecipes.length > 0 ? (
          <RecipeList
            recipes={filteredRecipes}
            onRecipeClick={handleRecipeClick}
            onToggleFavorite={toggleRecipeFavorite}
          />
        ) : (
          <Empty>
            <EmptyIcon variant="emoji">
              {searchQuery ? '🔍' : '🍽️'}
            </EmptyIcon>
            <EmptyTitle>
              {searchQuery ? 'Рецепты не найдены' : 'Нет рецептов'}
            </EmptyTitle>
            <EmptyDescription>
              {searchQuery 
                ? 'Попробуйте изменить поисковый запрос' 
                : 'Создайте свой первый рецепт'}
            </EmptyDescription>
            {!searchQuery && (
              <EmptyActions>
                <Button 
                  size="md" 
                  variant="primary"
                  onClick={handleCreateRecipe}
                >
                  <Plus size={20} strokeWidth={3} />
                  Создать рецепт
                </Button>
              </EmptyActions>
            )}
          </Empty>
        )}
      </div>
    </div>
  );
}