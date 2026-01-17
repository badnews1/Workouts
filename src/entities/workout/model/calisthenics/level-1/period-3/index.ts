import { Period } from '../../../types';
import { period3Workout1 } from './workout-1';
import { period3Workout2 } from './workout-2';

export const period3: Period = {
  id: 'period-3',
  name: 'Период 3',
  description: 'Финальный этап',
  duration: '13-16 дней',
  frequency: '6-8 дней',
  isUnlocked: false,
  totalWorkouts: 2,
  goals: [
    'Выполнить все упражнения периода 3',
  ],
  workouts: [period3Workout1, period3Workout2],
};