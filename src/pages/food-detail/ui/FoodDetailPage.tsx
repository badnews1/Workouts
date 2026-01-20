/**
 * FoodDetailPage - Страница детальной информации о продукте
 * 
 * Отображает информацию о продукте, позволяет указать количество грамм
 * и автоматически пересчитывает КБЖУ
 * 
 * Роут: /food-detail?foodId=123&meal=breakfast&date=2024-01-17
 */

import { useNavigate, useSearchParams } from 'react-router';
import { getTodayDateKey } from '@/shared';
import type { MealType } from '@/entities/food';
import { 
  FoodDetailHeader,
  QuickPortionSelector, 
  YourPortionCard,
  NutrientsAccordion 
} from '@/widgets/food-detail-form';
import { useFoodDetail } from '../model/useFoodDetail';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function FoodDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const foodId = searchParams.get('foodId');
  const meal = searchParams.get('meal') as MealType || 'breakfast';
  const date = searchParams.get('date') || getTodayDateKey();
  
  // Используем хук с логикой
  const {
    food,
    amount,
    setAmount,
    calculated,
    handleAddFood,
    handleToggleFavorite,
  } = useFoodDetail({ foodId, meal, date });

  // Loading состояние
  if (!food) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="font-black text-lg">Загрузка...</div>
        </div>
      </div>
    );
  }

  const amountNum = parseFloat(amount) || 0;

  return (
    <div className="h-full bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <FoodDetailHeader 
        name={food.name}
        brand={food.brand}
        isFavorite={food.isFavorite}
        onBack={() => navigate(-1)}
        onToggleFavorite={handleToggleFavorite}
      />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-28 space-y-4">
        {/* Размер порции */}
        <QuickPortionSelector
          amount={amount}
          unit={food.unit}
          onAmountChange={setAmount}
        />

        {/* Твоя порция */}
        {calculated && amountNum > 0 && (
          <YourPortionCard
            calories={calculated.calories}
            protein={calculated.protein}
            fat={calculated.fat}
            carbs={calculated.carbs}
            unit={food.unit}
          />
        )}

        {/* Подробный состав */}
        {amountNum > 0 && (
          <NutrientsAccordion
            nutrition={food.per100g}
            amount={amountNum}
            unit={food.unit}
          />
        )}
      </div>

      {/* Кнопка добавления */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-4 border-black">
        <Button
          onClick={handleAddFood}
          variant="primary"
          size="lg"
          className="w-full gap-2"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          Добавить в дневник
        </Button>
      </div>
    </div>
  );
}