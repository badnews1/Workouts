import { Period } from '../../../types';
import { intro1 } from './intro-1';
import { intro2 } from './intro-2';

export const period0: Period = {
  id: 'period-intro',
  name: 'Подготовка',
  description: 'Начальная подготовка',
  duration: '',
  frequency: '2 тренировки',
  isUnlocked: true,
  totalWorkouts: 2,
  goals: [],
  workouts: [intro1, intro2],
};

// Экспортируем тренировки для использования в introWorkouts
export { intro1, intro2 };