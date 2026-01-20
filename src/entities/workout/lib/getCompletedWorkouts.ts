/**
 * getCompletedWorkouts - Получить историю всех завершенных тренировок по всем периодам
 * 
 * Проходит по всем периодам уровня и собирает завершенные тренировки
 */

import { loadWorkoutState } from '@/entities/workout-session';
import type { WorkoutHistoryEntry, LevelData, Period, Workout } from '../model/types';

export function getCompletedWorkouts(levelData: LevelData): WorkoutHistoryEntry[] {
  const completed: WorkoutHistoryEntry[] = [];

  // Проходим по всем периодам
  levelData.periods.forEach((period: Period, periodIndex: number) => {
    // Определяем название периода
    const isIntroPeriod = period.id === 'period-intro';
    const periodName = isIntroPeriod 
      ? 'Подготовка' 
      : `Период ${periodIndex}`;

    // Проходим по всем тренировкам в периоде
    period.workouts.forEach((workout: Workout) => {
      const state = loadWorkoutState(workout.id);
      if (state && state.isCompleted && state.completionDate) {
        completed.push({
          workoutId: state.workoutId,
          workoutName: workout.name,
          periodName: periodName,
          completedDates: [state.completionDate],
        });
      }
    });
  });

  // Сортируем по дате (старые первые - хронологический порядок)
  completed.sort((a, b) => {
    const dateA = new Date(a.completedDates[0]).getTime();
    const dateB = new Date(b.completedDates[0]).getTime();
    return dateA - dateB;
  });

  return completed;
}