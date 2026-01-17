interface IntroStatusHeaderProps {
  isCompleted: boolean;
  progress: number;
  color: string;
}

export function IntroStatusHeader({ isCompleted, progress, color }: IntroStatusHeaderProps) {
  return (
    <div 
      className="mx-4 mt-6 mb-6 rounded-3xl p-6 text-white relative overflow-hidden"
      style={{ 
        backgroundColor: isCompleted ? '#10b981' : color
      }}
    >
      <div className="relative z-10">
        <p className="text-white/80 text-sm mb-1">Статус</p>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {isCompleted ? 'Завершено ✓' : 'В процессе'}
          </h2>
          <div className="text-5xl font-bold">{progress}%</div>
        </div>

        {/* Прогресс-бар */}
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
