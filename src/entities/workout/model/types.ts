export type ExerciseType = 'reps' | 'time' | 'circuit' | 'total' | 'static' | 'combo';

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  type: ExerciseType;
  
  // Для упражнений с повторениями
  targetReps?: number;
  sets?: number;
  
  // Для упражнений на время
  duration?: number; // в секундах
  
  // Для тотал упражнений (суммарное количество)
  totalTarget?: number;
  
  // Для комбо (несколько упражнений в связке)
  exercises?: Exercise[];
  
  // Отдых после упражнения
  restAfter?: number; // в секундах
  
  // Нужно ли записывать результат
  recordResult?: boolean;
  
  // Иконка упражнения
  icon?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
}

export interface Period {
  id: string;
  name: string;
  description: string;
  duration: string; // "13-16 дней"
  frequency: string; // "6-8 дней"
  workouts: Workout[];
  goals: string[]; // Цели для перехода к следующему периоду
  isUnlocked: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  progress?: number; // 0-100
  currentDay?: number;
  totalDays?: number;
  totalWorkouts?: number;
  completedWorkouts?: number;
}

export interface LevelData {
  id: number;
  name: string;
  description: string;
  requirements: {
    pullups: number;
    pushups: number;
  };
  introWorkouts: Workout[];
  periods: Period[];
  currentPeriod?: number; // индекс текущего периода
  totalProgress?: number; // общий прогресс уровня 0-100
  totalCompletedWorkouts?: number; // общее количество завершенных тренировок
  totalWorkoutsCount?: number; // общее количество тренировок в уровне
}