/**
 * RecipeHeader - Шапка страницы рецепта с фото и кнопками
 */

import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeHeaderProps {
  recipeName: string;
  photoUrl?: string;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function RecipeHeader({
  recipeName,
  photoUrl,
  isFavorite,
  onBack,
  onToggleFavorite,
  onShare,
}: RecipeHeaderProps) {
  return (
    <div className="relative h-64 bg-gray-300">
      {/* Фото или серая заглушка */}
      {photoUrl ? (
        <img src={photoUrl} alt={recipeName} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-300" />
      )}

      {/* Кнопки поверх фото */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Кнопка назад */}
        <Button
          onClick={onBack}
          variant="outline"
          size="icon"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </Button>

        {/* Кнопки справа */}
        <div className="flex gap-2">
          {/* Избранное */}
          <Button
            onClick={onToggleFavorite}
            variant={isFavorite ? 'destructive' : 'outline'}
            size="icon"
          >
            <Heart
              className="w-6 h-6"
              strokeWidth={3}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </Button>

          {/* Поделиться */}
          <Button
            onClick={onShare}
            variant="outline"
            size="icon"
          >
            <Share2 className="w-6 h-6" strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
}