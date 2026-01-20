/**
 * RecipeList - Список рецептов
 */

import type { Recipe } from '@/entities/recipe';
import { RecipeCard } from '@/entities/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeClick?: (recipeId: string) => void;
  onToggleFavorite?: (recipeId: string) => void;
}

export function RecipeList({ 
  recipes, 
  onRecipeClick,
  onToggleFavorite,
}: RecipeListProps) {
  return (
    <div className="space-y-3">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={onRecipeClick}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
