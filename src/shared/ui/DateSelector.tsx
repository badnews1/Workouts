/**
 * DateSelector - Компонент выбора даты с навигацией
 * 
 * Отображает текущую дату и кнопки для переключения на предыдущий/следующий день
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateRelative } from '../lib';
import { Button } from '@/components/ui/button';

interface DateSelectorProps {
  selectedDate: Date;
  onChangeDate: (days: number) => void;
}

export function DateSelector({ selectedDate, onChangeDate }: DateSelectorProps) {
  return (
    <div
      className="bg-white border-4 border-black mb-6 flex items-center justify-between p-4"
      style={{ boxShadow: '4px 4px 0px var(--brand-black)' }}
    >
      <Button
        onClick={() => onChangeDate(-1)}
        variant="secondary"
        size="icon-sm"
        style={{ boxShadow: '2px 2px 0px var(--brand-black)' }}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={3} />
      </Button>

      <div className="text-center">
        <div className="text-lg font-black uppercase">{formatDateRelative(selectedDate)}</div>
        <div className="text-xs font-bold text-gray-600">
          {selectedDate.toLocaleDateString('ru-RU', {
            weekday: 'long',
          })}
        </div>
      </div>

      <Button
        onClick={() => onChangeDate(1)}
        variant="secondary"
        size="icon-sm"
        style={{ boxShadow: '2px 2px 0px var(--brand-black)' }}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={3} />
      </Button>
    </div>
  );
}