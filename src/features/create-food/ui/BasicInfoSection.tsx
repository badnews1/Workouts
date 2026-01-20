/**
 * BasicInfoSection - Секция основной информации о продукте
 * 
 * Содержит поля: название, бренд, категория, единица измерения
 */

import { FOOD_CATEGORIES, MEASUREMENT_UNITS } from '../config';
import type { FoodFormData } from '../lib/validateFoodForm';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BasicInfoSectionProps {
  formData: FoodFormData;
  isCategoryExpanded: boolean;
  onCategoryExpandToggle: () => void;
  onFieldChange: <K extends keyof FoodFormData>(field: K, value: FoodFormData[K]) => void;
}

export function BasicInfoSection({
  formData,
  isCategoryExpanded,
  onCategoryExpandToggle,
  onFieldChange,
}: BasicInfoSectionProps) {
  return (
    <Card className="p-4">
      <h3 className="text-xs font-black uppercase text-gray-500 mb-4">
        Основная информация
      </h3>
      
      <div className="space-y-4">
        {/* Название */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Название *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            size="sm"
            fontWeight="bold"
            fontSize="md"
            shadow={false}
            placeholder="Например: Яблоко"
            required
          />
        </div>

        {/* Марка */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Марка / Бренд
          </label>
          <Input
            type="text"
            value={formData.brand}
            onChange={(e) => onFieldChange('brand', e.target.value)}
            size="sm"
            fontWeight="bold"
            fontSize="md"
            shadow={false}
            placeholder="Например: Простоквашино"
          />
        </div>

        {/* Категория */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Категория *
          </label>
          <Button
            type="button"
            variant="outline"
            shadow={false}
            onClick={onCategoryExpandToggle}
            className="w-full justify-start"
          >
            {formData.category || 'Выбрать категорию'}
          </Button>
          
          {/* Раскрывающийся блок с категориями */}
          {isCategoryExpanded && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {FOOD_CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  type="button"
                  variant={formData.category === cat ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    onFieldChange('category', cat);
                    onCategoryExpandToggle();
                  }}
                  style={{
                    boxShadow: formData.category === cat ? '3px 3px 0px #000' : '2px 2px 0px #000',
                  }}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Единица измерения */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Единица измерения *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MEASUREMENT_UNITS.map(unit => (
              <Button
                key={unit}
                type="button"
                variant={formData.unit === unit ? 'secondary' : 'outline'}
                onClick={() => onFieldChange('unit', unit)}
                className="py-3"
                style={{ boxShadow: '2px 2px 0px #000' }}
              >
                {unit}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}