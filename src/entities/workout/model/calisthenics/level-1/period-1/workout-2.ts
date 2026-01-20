import { Workout } from '../../../types';

export const period1Workout2: Workout = {
  id: 'p1-w2',
  name: 'Тренировка 2',
  description: 'Тотал тренировка - зафиксировать время выполнения',
  exercises: [
    {
      id: 'p1-w2-1',
      name: 'Подтягивания',
      type: 'total',
      totalTarget: 40,
      recordResult: true,
    },
    {
      id: 'p1-w2-2',
      name: 'Горизонтальная тяга резины',
      type: 'total',
      totalTarget: 30,
      recordResult: true,
      requiresBandSelection: true,
    },
    {
      id: 'p1-w2-3',
      name: 'Вертикальная тяга резины',
      type: 'total',
      totalTarget: 40,
      recordResult: true,
      requiresBandSelection: true,
    },
    {
      id: 'p1-w2-4',
      name: 'Отжимания от пола',
      type: 'total',
      totalTarget: 20,
      recordResult: true,
    },
    {
      id: 'p1-w2-5',
      name: 'Отжимания от пола с колен',
      type: 'total',
      totalTarget: 30,
      recordResult: true,
    },
    {
      id: 'p1-w2-6',
      name: 'Отжимания от высоких подставок',
      type: 'total',
      totalTarget: 30,
      recordResult: true,
    },
    {
      id: 'p1-w2-7',
      name: 'Приседания',
      type: 'total',
      totalTarget: 50,
      recordResult: true,
      description: 'Каждые 30 секунд 5 повторов',
    },
    {
      id: 'p1-w2-8',
      name: 'Кардио',
      type: 'time',
      duration: 1200, // 20 минут
    },
  ],
};