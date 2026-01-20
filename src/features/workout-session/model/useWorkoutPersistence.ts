/**
 * useWorkoutPersistence - Хук для загрузки и сохранения состояния тренировки
 * 
 * Управляет загрузкой сохраненного состояния при монтировании,
 * сохранением при завершении тренировки и сбросом состояния.
 */

import { useEffect } from 'react';
import {
  loadWorkoutState,
  saveWorkoutState,
  clearWorkoutState,
  saveCompletedWorkout,
} from '@/entities/workout-session';

interface UseWorkoutPersistenceProps {
  workoutId: string;
  // Setters из других хуков
  setTotalTime: (value: number) => void;
  setIsRunning: (value: boolean) => void;
  setCompletedExercises: (value: number[]) => void;
  setResults: (value: Record<string, number>) => void;
  setBandSelections: (value: Record<string, string>) => void;
  setIsWorkoutCompleted: (value: boolean) => void;
  setCompletionDate: (value: Date | null) => void;
}

export function useWorkoutPersistence({
  workoutId,
  setTotalTime,
  setIsRunning,
  setCompletedExercises,
  setResults,
  setBandSelections,
  setIsWorkoutCompleted,
  setCompletionDate,
}: UseWorkoutPersistenceProps) {
  
  // Загружаем сохраненное состояние тренировки при монтировании
  useEffect(() => {
    const savedState = loadWorkoutState(workoutId);
    if (savedState && savedState.isCompleted) {
      // Если тренировка уже завершена - загружаем данные и НЕ запускаем таймер
      setTotalTime(savedState.totalTime);
      setCompletedExercises(savedState.completedExercises);
      setResults(savedState.results);
      setBandSelections(savedState.bandSelections);
      setIsWorkoutCompleted(true);
      setCompletionDate(savedState.completionDate ? new Date(savedState.completionDate) : null);
      setIsRunning(false); // Таймер не запускается для завершенной тренировки
    } else {
      // Новая тренировка - таймер запускается автоматически
      setIsRunning(true);
    }
  }, [workoutId, setTotalTime, setIsRunning, setCompletedExercises, setResults, setBandSelections, setIsWorkoutCompleted, setCompletionDate]);

  const saveCurrentState = (
    totalTime: number,
    completedExercises: number[],
    results: Record<string, number>,
    bandSelections: Record<string, string>,
    completionDate: string
  ) => {
    saveWorkoutState({
      workoutId,
      isCompleted: true,
      totalTime,
      completedExercises,
      results,
      bandSelections,
      completionDate,
    });
  };

  const saveToHistory = (
    totalTime: number,
    results: Record<string, number>,
    bandSelections: Record<string, string>,
    completionDate: string
  ) => {
    saveCompletedWorkout({
      workoutId,
      completionDate,
      totalTime,
      results,
      bandSelections,
    });
  };

  const clearState = () => {
    clearWorkoutState(workoutId);
  };

  return {
    saveCurrentState,
    saveToHistory,
    clearState,
  };
}
