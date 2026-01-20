/**
 * DateField - Поле выбора даты для замера
 * 
 * Компонент для выбора даты замера
 */

import { getTodayDateKey } from '@/shared/lib/utils';
import { Input } from '@/components/ui/input';

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateField({ value, onChange }: DateFieldProps) {
  return (
    <div className="mb-4">
      <label className="text-xs font-black uppercase text-gray-700 mb-2 block">
        Дата замера
      </label>
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fontSize="base"
        fontWeight="black"
        max={getTodayDateKey()}
        shadow={false}
      />
    </div>
  );
}
