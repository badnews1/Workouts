/**
 * MeasurementHistory - Виджет истории всех замеров
 * 
 * Отображает список всех замеров с возможностью разворачивания каждого
 */

import { useState } from 'react';
import type { Measurement } from '@/entities/measurement';
import { MeasurementHistoryCard } from './MeasurementHistoryCard';

interface MeasurementHistoryProps {
  measurements: Measurement[];
  onEdit: (measurement: Measurement) => void;
  onDelete: (id: string) => void;
}

export function MeasurementHistory({ 
  measurements,
  onEdit,
  onDelete,
}: MeasurementHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (measurements.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-xs font-black text-gray-500 uppercase tracking-wide mb-3 px-1">
        История замеров
      </h3>
      
      <div className="space-y-3">
        {measurements.map((measurement, index) => {
          const previousMeasurement = measurements[index + 1];
          const isExpanded = expandedId === measurement.id;

          return (
            <MeasurementHistoryCard
              key={measurement.id}
              measurement={measurement}
              previousMeasurement={previousMeasurement}
              isExpanded={isExpanded}
              onToggle={() => setExpandedId(isExpanded ? null : measurement.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}