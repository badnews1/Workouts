/**
 * CreateFoodPage - Страница создания нового продукта
 * 
 * Позволяет добавить новый продукт с КБЖУ в базу
 * 
 * Роут: /create-food?meal=breakfast&date=2024-01-17&name=Название
 */

import { useNavigate, useSearchParams } from 'react-router';
import { Header, getTodayDateKey } from '@/shared';
import type { MealType } from '@/entities/food';
import { 
  BasicInfoSection, 
  NutritionSection,
  VitaminsSection,
  MineralsSection,
  AdditionalDataSection,
  useCreateFoodForm 
} from '@/features/create-food';
import { Button } from '@/components/ui/button';

export function CreateFoodPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const meal = searchParams.get('meal') as MealType || 'breakfast';
  const date = searchParams.get('date') || getTodayDateKey();
  const nameFromSearch = searchParams.get('name') || '';
  
  // Хук формы с логикой
  const {
    formData,
    isCategoryExpanded,
    setIsCategoryExpanded,
    updateField,
    handleSubmit,
  } = useCreateFoodForm({
    initialName: nameFromSearch,
    onSuccess: () => navigate(`/add-food?meal=${meal}&date=${date}`),
  });

  return (
    <div className="h-full bg-white overflow-y-auto pb-24">
      <Header 
        title="Новый продукт" 
        onBack={() => navigate(`/add-food?meal=${meal}&date=${date}`)} 
      />
      
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Основная информация */}
          <BasicInfoSection
            formData={formData}
            isCategoryExpanded={isCategoryExpanded}
            onCategoryExpandToggle={() => setIsCategoryExpanded(!isCategoryExpanded)}
            onFieldChange={updateField}
          />

          {/* КБЖУ */}
          <NutritionSection
            formData={formData}
            onFieldChange={updateField}
          />

          {/* Дополнительные данные */}
          <AdditionalDataSection
            formData={formData}
            onFieldChange={updateField}
          />

          {/* Витамины */}
          <VitaminsSection
            formData={formData}
            onFieldChange={updateField}
          />

          {/* Минералы */}
          <MineralsSection
            formData={formData}
            onFieldChange={updateField}
          />
        </form>
      </div>

      {/* Фиксированная кнопка внизу */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-4 border-black">
        <Button
          onClick={handleSubmit}
          variant="primary"
          className="w-full uppercase"
          size="default"
        >
          Сохранить продукт
        </Button>
      </div>
    </div>
  );
}