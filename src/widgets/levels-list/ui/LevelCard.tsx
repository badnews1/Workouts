import { ChevronRight, Lock } from 'lucide-react';
import { Level } from '../../../entities/level';
import { CircularProgress } from '../../../shared/ui/circular-progress';

interface LevelCardProps {
  level: Level;
  color: string;
  onClick: () => void;
}

export function LevelCard({ level, color, onClick }: LevelCardProps) {
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getBorderColor = () => {
    if (level.isCurrent) return color;
    if (level.isCompleted) return '#10b981'; // green
    return '#e5e7eb'; // gray
  };

  const getBackgroundColor = () => {
    if (level.isCurrent) return hexToRgba(color, 0.05);
    if (level.isCompleted) return hexToRgba('#10b981', 0.05);
    if (level.isLocked) return '#f9fafb';
    return '#ffffff';
  };

  const getNumberBgColor = () => {
    if (level.isCompleted) return '#10b981';
    if (level.isCurrent) return color;
    if (level.isLocked) return '#e5e7eb';
    return '#e5e7eb';
  };

  const getTextColor = () => {
    if (level.isLocked) return 'text-gray-400';
    return 'text-gray-900';
  };

  return (
    <button
      onClick={onClick}
      disabled={level.isLocked}
      className={`w-full text-left rounded-2xl transition-all duration-300 ${
        level.isLocked ? 'cursor-not-allowed' : 'hover:shadow-md'
      }`}
      style={{
        border: `2px solid ${getBorderColor()}`,
        backgroundColor: getBackgroundColor(),
      }}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Левая иконка с номером */}
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: getNumberBgColor(),
          }}
        >
          <span 
            className={`text-xl font-bold ${
              level.isCompleted || level.isCurrent ? 'text-white' : 'text-gray-500'
            }`}
          >
            {level.id}
          </span>
        </div>

        {/* Информация о уровне */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-semibold mb-1 ${getTextColor()}`}>
            {level.name}
          </h3>
          <p className={`text-sm ${level.isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
            {level.description}
          </p>
        </div>

        {/* Правая часть - прогресс или статус */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Круговая диаграмма или иконка */}
          {level.isCurrent && level.progress !== undefined ? (
            <CircularProgress 
              progress={level.progress} 
              color={color}
              size={52}
              strokeWidth={5}
            />
          ) : level.isCompleted ? (
            <CircularProgress 
              progress={100} 
              color="#10b981"
              size={52}
              strokeWidth={5}
            />
          ) : level.isLocked ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}