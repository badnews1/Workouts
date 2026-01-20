/**
 * RecipeDetailPage - Детальная страница рецепта
 * 
 * Показывает полную информацию о рецепте с возможностью отметки ингредиентов и шагов
 * 
 * Роут: /recipe-detail?recipeId=123
 */

import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Edit, Plus } from 'lucide-react';
import { useRecipes } from '@/entities/recipe';
import { toast } from 'sonner@2.0.3';
import {
  RecipeHeader,
  RecipeInfoCard,
  RecipeNutrition,
  RecipeIngredientsSection,
  RecipeStepsSection,
} from '@/widgets/recipe-detail-view';

export function RecipeDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const recipeId = searchParams.get('recipeId') || '';

  const { getRecipeById, toggleFavorite } = useRecipes();
  const recipe = getRecipeById(recipeId);

  // Состояние для количества порций (можно менять)
  const [currentServings, setCurrentServings] = useState(recipe?.servings || 1);
  
  // Отмеченные ингредиенты
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  
  // Отмеченные шаги
  const [checkedSteps, setCheckedSteps] = useState<Set<string>>(new Set());

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (recipe) {
      toggleFavorite(recipe.id);
      toast.success(recipe.isFavorite ? 'Убрано из избранного' : 'Добавлено в избранное');
    }
  };

  const handleShare = () => {
    // TODO: Реализовать функционал поделиться
    toast.success('Функция "Поделиться" будет добавлена');
  };

  const handleToggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const handleToggleStep = (stepId: string) => {
    const newChecked = new Set(checkedSteps);
    if (newChecked.has(stepId)) {
      newChecked.delete(stepId);
    } else {
      newChecked.add(stepId);
    }
    setCheckedSteps(newChecked);
  };

  const handleEdit = () => {
    // TODO: Переход на страницу редактирования
    toast.success('Функция редактирования будет добавлена');
  };

  const handleAddToDiary = () => {
    // TODO: Открыть модалку выбора приема пищи
    toast.success('Функция добавления в дневник будет добавлена');
  };

  if (!recipe) {
    return (
      <div className="h-full bg-[#f5f5f5] flex items-center justify-center p-4">
        <p className="text-gray-500 font-bold">Рецепт не найден</p>
      </div>
    );
  }

  // Пересчитываем КБЖУ на выбранное количество порций
  const adjustedNutrition = {
    calories: recipe.perServing.calories * currentServings,
    protein: recipe.perServing.protein * currentServings,
    fat: recipe.perServing.fat * currentServings,
    carbs: recipe.perServing.carbs * currentServings,
  };

  return (
    <div className="h-full bg-[#f5f5f5] flex flex-col overflow-y-auto pb-28">
      {/* Шапка с фото и кнопками */}
      <RecipeHeader
        recipeName={recipe.name}
        photoUrl={undefined} // TODO: добавить поле photo в модель Recipe
        isFavorite={recipe.isFavorite}
        onBack={handleBack}
        onToggleFavorite={handleToggleFavorite}
        onShare={handleShare}
      />

      {/* Основная информация (наезжает на фото) */}
      <RecipeInfoCard
        name={recipe.name}
        servings={recipe.servings}
        mealType="ОБЕД"
      />

      {/* КБЖУ */}
      <div className="mt-6">
        <RecipeNutrition
          calories={adjustedNutrition.calories}
          protein={adjustedNutrition.protein}
          fat={adjustedNutrition.fat}
          carbs={adjustedNutrition.carbs}
        />
      </div>

      {/* Ингредиенты */}
      <RecipeIngredientsSection
        ingredients={recipe.ingredients}
        servings={recipe.servings}
        currentServings={currentServings}
        checkedIngredients={checkedIngredients}
        onServingsChange={setCurrentServings}
        onToggleIngredient={handleToggleIngredient}
      />

      {/* Шаги приготовления */}
      <RecipeStepsSection
        steps={recipe.steps}
        checkedSteps={checkedSteps}
        onToggleStep={handleToggleStep}
      />

      {/* Кнопки действий */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-4 border-black flex gap-3">
        {/* Изменить */}
        <button
          onClick={handleEdit}
          className="flex-1 py-4 bg-white border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <Edit className="w-5 h-5" strokeWidth={3} />
          Изменить
        </button>

        {/* В дневник */}
        <button
          onClick={handleAddToDiary}
          className="flex-1 py-4 bg-[#10B981] text-white border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          В дневник
        </button>
      </div>
    </div>
  );
}