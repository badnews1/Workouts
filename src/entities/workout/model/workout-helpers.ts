import { getLevelData } from './get-level-data';
import type { Workout, Period } from './types';

/**
 * Информация о тренировке с контекстом
 */
export interface WorkoutInfo {
  workout: Workout;
  period: Period;
  programId: string;
  levelId: string;
  periodId: string;
}

/**
 * Найти тренировку по ID среди всех программ и уровней
 */
export function findWorkoutById(workoutId: string): Workout | null {
  // Пока у нас только калистеника уровень 1
  const levelData = getLevelData('calisthenics', '1');
  if (!levelData) return null;

  // Ищем в intro тренировках
  const introWorkout = levelData.introWorkouts.find(w => w.id === workoutId);
  if (introWorkout) return introWorkout;

  // Ищем в периодах
  for (const period of levelData.periods) {
    const workout = period.workouts.find(w => w.id === workoutId);
    if (workout) return workout;
  }

  return null;
}

/**
 * Получить полную информацию о тренировке с контекстом (период, программа и т.д.)
 */
export function getWorkoutInfo(workoutId: string): WorkoutInfo | null {
  // Пока у нас только калистеника уровень 1
  const programId = 'calisthenics';
  const levelId = '1';
  const levelData = getLevelData(programId, levelId);
  if (!levelData) return null;

  // Ищем в intro тренировках
  const introWorkout = levelData.introWorkouts.find(w => w.id === workoutId);
  if (introWorkout) {
    // Для intro создаем псевдо-период
    const introPeriod: Period = {
      id: 'period-intro',
      name: 'Вводные тренировки',
      description: 'Знакомство с программой',
      duration: '',
      frequency: '',
      workouts: levelData.introWorkouts,
      goals: [],
      isUnlocked: true,
    };
    
    return {
      workout: introWorkout,
      period: introPeriod,
      programId,
      levelId,
      periodId: 'period-intro',
    };
  }

  // Ищем в периодах
  for (const period of levelData.periods) {
    const workout = period.workouts.find(w => w.id === workoutId);
    if (workout) {
      return {
        workout,
        period,
        programId,
        levelId,
        periodId: period.id,
      };
    }
  }

  return null;
}
