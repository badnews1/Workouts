import { Workout } from '../../../types';

export const period2Workout1: Workout = {
  id: 'p2-w1',
  name: 'Тренировка 1',
  exercises: [
    {
      id: 'p2-w1-1',
      name: 'Блок 1',
      type: 'time',
      duration: 10 * 60,
      exercises: [
        {
          id: 'p2-w1-1-1',
          name: 'Горизонтальная тяга резины в одной динамике',
          type: 'reps',
          recordResult: true,
          requiresBandSelection: true,
        },
        {
          id: 'p2-w1-1-2',
          name: 'Вертикальные отжимания до жжения',
          type: 'reps',
          recordResult: true,
        },
      ],
    },
    {
      id: 'p2-w1-2',
      name: 'Стульчик комплекс',
      type: 'combo',
      sets: 3,
      exercises: [
        {
          id: 'p2-w1-2-1',
          name: 'Стульчик',
          type: 'static',
          duration: 10,
        },
        {
          id: 'p2-w1-2-2',
          name: 'Насос',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p2-w1-2-3',
          name: 'Приседания',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p2-w1-2-4',
          name: 'Отжимания',
          type: 'reps',
          targetReps: 10,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p2-w1-3',
      name: 'Блок тяги и пресс',
      type: 'combo',
      sets: 2,
      exercises: [
        {
          id: 'p2-w1-3-1',
          name: 'Вертикальная тяга резины в одной динамике',
          type: 'reps',
          recordResult: true,
          requiresBandSelection: true,
        },
        {
          id: 'p2-w1-3-2',
          name: 'Скручивания на пресс',
          type: 'time',
          duration: 25,
          description: '20-30 секунд',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p2-w1-4',
      name: 'Махи на плечи',
      type: 'reps',
      sets: 4,
      targetReps: 30,
      description: 'Махи резины на плечи',
      restAfter: 45,
      requiresBandSelection: true,
    },
    {
      id: 'p2-w1-5',
      name: 'Кардио',
      type: 'time',
      duration: 10 * 60,
      description: 'Бег, скакалка, велосипед или ходьба',
    },
  ],
};