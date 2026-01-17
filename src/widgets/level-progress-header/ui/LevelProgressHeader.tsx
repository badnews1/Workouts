import { Calendar, Flame } from 'lucide-react';

interface LevelProgressHeaderProps {
  currentPeriod: number;
  totalPeriods: number;
  progress: number;
  currentDay?: number;
  completedWorkouts?: number; // общее количество завершенных тренировок
  totalWorkouts?: number; // общее количество тренировок в уровне
  color: string;
  isIntroPeriod?: boolean; // Флаг для вводного периода
}

export function LevelProgressHeader({
  currentPeriod,
  totalPeriods,
  progress,
  currentDay,
  completedWorkouts,
  totalWorkouts,
  color,
  isIntroPeriod = false,
}: LevelProgressHeaderProps) {
  return (
    <div 
      className="mx-4 mt-6 mb-6 rounded-3xl p-6 text-white relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` 
      }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/90 text-sm mb-1">Прогресс уровня</p>
            <h2 className="text-2xl font-bold">
              {isIntroPeriod ? 'Подготовка' : `Период ${currentPeriod} из ${totalPeriods}`}
            </h2>
          </div>
          <div className="text-5xl font-bold">{progress}%</div>
        </div>

        {/* Прогресс-бар */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Иконки статистики */}
        <div className="flex items-center gap-4">
          {currentDay !== undefined && (
            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
              <div className="w-6 h-6 bg-white/30 rounded flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">День {currentDay}</span>
            </div>
          )}
          {completedWorkouts !== undefined && totalWorkouts !== undefined && (
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-medium">{completedWorkouts} из {totalWorkouts} тренировок</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}