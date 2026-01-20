/**
 * NutritionPreview - Превью КБЖУ рецепта
 */

import { Card } from '@/components/ui/card';
import type { NutritionalValue } from '@/entities/food';

interface NutritionPreviewProps {
  per100g: NutritionalValue;
  perServing: NutritionalValue;
}

export function NutritionPreview({ per100g, perServing }: NutritionPreviewProps) {
  return (
    <Card size="md" backgroundColor="var(--brand-blue)" className="p-4">
      <h3 className="text-sm font-black uppercase mb-3">Пищевая ценность</h3>
      
      {/* На 100г */}
      <div className="mb-3">
        <div className="text-xs font-bold text-gray-700 mb-2">На 100г:</div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <div className="text-xs font-bold text-gray-600">Ккал</div>
            <div className="text-lg font-black">{per100g.calories}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600">Б</div>
            <div className="text-lg font-black">{per100g.protein}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600">Ж</div>
            <div className="text-lg font-black">{per100g.fat}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600">У</div>
            <div className="text-lg font-black">{per100g.carbs}г</div>
          </div>
        </div>
      </div>

      {/* На порцию */}
      <div className="pt-3 border-t-3 border-black">
        <div className="text-xs font-bold text-gray-700 mb-2">На порцию:</div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <div className="text-xs font-bold text-gray-600">Ккал</div>
            <div className="text-lg font-black">{perServing.calories}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600">Б</div>
            <div className="text-lg font-black">{perServing.protein}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600">Ж</div>
            <div className="text-lg font-black">{perServing.fat}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600">У</div>
            <div className="text-lg font-black">{perServing.carbs}г</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
