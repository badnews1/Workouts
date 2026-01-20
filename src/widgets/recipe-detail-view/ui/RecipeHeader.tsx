/**
 * RecipeHeader - Шапка страницы рецепта с фото и кнопками
 */

import { ArrowLeft, Heart, Share2 } from 'lucide-react';

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
    <div className="relative h-64 bg-gray-200">
      {/* Фото или заглушка */}
      {photoUrl ? (
        <img src={photoUrl} alt={recipeName} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
          <span className="text-gray-400 font-black text-sm uppercase">Нет фото</span>
        </div>
      )}

      {/* Кнопки поверх фото */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Кнопка назад */}
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </button>

        {/* Кнопки справа */}
        <div className="flex gap-2">
          {/* Избранное */}
          <button
            onClick={onToggleFavorite}
            className={`w-12 h-12 border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center ${
              isFavorite ? 'bg-[#ef4444] text-white' : 'bg-white'
            }`}
          >
            <Heart
              className="w-6 h-6"
              strokeWidth={3}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>

          {/* Поделиться */}
          <button
            onClick={onShare}
            className="w-12 h-12 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
          >
            <Share2 className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
