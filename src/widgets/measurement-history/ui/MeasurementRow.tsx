/**
 * MeasurementRow - Строка с отдельным параметром в истории замеров
 * 
 * Отображает параметр с изменением относительно предыдущего замера
 */

import { TrendingUp, TrendingDown } from 'lucide-react';

interface MeasurementRowProps {
  label: string;
  value: number;
  unit: string;
  previous?: number;
}

export function MeasurementRow({ label, value, unit, previous }: MeasurementRowProps) {
  const getDifference = (
    current: number, 
    previous: number | undefined
  ): { diff: number; isPositive: boolean } | null => {
    if (previous === undefined) return null;
    const diff = current - previous;
    return {
      diff: Math.abs(diff),
      isPositive: diff > 0,
    };
  };
  
  const difference = getDifference(value, previous);
  
  return (
    <div className="flex items-center justify-between py-2 border-b-2 border-gray-200 last:border-0">
      <span className="text-xs font-bold text-gray-600 uppercase">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-black">{value}</span>
        <span className="text-xs font-bold text-gray-500">{unit}</span>
        {difference && (
          <div 
            className="flex items-center gap-0.5 ml-1"
            style={{ color: difference.isPositive ? 'var(--brand-green)' : 'var(--brand-red)' }}
          >
            {difference.isPositive ? (
              <TrendingUp className="w-3 h-3" strokeWidth={3} />
            ) : (
              <TrendingDown className="w-3 h-3" strokeWidth={3} />
            )}
            <span className="text-xs font-black">{difference.diff.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}