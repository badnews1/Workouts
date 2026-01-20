/**
 * CreateRecipeForm - Форма создания рецепта
 * 
 * Переработанная версия с новым дизайном
 */

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner@2.0.3';
import { useRecipes, calculateRecipeNutrition } from '@/entities/recipe';
import { useFoods, type Food } from '@/entities/food';
import type { RecipeIngredient, RecipeStep } from '@/entities/recipe';
import { IngredientSelector } from './IngredientSelector';
import { BasicInfoSection } from './BasicInfoSection';
import { IngredientsSection } from './IngredientsSection';
import { StepsSection } from './StepsSection';
import { generateId } from '@/shared/lib/utils';

interface CreateRecipeFormProps {
  onSuccess: () => void;
}

export function CreateRecipeForm({ onSuccess }: CreateRecipeFormProps) {
  const { addRecipe } = useRecipes();
  const { foods } = useFoods();
  
  // Основная информация
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState<number>(30);
  const [servings, setServings] = useState<number>(4);
  
  // Ингредиенты
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  
  // Шаги
  const [steps, setSteps] = useState<RecipeStep[]>([]);

  // Рассчитываем общий вес автоматически
  const totalWeight = ingredients.reduce((sum, ing) => sum + ing.amount, 0);

  // Рассчитываем КБЖУ
  const nutritionData = totalWeight > 0 && servings > 0
    ? calculateRecipeNutrition(ingredients, foods, totalWeight, servings)
    : null;

  // === ОБРАБОТЧИКИ ОСНОВНОЙ ИНФОРМАЦИИ ===
  
  const handleNameChange = (value: string) => setName(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleCookTimeChange = (value: number) => setCookTime(value);
  const handleServingsChange = (value: number) => setServings(value);

  // === ОБРАБОТЧИКИ ИНГРЕДИЕНТОВ ===
  
  const handleAddIngredient = (food: Food, amount: number) => {
    const ingredient: RecipeIngredient = {
      foodId: food.id,
      name: food.name,
      amount,
      unit: food.unit,
    };
    setIngredients([...ingredients, ingredient]);
    setShowIngredientSelector(false);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAmountChange = (index: number, amount: number) => {
    setIngredients(ingredients.map((ing, i) => 
      i === index ? { ...ing, amount } : ing
    ));
  };

  // === ОБРАБОТЧИКИ ШАГОВ ===
  
  const handleAddStep = (description: string) => {
    const newStep: RecipeStep = {
      id: generateId(),
      order: steps.length + 1,
      description: description || '',
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (stepId: string) => {
    const filtered = steps.filter(s => s.id !== stepId);
    // Пересчитываем порядок
    const reordered = filtered.map((step, index) => ({
      ...step,
      order: index + 1,
    }));
    setSteps(reordered);
  };

  const handleUpdateStep = (stepId: string, description: string) => {
    setSteps(steps.map(step =>
      step.id === stepId ? { ...step, description } : step
    ));
  };

  const handleMoveStepUp = (stepId: string) => {
    const index = steps.findIndex(s => s.id === stepId);
    if (index <= 0) return;
    
    const newSteps = [...steps];
    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    
    // Пересчитываем order
    const reordered = newSteps.map((step, i) => ({
      ...step,
      order: i + 1,
    }));
    setSteps(reordered);
  };

  const handleMoveStepDown = (stepId: string) => {
    const index = steps.findIndex(s => s.id === stepId);
    if (index < 0 || index >= steps.length - 1) return;
    
    const newSteps = [...steps];
    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    
    // Пересчитываем order
    const reordered = newSteps.map((step, i) => ({
      ...step,
      order: i + 1,
    }));
    setSteps(reordered);
  };

  // === СОХРАНЕНИЕ ===
  
  const handleSave = () => {
    // Валидация
    if (!name.trim()) {
      toast.error('Введите название рецепта');
      return;
    }
    if (ingredients.length === 0) {
      toast.error('Добавьте хотя бы один ингредиент');
      return;
    }
    if (servings < 1) {
      toast.error('Укажите количество порций');
      return;
    }
    if (totalWeight <= 0) {
      toast.error('Укажите количество ингредиентов');
      return;
    }

    if (!nutritionData) {
      toast.error('Ошибка расчета КБЖУ');
      return;
    }

    // Создаем рецепт
    addRecipe({
      name: name.trim(),
      description: description.trim(),
      ingredients,
      steps,
      equipment: '', // Убрали поле equipment из дизайна
      servings,
      totalWeight,
      per100g: nutritionData.per100g,
      perServing: nutritionData.perServing,
    });

    toast.success('Рецепт создан');
    onSuccess();
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Секция основной информации */}
      <BasicInfoSection
        name={name}
        description={description}
        cookTime={cookTime}
        servings={servings}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onCookTimeChange={handleCookTimeChange}
        onServingsChange={handleServingsChange}
      />

      {/* Секция ингредиентов */}
      <IngredientsSection
        ingredients={ingredients}
        per100g={nutritionData?.per100g || null}
        perServing={nutritionData?.perServing || null}
        onAddIngredient={() => setShowIngredientSelector(true)}
        onRemoveIngredient={handleRemoveIngredient}
        onAmountChange={handleAmountChange}
      />

      {/* Секция шагов */}
      <StepsSection
        steps={steps}
        onAddStep={handleAddStep}
        onRemoveStep={handleRemoveStep}
        onUpdateStep={handleUpdateStep}
        onMoveStepUp={handleMoveStepUp}
        onMoveStepDown={handleMoveStepDown}
      />

      {/* Кнопка сохранения */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-4 border-black">
        <Button
          onClick={handleSave}
          variant="primary"
          size="lg"
          className="w-full gap-2"
        >
          <Check className="w-5 h-5" strokeWidth={3} />
          Сохранить рецепт
        </Button>
      </div>

      {/* Селектор ингредиентов */}
      {showIngredientSelector && (
        <IngredientSelector
          foods={foods}
          onSelect={handleAddIngredient}
          onClose={() => setShowIngredientSelector(false)}
        />
      )}
    </div>
  );
}