import { Level } from '../../../entities/level';
import { LevelCard } from './LevelCard';

interface LevelsListProps {
  levels: Level[];
  color: string;
  onLevelClick: (levelId: number) => void;
}

export function LevelsList({ levels, color, onLevelClick }: LevelsListProps) {
  return (
    <div className="pb-24">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-1">
        Все уровни
      </h2>
      <div className="space-y-3">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            color={color}
            onClick={() => onLevelClick(level.id)}
          />
        ))}
      </div>
    </div>
  );
}