import { Period } from '../../../entities/workout';
import { PeriodCard } from './PeriodCard';

interface PeriodsListProps {
  periods: Period[];
  color: string;
  onPeriodClick?: (periodId: string) => void;
}

export function PeriodsList({ periods, color, onPeriodClick }: PeriodsListProps) {
  return (
    <div className="px-4 pb-6">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Периоды тренировок
      </h2>
      <div className="space-y-3">
        {periods.map((period) => (
          <PeriodCard 
            key={period.id} 
            period={period} 
            color={color}
            onClick={() => onPeriodClick?.(period.id)}
          />
        ))}
      </div>
    </div>
  );
}