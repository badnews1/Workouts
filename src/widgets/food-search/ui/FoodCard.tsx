/**
 * FoodCard - Карточка продукта с возможностью выбора
 */

import { Check, Star } from 'lucide-react';
import type { Food } from '@/entities/food';
import { Card } from '@/components/ui/card';

interface FoodCardProps {
  food: Food;
  isSelected: boolean;
  displayAmount: number;
  displayCalories: number;
  onToggleSelect: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export function FoodCard({
  food,
  isSelected,
  displayAmount,
  displayCalories,
  onToggleSelect,
  onToggleFavorite,
  onClick,
}: FoodCardProps) {
  return (
    <Card
      onClick={onClick}
      className="p-4 flex items-start gap-3 cursor-pointer active:translate-x-1 active:translate-y-1"
    >
      {/* Чекбокс */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect();
        }}
        style={{
          backgroundColor: isSelected ? 'var(--brand-green)' : 'var(--brand-white)',
        }}
        className="w-7 h-7 border-3 border-black flex-shrink-0 flex items-center justify-center transition-all"
      >
        {isSelected && <Check className="w-5 h-5 text-white" strokeWidth={4} />}
      </button>

      {/* Информация о продукте */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="font-black text-base mb-1">{food.name}</div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              {food.brand && <span>{food.brand}</span>}
              {food.brand && food.category && <span className="text-gray-400">•</span>}
              {food.category && <span>{food.category}</span>}
            </div>
          </div>
          <button
            onClick={onToggleFavorite}
            style={{
              color: food.isFavorite ? 'var(--brand-yellow)' : '#d1d5db',
            }}
            className="p-1"
          >
            <Star 
              size={20} 
              strokeWidth={3}
              fill={food.isFavorite ? 'var(--brand-yellow)' : 'none'}
            />
          </button>
        </div>
        
        <div className="text-sm font-black text-gray-700">
          {displayCalories} ккал на {displayAmount}{food.unit}
        </div>
      </div>
    </Card>
  );
}