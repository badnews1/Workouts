/**
 * RecipeIngredientsSection - Секция с ингредиентами рецепта
 */

import { Minus, Plus } from 'lucide-react';
import type { RecipeIngredient } from '@/entities/recipe';

interface RecipeIngredientsSectionProps {
  ingredients: RecipeIngredient[];
  servings: number;
  currentServings: number;
  checkedIngredients: Set<number>;
  onServingsChange: (servings: number) => void;
  onToggleIngredient: (index: number) => void;
}

export function RecipeIngredientsSection({
  ingredients,
  servings,
  currentServings,
  checkedIngredients,
  onServingsChange,
  onToggleIngredient,
}: RecipeIngredientsSectionProps) {
  const multiplier = currentServings / servings;

  return (
    <div className="px-4 mb-6">
      {/* Таб */}
      <div className="inline-block bg-black text-[#ffda54] px-4 py-2 font-black uppercase text-xs mb-4 border-4 border-black">
        Ингредиенты
      </div>

      {/* Желтая карточка */}
      <div className="bg-[#ffda54] border-4 border-black shadow-[8px_8px_0_0_#000]">
        {/* Заголовок с контролом порций */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black">
          <h3 className="font-black uppercase text-sm">Продукты</h3>
          
          {/* Контрол порций */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onServingsChange(Math.max(1, currentServings - 1))}
              className="w-10 h-10 bg-white border-4 border-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
            >
              <Minus className="w-5 h-5" strokeWidth={3} />
            </button>
            
            <div className="font-black text-sm min-w-[80px] text-center">
              {currentServings} порц.
            </div>
            
            <button
              onClick={() => onServingsChange(currentServings + 1)}
              className="w-10 h-10 bg-white border-4 border-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
            >
              <Plus className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Список продуктов */}
        <div className="p-4 space-y-3">
          {ingredients.map((ingredient, index) => {
            const amount = ingredient.amount * multiplier;
            const isChecked = checkedIngredients.has(index);

            return (
              <div
                key={index}
                className="bg-white border-4 border-black p-4 flex items-center gap-3"
              >
                {/* Чекбокс */}
                <button
                  onClick={() => onToggleIngredient(index)}
                  className={`w-10 h-10 border-4 border-black flex-shrink-0 transition-all ${
                    isChecked ? 'bg-black' : 'bg-white'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </button>

                {/* Иконка продукта (серый квадрат) */}
                <div className="w-12 h-12 bg-gray-200 border-4 border-black flex-shrink-0" />

                {/* Название продукта */}
                <div className="flex-1 min-w-0">
                  <div className={`font-black text-sm ${isChecked ? 'line-through opacity-50' : ''}`}>
                    {ingredient.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Продукт
                  </div>
                </div>

                {/* Количество */}
                <div className="font-black text-sm flex-shrink-0">
                  {Math.round(amount)} {ingredient.unit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}