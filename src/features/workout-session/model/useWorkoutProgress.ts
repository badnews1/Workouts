/**
 * useWorkoutProgress - Хук для управления прогрессом тренировки
 * 
 * Содержит результаты упражнений, выбор резин, отметки о выполнении,
 * подтвержденные результаты и состояние завершения тренировки.
 */

import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function useWorkoutProgress() {
  const [results, setResults] = useState<Record<string, number>>({});
  const [bandSelections, setBandSelections] = useState<Record<string, string>>({});
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [confirmedResults, setConfirmedResults] = useState<Set<string>>(new Set());
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [expandedExercises, setExpandedExercises] = useState<number[]>([]);

  const handleResultChange = (exerciseId: string, value: number) => {
    setResults((prev) => ({ ...prev, [exerciseId]: value }));
    // При изменении значения снимаем подтверждение
    setConfirmedResults((prev) => {
      const newSet = new Set(prev);
      newSet.delete(exerciseId);
      return newSet;
    });
  };

  const handleBandSelectionChange = (exerciseId: string, value: string) => {
    setBandSelections((prev) => ({ ...prev, [exerciseId]: value }));
    // При изменении значения снимаем подтверждение
    setConfirmedResults((prev) => {
      const newSet = new Set(prev);
      newSet.delete(exerciseId);
      return newSet;
    });
  };

  const handleConfirmResult = (exerciseId: string) => {
    const value = results[exerciseId];
    if (value !== undefined && value > 0) {
      setConfirmedResults((prev) => new Set(prev).add(exerciseId));
      toast.success('Результат сохранён');
    } else {
      toast.error('Введите результат');
    }
  };

  const handleCompleteExercise = (index: number) => {
    if (isWorkoutCompleted) {
      return; // Если тренировка завершена, нельзя изменять галочки
    }
    
    setCompletedExercises((prev) => {
      // Если упражнение уже выполнено - снимаем отметку
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      // Иначе добавляем в выполненные
      return [...prev, index];
    });
  };

  const toggleExercise = (index: number) => {
    setExpandedExercises((prev) => {
      if (prev.includes(index)) {
        // Сворачиваем упражнение
        return prev.filter((i) => i !== index);
      } else {
        // Раскрываем упражнение
        return [...prev, index];
      }
    });
    
    // Устанавливаем текущее упражнение
    setCurrentExerciseIndex(index);
  };

  const completeWorkout = (totalExercises: number) => {
    setIsWorkoutCompleted(true);
    const now = new Date();
    setCompletionDate(now);
    // Отмечаем все упражнения как выполненные
    const allCompleted = Array.from({ length: totalExercises }, (_, i) => i);
    setCompletedExercises(allCompleted);
    return { completionDate: now, allCompleted };
  };

  const resetProgress = () => {
    setResults({});
    setBandSelections({});
    setCompletedExercises([]);
    setConfirmedResults(new Set());
    setIsWorkoutCompleted(false);
    setCompletionDate(null);
    setCurrentExerciseIndex(0);
    setExpandedExercises([]);
  };

  return {
    // State
    results,
    bandSelections,
    completedExercises,
    confirmedResults,
    isWorkoutCompleted,
    completionDate,
    currentExerciseIndex,
    expandedExercises,
    // Setters для внешнего управления
    setResults,
    setBandSelections,
    setCompletedExercises,
    setIsWorkoutCompleted,
    setCompletionDate,
    // Actions
    handleResultChange,
    handleBandSelectionChange,
    handleConfirmResult,
    handleCompleteExercise,
    toggleExercise,
    completeWorkout,
    resetProgress,
  };
}
