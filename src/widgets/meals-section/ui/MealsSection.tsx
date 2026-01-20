/**
 * MealsSection - Виджет секции приемов пищи
 * 
 * Отображает список всех приемов пищи с добавленными блюдами
 */

import { Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Empty, EmptyTitle } from '@/components/ui/empty';
import { formatMacros } from '@/entities/food';
import type { MealType } from '@/entities/food';
import type { NutritionDay } from '@/entities/food';
import { MEAL_NAMES } from '@/entities/food/config/mealConfig';

interface MealsSectionProps {
  mealData: NutritionDay;
  dateKey: string;
  onDeleteFood: (mealType: MealType, foodId: string) => void;
  onAddFood: (mealType: MealType, dateKey: string) => void;
}

export function MealsSection({ mealData, dateKey, onDeleteFood, onAddFood }: MealsSectionProps) {
  return (
    <div className="space-y-4">
      {(Object.keys(MEAL_NAMES) as MealType[]).map((mealType) => (
        <Card key={mealType}>
          {/* Заголовок приема пищи */}
          <CardHeader variant="yellow">
            <CardTitle>{MEAL_NAMES[mealType]}</CardTitle>
            <CardDescription>
              {mealData[mealType].reduce((sum, item) => sum + item.calories, 0)} ккал
            </CardDescription>
          </CardHeader>

          {/* Список блюд */}
          <CardContent>
            {mealData[mealType].length > 0 ? (
              <div className="space-y-2 mb-3">
                {mealData[mealType].map((food) => (
                  <div
                    key={food.id}
                    className="flex items-start justify-between p-3 border-2 border-black"
                  >
                    <div className="flex-1">
                      <div className="font-black text-sm mb-1">{food.name}</div>
                      <div className="flex gap-3 text-xs font-bold text-gray-600">
                        <span>{food.calories} ккал</span>
                        <span>Б: {food.protein}г</span>
                        <span>Ж: {food.fat}г</span>
                        <span>У: {food.carbs}г</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => onDeleteFood(mealType, food.id)}
                      variant="ghost"
                      size="icon-sm"
                      className="ml-3"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3">
                <Empty className="py-4">
                  <EmptyTitle className="text-sm text-gray-400">Нет добавленных блюд</EmptyTitle>
                </Empty>
              </div>
            )}

            {/* Кнопка добавления */}
            <Button
              onClick={() => onAddFood(mealType, dateKey)}
              variant="outline"
              size="sm"
              className="w-full gap-2"
              style={{ boxShadow: '2px 2px 0px var(--brand-black)' }}
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              <span className="uppercase">Добавить блюдо</span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}