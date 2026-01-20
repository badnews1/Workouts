/**
 * ExerciseTimerCard - Карточка таймера упражнения
 */

import { formatTime } from '@/shared/lib/utils/time';
import { Card } from '@/components/ui/card';

interface ExerciseTimerCardProps {
  exerciseTimer: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export function ExerciseTimerCard({ 
  exerciseTimer, 
  isRunning, 
  onStart, 
  onPause, 
  onResume,
  onReset 
}: ExerciseTimerCardProps) {
  const isIdle = !isRunning && exerciseTimer === 0;
  const isPaused = !isRunning && exerciseTimer > 0;

  return (
    <Card 
      size="xl"
      className="p-6 mb-6"
      backgroundColor="var(--brand-yellow)"
    >
      <div className="text-center">
        <p className="text-xs font-black uppercase mb-3 text-black">
          Таймер
        </p>
        <div className="text-6xl font-black mb-4 tracking-tight text-black">
          {formatTime(exerciseTimer)}
        </div>
        <div className="flex gap-2 justify-center">
          {isIdle && (
            <button
              onClick={onStart}
              className="px-8 py-2.5 font-black text-sm transition-colors bg-white border-[3px] border-black text-black"
              style={{
                boxShadow: '4px 4px 0px var(--brand-black)',
              }}
            >
              СТАРТ
            </button>
          )}
          {isRunning && (
            <>
              <button
                onClick={onPause}
                className="px-8 py-2.5 font-black text-sm transition-colors bg-white border-[3px] border-black text-black"
                style={{
                  boxShadow: '4px 4px 0px var(--brand-black)',
                }}
              >
                ПАУЗА
              </button>
              <button
                onClick={onReset}
                className="px-7 py-2.5 font-black text-sm transition-colors border-[3px] border-black text-black bg-gray-300"
                style={{
                  boxShadow: '4px 4px 0px var(--brand-black)',
                }}
              >
                СБРОС
              </button>
            </>
          )}
          {isPaused && (
            <>
              <button
                onClick={onResume}
                className="px-8 py-2.5 font-black text-sm transition-colors bg-white border-[3px] border-black text-black"
                style={{
                  boxShadow: '4px 4px 0px var(--brand-black)',
                }}
              >
                ПРОДОЛЖИТЬ
              </button>
              <button
                onClick={onReset}
                className="px-7 py-2.5 font-black text-sm transition-colors border-[3px] border-black text-black bg-gray-300"
                style={{
                  boxShadow: '4px 4px 0px var(--brand-black)',
                }}
              >
                СБРОС
              </button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}