import { History, Clock } from 'lucide-react';
import { formatDateRelative, formatTime } from '@/shared';
import type { WorkoutHistoryEntry } from '@/entities/workout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IntroWorkoutHistoryProps {
  history: WorkoutHistoryEntry[];
}

export function IntroWorkoutHistory({ history }: IntroWorkoutHistoryProps) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Заголовок */}
      <div className="px-4 mb-4 mt-8">
        <div className="flex items-center justify-between">
          <Badge
            size="md"
            style={{
              backgroundColor: 'var(--brand-black)',
              color: 'var(--brand-yellow)',
            }}
          >
            ИСТОРИЯ ТРЕНИРОВОК
          </Badge>
          <p className="text-xs font-black text-gray-500">
            {history.length} завершено
          </p>
        </div>
      </div>

      {/* Список выполненных тренировок */}
      <div className="px-4 space-y-4 pb-8">
        {history.map((entry) => (
          <Card
            key={entry.workoutId}
            size="lg"
            className="p-4"
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 flex items-center justify-center flex-shrink-0 border-[3px] border-black"
                style={{
                  backgroundColor: 'var(--brand-green)',
                }}
              >
                <History className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black uppercase mb-2 text-black">
                  {entry.periodName} - {entry.workoutName}
                </h3>
                <div className="space-y-1">
                  {entry.completedDates.map((date, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-800">
                        {formatDateRelative(new Date(date))}
                      </p>
                      {entry.totalTime !== undefined && (
                        <Badge
                          size="sm"
                          style={{
                            backgroundColor: 'var(--brand-yellow)',
                            color: 'var(--brand-black)',
                          }}
                          className="gap-1"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTime(entry.totalTime)}</span>
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}