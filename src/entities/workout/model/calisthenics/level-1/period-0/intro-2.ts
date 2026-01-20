import { Workout } from '../../../types';

export const intro2: Workout = {
  id: 'intro-2',
  name: 'Тренировка 2',
  exercises: [
    {
      id: 'intro-2-circuit',
      name: 'Круговая работа',
      type: 'circuit',
      duration: 1500, // 25 минут
      exercises: [
        {
          id: 'intro-2-1',
          name: 'Выпады на каждую ногу',
          type: 'reps',
          targetReps: 2,
        },
        {
          id: 'intro-2-2',
          name: 'Подтягивания',
          type: 'reps',
          targetReps: 2,
        },
        {
          id: 'intro-2-3',
          name: 'Отжимания от пола с колен',
          type: 'reps',
          targetReps: 2,
        },
        {
          id: 'intro-2-4',
          name: 'Упор на прямых руках',
          type: 'static',
          duration: 10, // 10 секунд
        },
      ],
    },
    {
      id: 'intro-2-cardio',
      name: 'Кардио',
      type: 'time',
      duration: 1200, // 20 минут
    },
  ],
};