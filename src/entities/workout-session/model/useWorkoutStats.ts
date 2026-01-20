/**
 * Хук для получения статистики тренировок
 */

import { useState, useEffect } from 'react';
import { getAllCompletedWorkouts } from './useWorkoutSession';

interface WorkoutStats {
  /** Количество завершенных тренировок */
  completedWorkouts: number;
  /** Текущая серия (дни подряд) */
  currentStreak: number;
  /** Общее время тренировок (минуты) */
  totalMinutes: number;
}

/**
 * Хук для получения статистики тренировок пользователя
 */
export function useWorkoutStats() {
  const [stats, setStats] = useState<WorkoutStats>({
    completedWorkouts: 0,
    currentStreak: 0,
    totalMinutes: 0,
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const completedWorkouts = getAllCompletedWorkouts();
    
    const totalMinutes = completedWorkouts.reduce((sum, workout) => {
      return sum + Math.round(workout.duration / 60);
    }, 0);

    // Подсчет серии (упрощенная версия - просто количество тренировок)
    // TODO: Реализовать правильный подсчет серии по дням
    const currentStreak = completedWorkouts.length > 0 ? 1 : 0;

    setStats({
      completedWorkouts: completedWorkouts.length,
      currentStreak,
      totalMinutes,
    });
  };

  return {
    stats,
    reload: calculateStats,
  };
}
