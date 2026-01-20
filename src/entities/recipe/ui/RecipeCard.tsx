/**
 * RecipeCard - Карточка рецепта
 */

import { Star, ChefHat, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Recipe } from '../model/types';

interface RecipeCardProps {
  recipe: Recipe;
  isSelected?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  onClick?: (recipeId: string) => void;
}

export function RecipeCard({ 
  recipe, 
  isSelected = false,
  onToggleFavorite,
  onClick,
}: RecipeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(recipe.id);
  };

  const handleCardClick = () => {
    onClick?.(recipe.id);
  };

  return (
    <Card
      size="md"
      backgroundColor={isSelected ? 'var(--brand-yellow)' : 'var(--brand-white)'}
      className="p-4 cursor-pointer transition-colors"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[var(--brand-blue)] border-3 border-black flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-sm uppercase line-clamp-1">{recipe.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" strokeWidth={3} />
                <span className="text-xs font-bold">{recipe.servings} порц.</span>
              </div>
              <span className="text-xs font-bold text-gray-500">
                {recipe.totalWeight}г
              </span>
            </div>
          </div>
        </div>
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
            aria-label={recipe.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <Star
              className={`w-5 h-5 ${
                recipe.isFavorite ? 'fill-[var(--brand-yellow)] text-black' : 'text-gray-400'
              }`}
              strokeWidth={3}
            />
          </button>
        )}
      </div>

      {/* КБЖУ на порцию */}
      <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t-3 border-black">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase">Ккал</div>
          <div className="text-sm font-black">{recipe.perServing.calories}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase">Б</div>
          <div className="text-sm font-black">{recipe.perServing.protein}г</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase">Ж</div>
          <div className="text-sm font-black">{recipe.perServing.fat}г</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase">У</div>
          <div className="text-sm font-black">{recipe.perServing.carbs}г</div>
        </div>
      </div>
    </Card>
  );
}
