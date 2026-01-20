/**
 * VitaminsSection - Секция ввода витаминов
 * 
 * Позволяет указать содержание витаминов на 100г продукта
 */

import { Input } from '@/components/ui/input';
import { VITAMINS } from '@/entities/food';
import type { FoodFormData } from '../lib/validateFoodForm';

interface VitaminsSectionProps {
  formData: FoodFormData;
  onFieldChange: <K extends keyof FoodFormData>(field: K, value: FoodFormData[K]) => void;
}

export function VitaminsSection({ formData, onFieldChange }: VitaminsSectionProps) {
  return (
    <div className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-black text-sm uppercase mb-4">
        Витамины на 100 г
      </h3>
      
      <div className="space-y-3">
        {VITAMINS.map((vitamin) => (
          <div key={vitamin.key} className="flex items-center gap-3">
            <span className="font-bold text-sm min-w-[140px]">{vitamin.label}</span>
            <Input
              placeholder="0"
              value={formData[vitamin.key] || ''}
              onChange={(e) => onFieldChange(vitamin.key, e.target.value)}
              type="number"
              step={vitamin.step}
              rightText={vitamin.unit}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}