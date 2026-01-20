/**
 * FoodDetailHeader - Шапка страницы детальной информации о продукте
 * 
 * Отображает название продукта, бренд и кнопку избранного
 */

import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FoodDetailHeaderProps {
  name: string;
  brand: string;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
}

export function FoodDetailHeader({ 
  name, 
  brand, 
  isFavorite, 
  onBack, 
  onToggleFavorite 
}: FoodDetailHeaderProps) {
  return (
    <div className="bg-[#1a1a1a] text-white px-4 py-4 border-b-4 border-black">
      <div className="flex items-start justify-between gap-3">
        {/* Кнопка назад и название */}
        <div className="flex items-start gap-3 flex-1">
          <Button
            onClick={onBack}
            variant="secondary"
            size="icon-sm"
            className="flex-shrink-0 mt-1"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          </Button>
          
          <div className="flex-1">
            <h1 className="font-black text-xl uppercase leading-tight mb-1">{name}</h1>
            {brand && (
              <div className="font-bold text-sm opacity-70">{brand}</div>
            )}
          </div>
        </div>

        {/* Кнопка избранного */}
        <Button
          onClick={onToggleFavorite}
          variant="outline"
          size="icon-sm"
          className="flex-shrink-0 mt-1"
        >
          <Heart 
            className="w-6 h-6" 
            strokeWidth={3}
            fill={isFavorite ? '#1a1a1a' : 'none'}
            stroke="#1a1a1a"
          />
        </Button>
      </div>
    </div>
  );
}