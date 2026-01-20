/**
 * NutritionStats - Виджет статистики макронутриентов
 * 
 * Отображает калории и БЖУ с прогресс-барами
 */

import type { NutritionGoals, DailyTotals } from '@/entities/food';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NutritionStatsProps {
  totals: DailyTotals;
  goals: NutritionGoals;
}

export function NutritionStats({ totals, goals }: NutritionStatsProps) {
  const caloriesPercent = Math.min((totals.calories / goals.calories) * 100, 100);
  const proteinPercent = Math.min((totals.protein / goals.protein) * 100, 100);
  const fatPercent = Math.min((totals.fat / goals.fat) * 100, 100);
  const carbsPercent = Math.min((totals.carbs / goals.carbs) * 100, 100);
  const caloriesOverGoal = totals.calories > goals.calories;

  return (
    <Card className="mb-6" shadow="default">
      {/* Калории - главный элемент */}
      <div className="p-5 border-b-4 border-black">
        <div className="mb-2">
          <span className="text-xs font-black uppercase text-gray-500">Калории</span>
        </div>
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{totals.calories}</span>
            <span className="text-lg font-bold text-gray-500">/ {goals.calories}</span>
          </div>
        </div>
        <Progress
          value={caloriesPercent}
          variant={caloriesOverGoal ? 'destructive' : 'primary'}
          size="md"
        />
      </div>

      {/* Белки, Жиры, Углеводы */}
      <div className="grid grid-cols-3">
        {/* Белки */}
        <div className="p-4 border-r-4 border-black">
          <div className="mb-2">
            <span className="text-xs font-black uppercase text-gray-500">Белки</span>
          </div>
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">{totals.protein}</span>
              <span className="text-xs font-bold text-gray-500">/ {goals.protein} г</span>
            </div>
          </div>
          <Progress
            value={proteinPercent}
            variant="info"
            size="sm"
          />
        </div>

        {/* Жиры */}
        <div className="p-4 border-r-4 border-black">
          <div className="mb-2">
            <span className="text-xs font-black uppercase text-gray-500">Жиры</span>
          </div>
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">{totals.fat}</span>
              <span className="text-xs font-bold text-gray-500">/ {goals.fat} г</span>
            </div>
          </div>
          <Progress
            value={fatPercent}
            variant="secondary"
            size="sm"
          />
        </div>

        {/* Углеводы */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs font-black uppercase text-gray-500">Углеводы</span>
          </div>
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">{totals.carbs}</span>
              <span className="text-xs font-bold text-gray-500">/ {goals.carbs} г</span>
            </div>
          </div>
          <Progress
            value={carbsPercent}
            variant="destructive"
            size="sm"
          />
        </div>
      </div>
    </Card>
  );
}