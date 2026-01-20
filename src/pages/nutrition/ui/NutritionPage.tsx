/**
 * NutritionPage - Страница питания
 * 
 * Отображает дневник питания с селектором даты и приемами пищи
 */

import { Header, DateSelector } from '@/shared';
import { toast } from 'sonner@2.0.3';
import { useNavigate, useSearchParams } from 'react-router';
import { useMealData, useNutritionGoals, type MealType } from '@/entities/food';
import { getDateKey } from '@/shared/lib';
import { calculateDailyTotals } from '../model';
import { useDateNavigation } from '../model/useDateNavigation';
import { NutritionStats } from '@/widgets/nutrition-stats';
import { MealsSection } from '@/widgets/meals-section';
import { ChefHat } from 'lucide-react';

export function NutritionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Инициализируем дату из URL параметра, если есть
  const dateParam = searchParams.get('date');
  const initialDate = dateParam ? new Date(dateParam) : new Date();
  
  // Хук навигации по датам
  const { selectedDate, changeDate } = useDateNavigation({ initialDate });
  
  // Используем хуки из entities
  const { mealData, removeFoodFromMeal } = useMealData(getDateKey(selectedDate));
  const { goals } = useNutritionGoals();

  const totals = calculateDailyTotals(mealData);

  // Удалить блюдо
  const handleDeleteFood = (mealType: MealType, foodId: string) => {
    removeFoodFromMeal(mealType, foodId);
    toast.success('Блюдо удалено');
  };

  // Добавить блюдо
  const handleAddFood = (mealType: MealType, dateKey: string) => {
    navigate(`/add-food?meal=${mealType}&date=${dateKey}`);
  };

  // Кнопка перехода к рецептам
  const recipesButton = (
    <button
      onClick={() => navigate('/recipes')}
      className="p-2"
      style={{
        backgroundColor: 'var(--brand-yellow)',
        border: '3px solid var(--brand-black)',
      }}
      aria-label="Мои рецепты"
    >
      <ChefHat className="w-5 h-5" style={{ color: 'var(--brand-black)' }} strokeWidth={2.5} />
    </button>
  );

  return (
    <div className="h-full bg-white">
      <Header 
        title="Питание" 
        rightAction={recipesButton}
      />

      <div className="px-4 py-6 pb-24">
        {/* Селектор даты */}
        <DateSelector 
          selectedDate={selectedDate} 
          onChangeDate={changeDate} 
        />

        {/* Блок макронутриентов */}
        <NutritionStats 
          totals={totals} 
          goals={goals} 
        />

        {/* Приемы пищи */}
        <MealsSection
          mealData={mealData}
          dateKey={getDateKey(selectedDate)}
          onDeleteFood={handleDeleteFood}
          onAddFood={handleAddFood}
        />
      </div>
    </div>
  );
}