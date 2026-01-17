interface ProgressHeaderProps {
  programName: string;
  programIcon: string;
  programDescription?: string;
  currentLevel: number;
  totalLevels: number;
  totalWorkouts: number;
  completedWorkouts: number;
  color: string;
}

export function ProgressHeader({ 
  programName, 
  programDescription,
  currentLevel, 
  totalLevels, 
  totalWorkouts,
  completedWorkouts,
  color 
}: ProgressHeaderProps) {
  const progressPercentage = totalWorkouts > 0 
    ? Math.round((completedWorkouts / totalWorkouts) * 100) 
    : 0;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div 
      className="rounded-3xl p-6 mb-6 text-white shadow-lg"
      style={{ backgroundColor: color }}
    >
      {/* Верхняя часть - название и процент */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{programName}</h1>
          {programDescription && (
            <p className="text-sm opacity-90">{programDescription}</p>
          )}
        </div>
        <div className="text-5xl font-bold ml-4">
          {progressPercentage}%
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className="mb-4">
        <div 
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: hexToRgba('#ffffff', 0.3) }}
        >
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Нижняя часть - уровень и тренировки */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span className="font-medium">
            Уровень {currentLevel} из {totalLevels}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>🔥</span>
          <span className="font-medium">
            Тренировок: {completedWorkouts}
          </span>
        </div>
      </div>
    </div>
  );
}