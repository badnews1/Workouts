import { ChevronRight, Lock, Check } from 'lucide-react';
import { Level } from '@/entities/level';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface LevelCardProps {
  level: Level;
  color: string;
  onClick: () => void;
}

export function LevelCard({ level, color, onClick }: LevelCardProps) {
  // Определяем state для Card
  const getCardState = (): 'completed' | 'current' | 'locked' | 'default' => {
    if (level.isCompleted) return 'completed';
    if (level.isCurrent) return 'current';
    if (level.isLocked) return 'locked';
    return 'default';
  };

  const getNumberBgColor = () => {
    if (level.isCompleted) return 'var(--brand-black)';
    if (level.isCurrent) return 'var(--brand-black)';
    if (level.isLocked) return 'var(--brand-gray)';
    return 'var(--brand-black)';
  };

  const getTextColor = () => {
    if (level.isLocked) return 'text-gray-400';
    if (level.isCompleted || level.isCurrent) return 'text-black';
    return 'text-gray-900';
  };

  return (
    <Card
      as="button"
      onClick={onClick}
      disabled={level.isLocked}
      state={getCardState()}
      size="lg"
      className={`w-full text-left ${level.isLocked ? 'cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Левая иконка с номером */}
        <div 
          className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-[3px] border-black"
          style={{ 
            backgroundColor: getNumberBgColor(),
          }}
        >
          <span 
            className={`text-lg font-black ${
              (level.isCompleted || level.isCurrent) && !level.isLocked ? 'text-white' : 'text-gray-400'
            }`}
          >
            {level.id}
          </span>
        </div>

        {/* Информация о уровне */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-black mb-1 uppercase ${getTextColor()}`}>
            {level.name}
          </h3>
          <p className={`text-xs font-bold ${level.isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
            {level.description}
          </p>
        </div>

        {/* Правая часть - статус */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {level.isCompleted ? (
            <div 
              className="w-10 h-10 flex items-center justify-center border-[3px] border-black"
              style={{
                backgroundColor: 'var(--brand-black)',
              }}
            >
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
          ) : level.isLocked ? (
            <div 
              className="w-10 h-10 flex items-center justify-center border-[3px] border-black"
              style={{
                backgroundColor: 'var(--brand-gray)',
              }}
            >
              <Lock className="w-5 h-5 text-gray-400" strokeWidth={2.5} />
            </div>
          ) : level.isCurrent && level.progress !== undefined ? (
            <Badge 
              size="md"
              className="bg-black text-white"
            >
              {level.progress}%
            </Badge>
          ) : (
            <ChevronRight className="w-6 h-6 text-black" strokeWidth={3} />
          )}
        </div>
      </div>
    </Card>
  );
}