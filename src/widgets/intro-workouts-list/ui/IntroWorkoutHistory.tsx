import { Calendar, Clock } from 'lucide-react';

interface WorkoutHistoryEntry {
  workoutId: string;
  workoutName: string;
  periodName: string;
  completedDates: string[]; // ISO даты
  totalTime?: number;
}

interface IntroWorkoutHistoryProps {
  history: WorkoutHistoryEntry[];
}

export function IntroWorkoutHistory({ history }: IntroWorkoutHistoryProps) {
  if (!history || history.length === 0) {
    return null;
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {/* Заголовок */}
      <div className="px-4 mb-4 mt-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          ИСТОРИЯ ТРЕНИРОВОК
        </h2>
      </div>

      {/* Список выполненных тренировок */}
      <div className="px-4 space-y-3 pb-8">
        {history.map((entry) => (
          <div
            key={entry.workoutId}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {entry.periodName} - {entry.workoutName}
                </h3>
                <div className="space-y-1">
                  {entry.completedDates.map((date, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">
                        {formatDate(date)}
                      </p>
                      {entry.totalTime !== undefined && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTime(entry.totalTime)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}