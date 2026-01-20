/**
 * CurrentMeasurements - Виджет текущих параметров тела
 * 
 * Отображает все текущие замеры в виде сетки цветных карточек
 */

import { Calendar } from 'lucide-react';
import { formatDate } from '@/shared/lib';
import type { Measurement } from '@/entities/measurement';
import { MEASUREMENT_FIELDS } from '@/entities/measurement';
import type { Goal } from '@/shared';
import { MeasurementCard } from './MeasurementCard';
import { Card } from '@/components/ui/card';

interface CurrentMeasurementsProps {
  currentMeasurement: Measurement;
  previousMeasurement?: Measurement;
  goal: Goal;
  getMeasurementColor: (
    type: string, 
    current: number, 
    previous: number | undefined, 
    goal: Goal
  ) => { bg: string; textColor: string };
}

export function CurrentMeasurements({
  currentMeasurement,
  previousMeasurement,
  goal,
  getMeasurementColor,
}: CurrentMeasurementsProps) {
  return (
    <Card className="p-4 mb-6">
      <h3 className="text-xs font-black text-gray-500 uppercase tracking-wide mb-3">
        Текущие параметры
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {MEASUREMENT_FIELDS.map((field) => {
          const colors = getMeasurementColor(
            field.type, 
            currentMeasurement[field.type], 
            previousMeasurement?.[field.type], 
            goal
          );
          
          return (
            <MeasurementCard
              key={field.type}
              label={field.label}
              value={currentMeasurement[field.type]}
              unit={field.unit}
              backgroundColor={colors.bg}
              textColor={colors.textColor}
            />
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t-2 border-gray-200">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <Calendar className="w-3 h-3" strokeWidth={3} />
          <span>Обновлено: {formatDate(currentMeasurement.date)}</span>
        </div>
      </div>
    </Card>
  );
}