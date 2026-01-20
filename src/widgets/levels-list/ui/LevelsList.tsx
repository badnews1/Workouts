import { Level } from '@/entities/level';
import { LevelCard } from './LevelCard';

interface LevelsListProps {
  levels: Level[];
  color: string;
  onLevelClick: (levelId: number) => void;
}

export function LevelsList({ levels, color, onLevelClick }: LevelsListProps) {
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
            Все уровни
          </p>
        </div>
        <p className="text-xs font-black text-gray-500">
          8 уровней
        </p>
      </div>
      <div className="space-y-4">
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