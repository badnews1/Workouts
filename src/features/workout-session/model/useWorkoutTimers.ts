/**
 * useWorkoutTimers - Хук для управления таймерами тренировки
 * 
 * Содержит логику общего таймера (totalTime) и таймера упражнения (exerciseTimer).
 * Общий таймер идёт постоянно во время тренировки, таймер упражнения можно стартовать/паузить независимо.
 */

import { useState, useEffect } from 'react';

export function useWorkoutTimers() {
  const [isRunning, setIsRunning] = useState(true); // Тренировка запускается автоматически
  const [totalTime, setTotalTime] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [exerciseTimerRunning, setExerciseTimerRunning] = useState(false);

  // Общий таймер - всегда идет когда isRunning = true
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Таймер упражнения - простой прямой отсчет (считает вверх)
  useEffect(() => {
    if (!exerciseTimerRunning) return;
    
    const interval = setInterval(() => {
      setExerciseTimer((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [exerciseTimerRunning]);

  const startExerciseTimer = () => {
    setExerciseTimerRunning(true);
  };

  const pauseExerciseTimer = () => {
    setExerciseTimerRunning(false);
  };

  const resumeExerciseTimer = () => {
    setExerciseTimerRunning(true);
  };

  const resetExerciseTimer = () => {
    setExerciseTimer(0);
    setExerciseTimerRunning(false);
  };

  const stopAllTimers = () => {
    setIsRunning(false);
    setExerciseTimerRunning(false);
  };

  const resetAllTimers = () => {
    setTotalTime(0);
    setIsRunning(false);
    setExerciseTimer(0);
    setExerciseTimerRunning(false);
  };

  return {
    // State
    isRunning,
    totalTime,
    exerciseTimer,
    exerciseTimerRunning,
    // Setters для внешнего управления
    setIsRunning,
    setTotalTime,
    // Actions
    startExerciseTimer,
    pauseExerciseTimer,
    resumeExerciseTimer,
    resetExerciseTimer,
    stopAllTimers,
    resetAllTimers,
  };
}
