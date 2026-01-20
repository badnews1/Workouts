import { Workout } from '../../../types';

export const period1Workout3: Workout = {
  id: 'p1-w3',
  name: 'Тренировка 3',
  exercises: [
    {
      id: 'p1-w3-1',
      name: 'Блок 1',
      type: 'time',
      duration: 300, // 5 минут
      exercises: [
        {
          id: 'p1-w3-1-1',
          name: 'Отжимания от пола с колен',
          type: 'reps',
          targetReps: 6,
        },
        {
          id: 'p1-w3-1-2',
          name: 'Скручивания на пресс',
          type: 'reps',
          targetReps: 10,
        },
      ],
    },
    {
      id: 'p1-w3-2',
      name: 'Блок 2',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w3-2-1',
          name: 'Приседание с подъемом на носок',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p1-w3-2-2',
          name: 'Упор на прямых руках',
          type: 'static',
          duration: 15,
        },
        {
          id: 'p1-w3-2-3',
          name: 'Подтягивания',
          type: 'reps',
          recordResult: true,
          description: 'В одной динамике',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w3-3',
      name: 'Блок 3',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w3-3-1',
          name: 'Подтягивания',
          type: 'reps',
          recordResult: true,
          description: 'До отказа',
        },
        {
          id: 'p1-w3-3-2',
          name: 'Мертвая тяга со сведением лопаток',
          type: 'reps',
          recordResult: true,
          description: 'С резиной',
          requiresBandSelection: true,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w3-4',
      name: 'Блок 4 (повтор блока 1)',
      type: 'time',
      duration: 300, // 5 минут
      exercises: [
        {
          id: 'p1-w3-4-1',
          name: 'Отжимания от пола с колен',
          type: 'reps',
          targetReps: 6,
        },
        {
          id: 'p1-w3-4-2',
          name: 'Скручивания на пресс',
          type: 'reps',
          targetReps: 10,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w3-5',
      name: 'Блок 5 (повтор блока 2)',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w3-5-1',
          name: 'Приседание с подъемом на носок',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p1-w3-5-2',
          name: 'Упор на прямых руках',
          type: 'static',
          duration: 15,
        },
        {
          id: 'p1-w3-5-3',
          name: 'Подтягивания',
          type: 'reps',
          recordResult: true,
          description: 'В одной динамике',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w3-6',
      name: 'Блок 6 (повтор блока 3)',
      type: 'combo',
      sets: 1,
      exercises: [
        {
          id: 'p1-w3-6-1',
          name: 'Подтягивания',
          type: 'reps',
          recordResult: true,
          description: 'До отказа',
        },
        {
          id: 'p1-w3-6-2',
          name: 'Мертвая тяга со сведением лопаток',
          type: 'reps',
          recordResult: true,
          description: 'С резиной',
          requiresBandSelection: true,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w3-7',
      name: 'Бицепс и плечи',
      type: 'combo',
      sets: 2,
      exercises: [
        {
          id: 'p1-w3-7-1',
          name: 'Подъёмы на бицепс с жимом над головой',
          type: 'reps',
          description: 'С резиной, в одной динамике',
          recordResult: true,
          requiresBandSelection: true,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p1-w3-8',
      name: 'Кардио',
      type: 'time',
      duration: 1200, // 20 минут
    },
  ],
};