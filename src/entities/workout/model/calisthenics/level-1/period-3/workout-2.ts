import { Workout } from '../../../types';

export const period3Workout2: Workout = {
  id: 'p3-w2',
  name: 'Тренировка 2',
  description: 'Статическая тренировка',
  exercises: [
    {
      id: 'p3-w2-1',
      name: 'Стульчик',
      type: 'static',
      duration: 30,
    },
    {
      id: 'p3-w2-2',
      name: 'Планка',
      type: 'static',
      duration: 45,
    },
    {
      id: 'p3-w2-3',
      name: 'Вис на перекладине с активной спиной',
      type: 'static',
      duration: 30,
    },
    {
      id: 'p3-w2-4',
      name: 'Упор лежа',
      type: 'static',
      duration: 30,
    },
    {
      id: 'p3-w2-5',
      name: 'ИСО ХОЛД 5/5/5',
      type: 'combo',
      sets: 2,
      exercises: [
        {
          id: 'p3-w2-5-1',
          name: 'ИСО ХОЛД 5/5/5',
          type: 'static',
          duration: 15,
          description: '5 секунд в каждой позиции',
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p3-w2-6',
      name: 'Медвежья планка',
      type: 'static',
      duration: 30,
      description: 'Стоим на носочках',
    },
    {
      id: 'p3-w2-7',
      name: 'Статика 90 градусов',
      type: 'combo',
      sets: 3,
      exercises: [
        {
          id: 'p3-w2-7-1',
          name: 'Статика 90° на горизонтальной тяге резины',
          type: 'static',
          duration: 0,
          description: 'До жжения',
          recordResult: true,
        },
      ],
      restAfter: 60,
    },
  ],
};
