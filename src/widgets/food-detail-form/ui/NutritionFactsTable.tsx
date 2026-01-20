/**
 * NutritionFactsTable - Таблица пищевой ценности
 * 
 * Отображает пищевую ценность на 100г
 */

import { Card } from '@/components/ui/card';

interface NutritionFactsTableProps {
  unit: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export function NutritionFactsTable({ unit, nutrition }: NutritionFactsTableProps) {
  return (
    <Card className="p-6" shadow="large">
      <h2 className="font-black text-lg uppercase mb-1">Пищевая ценность</h2>
      <div className="font-bold text-gray-500 text-xs uppercase mb-4">
        На 100{unit}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Калории</span>
          <span className="font-black text-xl">{nutrition.calories} ккал</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Белки</span>
          <span className="font-black text-xl">{nutrition.protein} г</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Жиры</span>
          <span className="font-black text-xl">{nutrition.fat} г</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Углеводы</span>
          <span className="font-black text-xl">{nutrition.carbs} г</span>
        </div>
      </div>
    </Card>
  );
}