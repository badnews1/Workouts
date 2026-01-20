/**
 * MeasurementHistoryCard - Карточка одного замера в истории
 * 
 * Отображает дату замера и все параметры с возможностью сворачивания
 */

import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/shared/lib';
import type { Measurement } from '@/entities/measurement';
import { MEASUREMENT_FIELDS } from '@/entities/measurement';
import { MeasurementRow } from './MeasurementRow';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconBox } from '@/shared/ui/icon-box';

interface MeasurementHistoryCardProps {
  measurement: Measurement;
  previousMeasurement?: Measurement;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (measurement: Measurement) => void;
  onDelete: (id: string) => void;
}

export function MeasurementHistoryCard({
  measurement,
  previousMeasurement,
  isExpanded,
  onToggle,
  onEdit,
  onDelete,
}: MeasurementHistoryCardProps) {
  return (
    <Card className="bg-white">
      {/* Заголовок записи */}
      <div className="flex items-center">
        <Button
          onClick={onToggle}
          variant="ghost"
          className="flex-1 p-4 h-auto justify-between"
          shadow={false}
        >
          <div className="flex items-center gap-3">
            <IconBox size="sm">
              <Calendar className="w-5 h-5" strokeWidth={3} />
            </IconBox>
            <div className="text-left">
              <div className="text-sm font-black">{formatDate(measurement.date)}</div>
              <div className="text-xs font-bold text-gray-600">
                Вес: {measurement.weight} кг
              </div>
            </div>
          </div>
          <div className="text-2xl font-black text-gray-300">
            {isExpanded ? '−' : '+'}
          </div>
        </Button>

        {/* Кнопки управления */}
        <div className="flex gap-1 pr-2">
          <Button
            onClick={() => onEdit(measurement)}
            variant="ghost"
            size="icon-sm"
            shadow={false}
            className="h-9 w-9"
          >
            <Pencil className="w-4 h-4" strokeWidth={3} />
          </Button>
          <Button
            onClick={() => onDelete(measurement.id)}
            variant="ghost"
            size="icon-sm"
            shadow={false}
            style={{ color: 'var(--brand-red)' }}
            className="h-9 w-9"
          >
            <Trash2 className="w-4 h-4" strokeWidth={3} />
          </Button>
        </div>
      </div>

      {/* Развернутая информация */}
      {isExpanded && (
        <div className="border-t-4 border-black p-4 bg-gray-50">
          {MEASUREMENT_FIELDS.map((field) => (
            <MeasurementRow
              key={field.type}
              label={field.label}
              value={measurement[field.type]}
              unit={field.unit}
              previous={previousMeasurement?.[field.type]}
            />
          ))}
        </div>
      )}
    </Card>
  );
}