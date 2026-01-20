/**
 * ExerciseCard - Карточка упражнения в тренировке
 */

import { CheckCircle2, Lock, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { useState } from 'react';
import type { Exercise } from '@/entities/workout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResultInput } from './ResultInput';
import { BandSelector } from './BandSelector';
import { formatDuration } from '@/shared';

interface ExerciseCardProps {
  exercise: Exercise;
  originalIndex: number;
  isCompleted: boolean;
  isLocked: boolean;
  isActive: boolean;
  results: Record<string, number>;
  bandSelections: Record<string, string>;
  confirmedResults: Set<string>;
  onComplete: (index: number) => void;
  onResultChange: (exerciseId: string, value: number) => void;
  onConfirmResult: (exerciseId: string) => void;
  onBandChange: (exerciseId: string, bandValue: string) => void;
}

export function ExerciseCard({
  exercise,
  originalIndex,
  isCompleted,
  isLocked,
  isActive,
  results,
  bandSelections,
  confirmedResults,
  onComplete,
  onResultChange,
  onConfirmResult,
  onBandChange,
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-white border-4 border-black overflow-hidden transition-all ${
        isCompleted ? 'opacity-50' : ''
      } ${
        isLocked ? 'opacity-60' : ''
      }`}
      style={{
        boxShadow: '6px 6px 0px 0px var(--brand-black)'
      }}
    >
      {/* Шапка упражнения - для всех типов упражнений */}
      <div className={`${isActive ? 'bg-[--brand-yellow]' : 'bg-white'} border-b-4 border-black px-4 py-3 flex items-center gap-3`} style={{ backgroundColor: isActive ? 'var(--brand-yellow)' : 'var(--brand-white)' }}>
        {/* Чекбокс/замочек выполнения в шапке */}
        <Button
          onClick={() => !isLocked && onComplete(originalIndex)}
          disabled={isLocked}
          variant="outline"
          size="icon-sm"
          className={
            isLocked
              ? 'bg-gray-300 cursor-not-allowed'
              : isCompleted
              ? ''
              : 'bg-white'
          }
          style={{
            backgroundColor: isCompleted && !isLocked ? 'var(--brand-green)' : undefined,
            boxShadow: '3px 3px 0px 0px var(--brand-black)'
          }}
        >
          {isLocked ? (
            <Lock className="w-5 h-5 text-gray-600" strokeWidth={3} />
          ) : isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={4} />
          ) : null}
        </Button>
        
        <span className="font-black text-black text-lg uppercase tracking-tight flex-1">
          {exercise.type === 'circuit' ? 'Круговая работа' : exercise.name}
        </span>

        {/* Бейджик со временем работы */}
        {exercise.duration && (
          <Badge
            size="sm"
            className="flex-shrink-0 bg-white text-black gap-1"
          >
            <Clock className="w-4 h-4" strokeWidth={2.5} />
            <span>
              {formatDuration(exercise.duration)}
            </span>
          </Badge>
        )}
      </div>

      {/* Основной контент - показываем только если есть что показывать */}
      {((exercise.type !== 'circuit' && exercise.type !== 'combo' && exercise.description) || 
        ((exercise.type === 'circuit' || exercise.type === 'combo' || exercise.type === 'time') && exercise.exercises) ||
        (exercise.type === 'total' || exercise.type === 'reps' || exercise.type === 'static') && exercise.recordResult) && (
        <div>
          {/* Вложенные упражнения для circuit/combo/time */}
          {(exercise.type === 'circuit' || exercise.type === 'combo' || exercise.type === 'time') && exercise.exercises && (
            <div>
              {exercise.exercises.map((subExercise, subIndex) => (
                <div 
                  key={subExercise.id}
                  className={`border-4 border-t-0 border-r-0 border-l-0 ${subIndex === exercise.exercises!.length - 1 ? 'border-b-0' : ''} border-black bg-white overflow-hidden`}
                >
                  <div className="flex">
                    {/* Черная панель с номером для вложенного упражнения - на всю высоту */}
                    <div className="bg-black border-r-4 border-black w-16 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-black text-3xl">{subIndex + 1}</span>
                    </div>

                    {/* Правая часть: контент + резина */}
                    <div className="flex-1">
                      {/* Контент вложенного упражнения */}
                      <div className="p-3 flex items-center gap-3">
                        <div className="flex-1">
                          <h3 className="font-black text-black text-base mb-1">
                            {subExercise.name}
                          </h3>
                          
                          {/* Параметры */}
                          <div className="text-sm text-gray-600 font-medium">
                            {subExercise.description && (
                              <div>{subExercise.description}</div>
                            )}
                            {!subExercise.description && subExercise.type === 'reps' && subExercise.targetReps && (
                              <span>{subExercise.targetReps} повторений</span>
                            )}
                            {!subExercise.description && subExercise.type === 'static' && subExercise.duration && (
                              <span>{subExercise.duration} секунд</span>
                            )}
                            {!subExercise.description && subExercise.type === 'time' && subExercise.duration && (
                              <span>{Math.floor(subExercise.duration / 60)} минут</span>
                            )}
                            {!subExercise.description && subExercise.type === 'total' && (
                              <span>до отказа</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Поле ввода результата для вложенного упражнения - на одном уровне с названием */}
                        {(exercise.type === 'combo' || exercise.type === 'circuit') && (
                          <ResultInput
                            exerciseId={subExercise.id}
                            value={results[subExercise.id]}
                            isConfirmed={confirmedResults.has(subExercise.id)}
                            onChange={onResultChange}
                            onConfirm={onConfirmResult}
                            disabled={isCompleted || isLocked}
                          />
                        )}
                      </div>
                      
                      {/* Выбор резины для вложенного упражнения - отдельный блок под упражнением */}
                      {subExercise.requiresBandSelection && (
                        <BandSelector
                          exerciseId={subExercise.id}
                          selectedBand={bandSelections[subExercise.id]}
                          onBandChange={onBandChange}
                          disabled={isCompleted || isLocked}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Простые упражнения (total, reps, static) - в таком же стиле с черной панелью */}
          {exercise.type !== 'circuit' && exercise.type !== 'combo' && exercise.type !== 'time' && (
            <div className="flex">
              {/* Черная панель с номером 1 для простого упражнения */}
              <div className="bg-black border-r-4 border-black w-16 flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-black text-3xl">1</span>
              </div>

              {/* Правая часть: контент */}
              <div className="flex-1">
                {/* Контент упражнения */}
                <div className="p-3 flex items-start gap-3">
                  <div className="flex-1">
                    {/* Информация о целевых значениях - как заголовок */}
                    {exercise.type === 'total' && exercise.totalTarget && (
                      <h3 className="font-black text-black text-base mb-1">
                        Тотал: {exercise.totalTarget} повторений
                      </h3>
                    )}

                    {exercise.type === 'reps' && exercise.targetReps && (
                      <h3 className="font-black text-black text-base mb-1">
                        {exercise.targetReps} повторения
                      </h3>
                    )}

                    {/* Описание */}
                    {exercise.description && (
                      <div className="text-sm text-gray-600 font-medium">
                        {exercise.description}
                      </div>
                    )}
                  </div>

                  {/* Поле ввода результата для простого упражнения - на одном уровне с заголовком */}
                  {exercise.recordResult && (
                    <ResultInput
                      exerciseId={exercise.id}
                      value={results[exercise.id]}
                      isConfirmed={confirmedResults.has(exercise.id)}
                      onChange={onResultChange}
                      onConfirm={onConfirmResult}
                      disabled={isCompleted || isLocked}
                    />
                  )}
                </div>
                
                {/* Выбор резины для простого упражнения - отдельный блок под упражнением */}
                {exercise.requiresBandSelection && (
                  <BandSelector
                    exerciseId={exercise.id}
                    selectedBand={bandSelections[exercise.id]}
                    onBandChange={onBandChange}
                    disabled={isCompleted || isLocked}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}