/**
 * IngredientsSection - Секция ингредиентов рецепта
 * 
 * Отображает список продуктов с автоматическим расчетом КБЖУ на порцию
 */

import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { RecipeIngredient } from '@/entities/recipe';

interface IngredientsSectionProps {
  ingredients: RecipeIngredient[];
  per100g: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  } | null;
  perServing: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  } | null;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
  onAmountChange: (index: number, amount: number) => void;
}

export function IngredientsSection({
  ingredients,
  per100g,
  perServing,
  onAddIngredient,
  onRemoveIngredient,
  onAmountChange,
}: IngredientsSectionProps) {
  return (
    <div>
      {/* Таб "ИНГРЕДИЕНТЫ" */}
      <div className="inline-block bg-black text-[#ffda54] px-4 py-2 font-black uppercase text-xs mb-4 border-4 border-black">
        Ингредиенты
      </div>

      {/* Желтая карточка со списком продуктов */}
      <Card backgroundColor="#ffda54" size="xl" className="mb-4">
        <CardContent className="p-4">
          {/* Заголовок с бейджем */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black uppercase text-sm">Список продуктов</h3>
            <div className="bg-black text-white w-8 h-8 border-4 border-black flex items-center justify-center font-black text-sm">
              {ingredients.length}
            </div>
          </div>

          {/* Список продуктов */}
          {ingredients.length === 0 ? (
            <p className="text-sm text-center py-4 font-bold opacity-70">
              Добавьте продукты в рецепт
            </p>
          ) : (
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <Card
                  key={index}
                  backgroundColor="white"
                  className="p-3 flex items-center gap-3"
                >
                  {/* Название и бренд */}
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm truncate">
                      {ingredient.name}
                    </div>
                    <div className="font-bold text-xs text-gray-600 truncate">
                      {/* TODO: Бренд продукта если есть */}
                      Продукт
                    </div>
                  </div>

                  {/* Количество */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Input
                      type="number"
                      value={ingredient.amount || ''}
                      onChange={(e) => onAmountChange(index, Number(e.target.value))}
                      className="w-20 border-4 border-black text-center font-black"
                      min="0"
                    />
                    <span className="font-black text-sm w-6">{ingredient.unit}</span>
                  </div>

                  {/* Кнопка удаления */}
                  <Button
                    onClick={() => onRemoveIngredient(index)}
                    variant="outline"
                    size="icon-sm"
                    shadow={false}
                    className="flex-shrink-0 shadow-[2px_2px_0_0_#000] active:shadow-none"
                  >
                    <X className="w-5 h-5" strokeWidth={3} />
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {/* Кнопка добавления */}
          <Button
            onClick={onAddIngredient}
            variant="outline"
            className="w-full mt-4 gap-2"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Добавить ингредиент
          </Button>
        </CardContent>
      </Card>

      {/* Пищевая ценность на порцию */}
      {perServing && (
        <Card backgroundColor="white" size="xl">
          <CardContent className="p-6">
            <h4 className="font-black uppercase text-xs mb-4 text-gray-500">
              Пищевая ценность (на порцию)
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {/* Калории */}
              <div className="text-center border-4 border-black p-4">
                <div className="font-black text-3xl leading-none mb-1">
                  {Math.round(perServing.calories)}
                </div>
                <div className="font-black text-xs uppercase text-gray-600">
                  ккал
                </div>
              </div>

              {/* Белки */}
              <div className="text-center border-4 border-black p-4">
                <div className="font-black text-3xl leading-none mb-1">
                  {Math.round(perServing.protein)}
                </div>
                <div className="font-black text-xs uppercase text-gray-600">
                  белки
                </div>
              </div>

              {/* Жиры */}
              <div className="text-center border-4 border-black p-4">
                <div className="font-black text-3xl leading-none mb-1">
                  {Math.round(perServing.fat)}
                </div>
                <div className="font-black text-xs uppercase text-gray-600">
                  жиры
                </div>
              </div>

              {/* Углеводы */}
              <div className="text-center border-4 border-black p-4">
                <div className="font-black text-3xl leading-none mb-1">
                  {Math.round(perServing.carbs)}
                </div>
                <div className="font-black text-xs uppercase text-gray-600">
                  углев.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}