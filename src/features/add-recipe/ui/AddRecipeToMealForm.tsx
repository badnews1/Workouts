/**
 * AddRecipeToMealForm - Форма добавления рецепта в прием пищи
 */

import { useState } from 'react';
import { ChefHat, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner@2.0.3';
import { generateId } from '@/shared/lib/utils';
import { useMealData, type MealType, MEAL_NAMES } from '@/entities/food';
import type { Recipe } from '@/entities/recipe';

interface AddRecipeToMealFormProps {
  recipe: Recipe;
  meal: MealType;
  date: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type AmountType = 'servings' | 'grams';

export function AddRecipeToMealForm({ 
  recipe, 
  meal, 
  date, 
  onSuccess, 
  onCancel 
}: AddRecipeToMealFormProps) {
  const { addFoodToMeal } = useMealData(date);
  
  const [amountType, setAmountType] = useState<AmountType>('servings');
  const [servings, setServings] = useState<number>(1);
  const [grams, setGrams] = useState<number>(100);

  // Рассчитываем КБЖУ
  const calculateNutrition = () => {
    if (amountType === 'servings') {
      const multiplier = servings;
      return {
        calories: Math.round(recipe.perServing.calories * multiplier),
        protein: Math.round(recipe.perServing.protein * multiplier * 10) / 10,
        fat: Math.round(recipe.perServing.fat * multiplier * 10) / 10,
        carbs: Math.round(recipe.perServing.carbs * multiplier * 10) / 10,
        amount: servings,
        unit: servings === 1 ? 'порция' : servings < 5 ? 'порции' : 'порций',
      };
    } else {
      const multiplier = grams / 100;
      return {
        calories: Math.round(recipe.per100g.calories * multiplier),
        protein: Math.round(recipe.per100g.protein * multiplier * 10) / 10,
        fat: Math.round(recipe.per100g.fat * multiplier * 10) / 10,
        carbs: Math.round(recipe.per100g.carbs * multiplier * 10) / 10,
        amount: grams,
        unit: 'г',
      };
    }
  };

  const nutrition = calculateNutrition();

  // Добавить рецепт в прием пищи
  const handleAdd = () => {
    if (amountType === 'servings' && servings <= 0) {
      toast.error('Укажите количество порций');
      return;
    }
    if (amountType === 'grams' && grams <= 0) {
      toast.error('Укажите количество грамм');
      return;
    }

    addFoodToMeal(meal, {
      id: generateId(),
      name: recipe.name,
      calories: nutrition.calories,
      protein: nutrition.protein,
      fat: nutrition.fat,
      carbs: nutrition.carbs,
      amount: nutrition.amount,
      unit: nutrition.unit,
      foodId: recipe.id,
    });

    toast.success(`${recipe.name} добавлен в ${MEAL_NAMES[meal]}`);
    onSuccess();
  };

  return (
    <div className="space-y-6">
      {/* Информация о рецепте */}
      <Card size="md" backgroundColor="var(--brand-yellow)" className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[var(--brand-blue)] border-3 border-black flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
          <div>
            <h2 className="font-black text-lg uppercase">{recipe.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Users className="w-4 h-4" strokeWidth={3} />
              <span className="text-sm font-bold">{recipe.servings} порций · {recipe.totalWeight}г</span>
            </div>
          </div>
        </div>

        {/* КБЖУ на порцию */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t-3 border-black">
          <div>
            <div className="text-xs font-bold text-gray-600 uppercase">Ккал</div>
            <div className="text-sm font-black">{recipe.perServing.calories}</div>
            <div className="text-xs text-gray-500">порция</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600 uppercase">Б</div>
            <div className="text-sm font-black">{recipe.perServing.protein}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600 uppercase">Ж</div>
            <div className="text-sm font-black">{recipe.perServing.fat}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600 uppercase">У</div>
            <div className="text-sm font-black">{recipe.perServing.carbs}г</div>
          </div>
        </div>
      </Card>

      {/* Выбор типа количества */}
      <div>
        <label className="block text-xs font-black uppercase mb-2">
          Как добавить?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setAmountType('servings')}
            className={`p-4 border-3 border-black font-black text-sm uppercase transition-colors ${
              amountType === 'servings' 
                ? 'bg-[var(--brand-yellow)]' 
                : 'bg-white'
            }`}
            style={{ boxShadow: '4px 4px 0px var(--brand-black)' }}
          >
            Порции
          </button>
          <button
            onClick={() => setAmountType('grams')}
            className={`p-4 border-3 border-black font-black text-sm uppercase transition-colors ${
              amountType === 'grams' 
                ? 'bg-[var(--brand-yellow)]' 
                : 'bg-white'
            }`}
            style={{ boxShadow: '4px 4px 0px var(--brand-black)' }}
          >
            Граммы
          </button>
        </div>
      </div>

      {/* Ввод количества */}
      <div>
        <label className="block text-xs font-black uppercase mb-2">
          {amountType === 'servings' ? 'Количество порций' : 'Количество грамм'}
        </label>
        {amountType === 'servings' ? (
          <Input
            type="number"
            value={servings || ''}
            onChange={(e) => setServings(Number(e.target.value))}
            min="1"
            step="0.5"
            placeholder="1"
          />
        ) : (
          <Input
            type="number"
            value={grams || ''}
            onChange={(e) => setGrams(Number(e.target.value))}
            min="1"
            placeholder="100"
          />
        )}
      </div>

      {/* Превью КБЖУ */}
      <Card size="md" backgroundColor="var(--brand-blue)" className="p-4">
        <h3 className="text-sm font-black uppercase mb-3">Будет добавлено</h3>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <div className="text-xs font-bold text-gray-700 uppercase">Ккал</div>
            <div className="text-lg font-black text-white">{nutrition.calories}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-700 uppercase">Б</div>
            <div className="text-lg font-black text-white">{nutrition.protein}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-700 uppercase">Ж</div>
            <div className="text-lg font-black text-white">{nutrition.fat}г</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-700 uppercase">У</div>
            <div className="text-lg font-black text-white">{nutrition.carbs}г</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t-3 border-black">
          <span className="text-sm font-bold text-gray-700">
            {nutrition.amount} {nutrition.unit}
          </span>
        </div>
      </Card>

      {/* Ингредиенты */}
      <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
        <h3 className="text-sm font-black uppercase mb-3">Ингредиенты</h3>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="font-bold">{ingredient.name}</span>
              <span className="text-gray-600">{ingredient.amount} {ingredient.unit}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Шаги приготовления */}
      {recipe.steps.length > 0 && (
        <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
          <h3 className="text-sm font-black uppercase mb-3">Приготовление</h3>
          <div className="space-y-3">
            {recipe.steps.map((step) => (
              <div key={step.id}>
                <div className="text-xs font-black text-gray-500 uppercase mb-1">
                  Шаг {step.order}
                </div>
                <p className="text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Инвентарь */}
      {recipe.equipment && (
        <Card size="md" backgroundColor="var(--brand-white)" className="p-4">
          <h3 className="text-sm font-black uppercase mb-2">Инвентарь</h3>
          <p className="text-sm">{recipe.equipment}</p>
        </Card>
      )}

      {/* Кнопки */}
      <div className="flex gap-3 sticky bottom-0 bg-white pt-4 pb-4 -mx-4 px-4 border-t-4 border-black">
        <Button
          onClick={onCancel}
          variant="secondary"
          className="flex-1"
        >
          Отмена
        </Button>
        <Button
          onClick={handleAdd}
          variant="primary"
          className="flex-1"
        >
          Добавить
        </Button>
      </div>
    </div>
  );
}
