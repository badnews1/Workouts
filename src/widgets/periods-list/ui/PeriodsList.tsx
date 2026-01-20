import { Period } from '@/entities/workout';
import { PeriodCard } from './PeriodCard';

interface PeriodsListProps {
  periods: Period[];
  color: string;
  onPeriodClick?: (periodId: string) => void;
}

export function PeriodsList({ periods, color, onPeriodClick }: PeriodsListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div 
          className="px-2.5 py-1.5"
          style={{
            backgroundColor: 'var(--brand-black)',
            border: '3px solid var(--brand-black)',
          }}
        >
          <p className="text-xs font-black uppercase tracking-tight" style={{ color: 'var(--brand-yellow)' }}>
            Периоды тренировок
          </p>
        </div>
        <p className="text-xs font-black text-gray-500">
          {periods.length} периодов
        </p>
      </div>
      <div className="space-y-4">
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