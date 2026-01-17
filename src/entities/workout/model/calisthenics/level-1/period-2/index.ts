import { Period } from '../../../types';
import { period2Workout1 } from './workout-1';
import { period2Workout2 } from './workout-2';

export const period2: Period = {
  id: 'period-2',
  name: 'Период 2',
  description: 'Усиление базы',
  duration: '14-16 дней',
  frequency: '6-7 дней',
  isUnlocked: true,
  totalWorkouts: 2,
  goals: [
    'Выполнить все цели по тренировкам периода 2',
  ],
  workouts: [period2Workout1, period2Workout2],
};