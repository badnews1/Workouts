import { calisthenicsLevel1 } from './calisthenics/level-1';
import type { LevelData, Period } from './types';

// Тип для сохраненного состояния тренировки
interface SavedWorkoutState {
  workoutId: string;
  isCompleted: boolean;
  totalTime: number;
  completedExercises: number[];
  results: Record<string, number>;
  completionDate: string | null;
}

// Загрузить состояние тренировки из localStorage
function loadWorkoutState(workoutId: string): SavedWorkoutState | null {
  const key = `workout_${workoutId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// Рассчитать прогресс периода на основе завершенных тренировок
function calculatePeriodProgress(period: Period): Period {
  const workoutIds = period.workouts.map(w => w.id);
  let completedCount = 0;

  // Подсчитываем завершенные тренировки
  workoutIds.forEach(workoutId => {
    const state = loadWorkoutState(workoutId);
    if (state && state.isCompleted) {
      completedCount++;
    }
  });

  const totalWorkouts = period.totalWorkouts || workoutIds.length;
  const progress = totalWorkouts > 0 ? Math.round((completedCount / totalWorkouts) * 100) : 0;
  const isCompleted = completedCount === totalWorkouts;

  return {
    ...period,
    completedWorkouts: completedCount,
    progress,
    isCompleted,
  };
}

// Рассчитать общий прогресс уровня
function calculateLevelProgress(levelData: LevelData): LevelData {
  // Сначала рассчитываем прогресс всех периодов
  const periodsWithProgress = levelData.periods.map(period => calculatePeriodProgress(period));

  // Определяем текущий период - первый незавершенный
  let currentPeriodIndex = periodsWithProgress.findIndex(p => !p.isCompleted);
  if (currentPeriodIndex === -1) {
    // Если все периоды завершены, текущий - последний
    currentPeriodIndex = periodsWithProgress.length - 1;
  }

  // Затем определяем статус разблокировки и isCurrent на основе завершенности предыдущих периодов
  const updatedPeriods = periodsWithProgress.map((period, index) => {
    // Логика разблокировки периодов:
    // - Первый период (index 0) всегда разблокирован
    // - Каждый следующий период разблокируется когда предыдущий завершен
    let isUnlocked: boolean;
    
    if (index === 0) {
      // Первый период всегда разблокирован
      isUnlocked = true;
    } else {
      // Следующий период разблокируется когда предыдущий завершен
      const previousPeriodCompleted = periodsWithProgress[index - 1]?.isCompleted || false;
      isUnlocked = previousPeriodCompleted;
    }
    
    // Устанавливаем isCurrent для текущего периода
    const isCurrent = index === currentPeriodIndex;
    
    return {
      ...period,
      isUnlocked,
      isCurrent,
    };
  });

  // Считаем общий прогресс уровня
  let totalCompleted = 0;
  let totalWorkouts = 0;

  updatedPeriods.forEach(period => {
    totalCompleted += period.completedWorkouts || 0;
    totalWorkouts += period.totalWorkouts || period.workouts.length;
  });

  const totalProgress = totalWorkouts > 0 ? Math.round((totalCompleted / totalWorkouts) * 100) : 0;

  return {
    ...levelData,
    periods: updatedPeriods,
    currentPeriod: currentPeriodIndex,
    totalProgress,
    totalCompletedWorkouts: totalCompleted,
    totalWorkoutsCount: totalWorkouts,
  };
}

export function getLevelData(programId: string, levelId: string): LevelData | null {
  // Пока у нас есть данные только для калистеники уровня 1
  if (programId === 'calisthenics' && levelId === '1') {
    return calculateLevelProgress(calisthenicsLevel1);
  }
  
  // Для остальных уровней пока нет данных
  return null;
}