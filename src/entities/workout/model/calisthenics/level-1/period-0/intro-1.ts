import { Workout } from '../../../types';

export const intro1: Workout = {
  id: 'intro-1',
  name: 'Тренировка 1',
  exercises: [
    {
      id: 'intro-1-circuit',
      name: 'Круговая работа',
      type: 'circuit',
      duration: 900, // 15 минут
      exercises: [
        {
          id: 'intro-1-1',
          name: 'Приседания',
          type: 'reps',
          targetReps: 2,
        },
        {
          id: 'intro-1-2',
          name: 'Подтягивания',
          type: 'reps',
          targetReps: 2,
        },
        {
          id: 'intro-1-3',
          name: 'Отжимания от пола с колен',
          type: 'reps',
          targetReps: 2,
        },
        {
          id: 'intro-1-4',
          name: 'Скручивания на пресс',
          type: 'reps',
          targetReps: 2,
        },
      ],
    },
    {
      id: 'intro-1-cardio',
      name: 'Кардио',
      type: 'time',
      duration: 900, // 15 минут
    },
  ],
};