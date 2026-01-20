/**
 * MineralsSection - Секция ввода минералов
 * 
 * Позволяет указать содержание минералов на 100г продукта
 */

import { Input } from '@/components/ui/input';
import { MINERALS } from '@/entities/food';
import type { FoodFormData } from '../lib/validateFoodForm';

interface MineralsSectionProps {
  formData: FoodFormData;
  onFieldChange: <K extends keyof FoodFormData>(field: K, value: FoodFormData[K]) => void;
}

export function MineralsSection({ formData, onFieldChange }: MineralsSectionProps) {
  return (
    <div className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="font-black text-sm uppercase mb-4">
        Минералы на 100 г
      </h3>
      
      <div className="space-y-3">
        {MINERALS.map((mineral) => (
          <div key={mineral.key} className="flex items-center gap-3">
            <span className="font-bold text-sm min-w-[140px]">{mineral.label}</span>
            <Input
              placeholder="0"
              value={formData[mineral.key] || ''}
              onChange={(e) => onFieldChange(mineral.key, e.target.value)}
              type="number"
              step={mineral.step}
              rightText={mineral.unit}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}