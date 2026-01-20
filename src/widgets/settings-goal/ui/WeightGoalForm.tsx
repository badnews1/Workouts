/**
 * WeightGoalForm - Форма целевого веса
 * 
 * Форма для установки целевого веса и даты достижения
 */

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WeightGoalFormProps {
  targetWeight: string;
  targetDate: string;
  onWeightChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSave: () => void;
}

export function WeightGoalForm({
  targetWeight,
  targetDate,
  onWeightChange,
  onDateChange,
  onSave,
}: WeightGoalFormProps) {
  return (
    <Card className="p-4 flex flex-col">
      <h3 className="text-sm font-black uppercase mb-3">Целевой вес</h3>
      
      <div className="space-y-3">
        {/* Поле для веса */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Вес
          </label>
          <div className="relative">
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={targetWeight}
              onChange={(e) => onWeightChange(e.target.value)}
              className="text-xl font-black pr-12"
              placeholder="70"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
              кг
            </div>
          </div>
        </div>
        
        {/* Поле для даты */}
        <div>
          <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
            Дата (опционально)
          </label>
          <Input
            type="date"
            value={targetDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="font-black"
            size="sm"
          />
        </div>
        
        {/* Кнопка сохранить */}
        <Button
          onClick={onSave}
          variant="secondary"
          className="w-full"
          size="sm"
        >
          Сохранить цель
        </Button>
      </div>
    </Card>
  );
}