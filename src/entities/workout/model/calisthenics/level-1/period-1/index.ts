import { Period } from '../../../types';
import { period1Workout1 } from './workout-1';
import { period1Workout2 } from './workout-2';
import { period1Workout3 } from './workout-3';

export const period1: Period = {
  id: 'period-1',
  name: 'Период 1',
  description: 'Начальная адаптация',
  duration: '13-16 дней',
  frequency: '6-8 дней',
  isUnlocked: true,
  totalWorkouts: 3,
  goals: [
    'Выполнить все цели по повторениям в Тренировке 1',
    'Выполнить все тотал цели в Тренировке 2',
    'Выполнить все цели по повторениям в Тренировке 3',
  ],
  workouts: [period1Workout1, period1Workout2, period1Workout3],
};