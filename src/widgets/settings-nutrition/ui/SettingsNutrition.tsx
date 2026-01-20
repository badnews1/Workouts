/**
 * SettingsNutrition - Секция настроек питания
 * 
 * Форма для установки целей по КБЖУ
 */

import { Apple } from 'lucide-react';
import { SettingsSection } from '@/shared';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconBox } from '@/shared/ui/icon-box';

interface NutritionGoals {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}

interface SettingsNutritionProps {
  onNutritionSettingsClick: () => void;
}

export function SettingsNutrition({ onNutritionSettingsClick }: SettingsNutritionProps) {
  return (
    <SettingsSection title="Питание">
      <Card className="p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <IconBox size="md" backgroundColor="var(--brand-green)">
            <Apple className="w-6 h-6 text-white" strokeWidth={3} />
          </IconBox>
          <div>
            <h3 className="text-sm font-black uppercase">Цели по КБЖУ</h3>
            <p className="text-xs font-bold text-gray-600">Калории, белки, жиры, углеводы</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {/* Калории */}
          <div>
            <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
              Калории
            </label>
            <div className="relative">
              <Input
                type="number"
                inputMode="decimal"
                className="text-lg font-black pr-16"
                size="sm"
                placeholder="2000"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                ккал
              </div>
            </div>
          </div>
          
          {/* Белки, Жиры, Углеводы в одну строку */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
                Белки
              </label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  className="text-lg font-black px-2 pr-8"
                  size="sm"
                  placeholder="150"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                  г
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
                Жиры
              </label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  className="text-lg font-black px-2 pr-8"
                  size="sm"
                  placeholder="70"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                  г
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
                Углеводы
              </label>
              <div className="relative">
                <Input
                  type="number"
                  inputMode="decimal"
                  className="text-lg font-black px-2 pr-8"
                  size="sm"
                  placeholder="200"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                  г
                </div>
              </div>
            </div>
          </div>
          
          {/* Кнопка сохранить */}
          <Button
            onClick={onNutritionSettingsClick}
            variant="primary"
            className="w-full"
            size="sm"
          >
            Сохранить цели
          </Button>
        </div>
      </Card>
    </SettingsSection>
  );
}