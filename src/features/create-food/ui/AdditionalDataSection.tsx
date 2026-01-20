/**
 * AdditionalDataSection - Секция дополнительных данных
 * 
 * Позволяет указать дополнительную пищевую информацию на 100г продукта
 */

import { Input } from '@/components/ui/input';
import { ADDITIONAL_DATA } from '@/entities/food';
import type { FoodFormData } from '../lib/validateFoodForm';

interface AdditionalDataSectionProps {
  formData: FoodFormData;
  onFieldChange: <K extends keyof FoodFormData>(field: K, value: FoodFormData[K]) => void;
}

export function AdditionalDataSection({ formData, onFieldChange }: AdditionalDataSectionProps) {
  return (
    <div className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-black text-sm uppercase mb-4">
        Дополнительные данные на 100 г
      </h3>
      
      <div className="space-y-3">
        {ADDITIONAL_DATA.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <span className="font-bold text-sm min-w-[140px]">{item.label}</span>
            <Input
              placeholder="0"
              value={formData[item.key] || ''}
              onChange={(e) => onFieldChange(item.key, e.target.value)}
              type="number"
              step={item.step}
              rightText={item.unit}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}