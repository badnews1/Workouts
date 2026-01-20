/**
 * RecipeInfoCard - Карточка с основной информацией о рецепте
 */

import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface RecipeInfoCardProps {
  name: string;
  servings: number;
  mealType?: string;
}

export function RecipeInfoCard({
  name,
  servings,
  mealType,
}: RecipeInfoCardProps) {
  return (
    <Card backgroundColor="white" size="xl" className="mx-4 -mt-8 relative z-10 p-6">
      {/* Таб категории */}
      {mealType && (
        <div className="inline-block bg-[#ffda54] border-4 border-black px-4 py-1 font-black uppercase text-xs mb-6">
          {mealType}
        </div>
      )}

      {/* Название */}
      <h1 className="font-black text-6xl mb-6">
        {name}
      </h1>

      {/* Порции */}
      <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black bg-white">
        <Users className="w-5 h-5" strokeWidth={3} />
        <span className="font-black text-sm">{servings} порции</span>
      </div>
    </Card>
  );
}