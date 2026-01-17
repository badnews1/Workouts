import { Workout } from '../../../types';

export const period1Workout1: Workout = {
  id: 'p1-w1',
  name: 'Тренировка 1',
  exercises: [
    {
      id: 'p1-w1-1',
      name: 'Круговая работа',
      type: 'time',
      duration: 90, // 1.5 минуты
      exercises: [
        {
          id: 'p1-w1-1-1',
          name: 'Отжимания от пола с колен',
          type: 'reps',
          targetReps: 6,
        },
        {
          id: 'p1-w1-1-2',
          name: 'Скручивания на пресс',
          type: 'reps',
          targetReps: 10,
        },
      ],
    },
    {
      id: 'p1-w1-2',
      name: 'Суперсет',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w1-2-1',
          name: 'Приседание с подъемом на носок',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p1-w1-2-2',
          name: 'Упор на прямых руках',
          type: 'static',
          duration: 15,
        },
        {
          id: 'p1-w1-2-3',
          name: 'Подтягивания в одной динамике',
          type: 'reps',
          recordResult: true,
          description: 'Записать сколько сделал',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w1-3',
      name: 'Суперсет',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w1-3-1',
          name: 'Подтягивания до жжения',
          type: 'reps',
          recordResult: true,
          description: 'Записать сколько сделал',
        },
        {
          id: 'p1-w1-3-2',
          name: 'Мертвая тяга со сведением лопаток с резиной',
          type: 'reps',
          recordResult: true,
          description: 'Записать сколько сделал',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w1-4',
      name: 'Круговая работа',
      type: 'time',
      duration: 90, // 1.5 минуты
      exercises: [
        {
          id: 'p1-w1-4-1',
          name: 'Отжимания от пола с колен',
          type: 'reps',
          targetReps: 6,
        },
        {
          id: 'p1-w1-4-2',
          name: 'Скручивания на пресс',
          type: 'reps',
          targetReps: 10,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w1-5',
      name: 'Суперсет',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w1-5-1',
          name: 'Приседание с подъемом на носок',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p1-w1-5-2',
          name: 'Упор на прямых руках',
          type: 'static',
          duration: 15,
        },
        {
          id: 'p1-w1-5-3',
          name: 'Подтягивани в одной динамике',
          type: 'reps',
          recordResult: true,
          description: 'Записать сколько сделал',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w1-6',
      name: 'Суперсет',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w1-6-1',
          name: 'Подтягивания до жжения',
          type: 'reps',
          recordResult: true,
          description: 'Записать сколько сделал',
        },
        {
          id: 'p1-w1-6-2',
          name: 'Мертвая тяга со сведением лопаток с резиной',
          type: 'reps',
          recordResult: true,
          description: 'Записать сколько сделал',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w1-7',
      name: 'Бицепс и плечи',
      type: 'combo',
      sets: 2,
      exercises: [
        {
          id: 'p1-w1-7-1',
          name: 'Подъём резины на бицепс с жимом над головой',
          type: 'reps',
          description: 'В одной динамике. Например бутылка 5-10 литров',
          recordResult: true,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w1-8',
      name: 'Кардио',
      type: 'time',
      duration: 1200, // 20 минут
      description: 'Бег, скакалка, велосипед или ходьба',
    },
  ],
};