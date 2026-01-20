/**
 * NutritionSection - Секция пищевой ценности (КБЖУ)
 * 
 * Содержит поля для ввода калорий, белков, жиров и углеводов
 */

import type { FoodFormData } from '../lib/validateFoodForm';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface NutritionSectionProps {
  formData: FoodFormData;
  onFieldChange: <K extends keyof FoodFormData>(field: K, value: FoodFormData[K]) => void;
}

export function NutritionSection({ formData, onFieldChange }: NutritionSectionProps) {
  return (
    <Card className="p-4">
      <h3 className="font-black text-sm uppercase mb-1">
        Пищевая ценность
      </h3>
      <p className="text-xs font-bold text-gray-600 mb-4">
        Укажите на 100{formData.unit}
      </p>
      
      <div className="space-y-3">
        {/* Калории */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Калории *
          </label>
          <Input
            type="number"
            inputMode="decimal"
            step="0.1"
            value={formData.calories}
            onChange={(e) => onFieldChange('calories', e.target.value)}
            size="sm"
            fontSize="lg"
            fontWeight="black"
            rightText="ккал"
            shadow={false}
            placeholder="250"
            required
          />
        </div>

        {/* БЖУ в 3 колонки */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
              Белки *
            </label>
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={formData.protein}
              onChange={(e) => onFieldChange('protein', e.target.value)}
              size="sm"
              fontSize="lg"
              fontWeight="black"
              rightText="г"
              shadow={false}
              placeholder="20"
              required
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
              Жиры *
            </label>
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={formData.fat}
              onChange={(e) => onFieldChange('fat', e.target.value)}
              size="sm"
              fontSize="lg"
              fontWeight="black"
              rightText="г"
              shadow={false}
              placeholder="10"
              required
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
              Углеводы *
            </label>
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={formData.carbs}
              onChange={(e) => onFieldChange('carbs', e.target.value)}
              size="sm"
              fontSize="lg"
              fontWeight="black"
              rightText="г"
              shadow={false}
              placeholder="30"
              required
            />
          </div>
        </div>
      </div>
    </Card>
  );
}