/**
 * MeasurementCard - Карточка отдельного параметра замера
 * 
 * Отображает один параметр с цветовым индикатором изменения
 */

import { Card } from '@/components/ui/card';

interface MeasurementCardProps {
  label: string;
  value: number;
  unit: string;
  backgroundColor: string;
  textColor: string;
}

export function MeasurementCard({
  label,
  value,
  unit,
  backgroundColor,
  textColor,
}: MeasurementCardProps) {
  return (
    <Card size="sm" className="p-3" style={{ backgroundColor }}>
      <div className="mb-1">
        <span className="text-xs font-bold uppercase" style={{ color: textColor }}>
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black" style={{ color: textColor }}>
          {value}
        </span>
        <span 
          className="text-xs font-bold" 
          style={{ color: textColor === 'var(--brand-white)' ? 'var(--brand-white)' : '#374151' }}
        >
          {unit}
        </span>
      </div>
    </Card>
  );
}