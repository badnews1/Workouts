import { Workout } from '../../../types';

export const period2Workout2: Workout = {
  id: 'p2-w2',
  name: 'Тренировка 2',
  exercises: [
    {
      id: 'p2-w2-1',
      name: 'Подтягивания',
      type: 'total',
      totalTarget: 35,
      recordResult: true,
      description: 'Зафиксировать за сколько сделал по времени',
    },
    {
      id: 'p2-w2-2',
      name: 'Отжимания от пола',
      type: 'total',
      totalTarget: 40,
      recordResult: true,
      description: 'Каждое последнее отжимание подхода - негативное опускание 3-5 сек или упор 7-10 сек',
    },
    {
      id: 'p2-w2-3',
      name: 'Круговой блок',
      type: 'time',
      duration: 10 * 60,
      exercises: [
        {
          id: 'p2-w2-3-1',
          name: 'Приседания',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p2-w2-3-2',
          name: 'Махи на плечи с резиной',
          type: 'reps',
          targetReps: 20,
        },
        {
          id: 'p2-w2-3-3',
          name: 'Отжимания от пола + с колен в одной динамике',
          type: 'combo',
          exercises: [
            {
              id: 'p2-w2-3-3-1',
              name: 'Отжимания от пола',
              type: 'reps',
              targetReps: 10,
            },
            {
              id: 'p2-w2-3-3-2',
              name: 'Отжимания с колен до жжения',
              type: 'reps',
              recordResult: true,
            },
          ],
        },
        {
          id: 'p2-w2-3-4',
          name: 'Вертикальная тяга резины в одной динамике',
          type: 'reps',
          recordResult: true,
        },
        {
          id: 'p2-w2-3-5',
          name: 'Отжимания от пола + с колен',
          type: 'combo',
          exercises: [
            {
              id: 'p2-w2-3-5-1',
              name: 'Отжимания от пола',
              type: 'reps',
              targetReps: 10,
            },
            {
              id: 'p2-w2-3-5-2',
              name: 'Отжимания с колен до жжения',
              type: 'reps',
              recordResult: true,
            },
          ],
        },
        {
          id: 'p2-w2-3-6',
          name: 'Вертикальная тяга резины',
          type: 'reps',
          recordResult: true,
        },
        {
          id: 'p2-w2-3-7',
          name: 'Горизонтальная тяга резины до жжения',
          type: 'reps',
          recordResult: true,
        },
        {
          id: 'p2-w2-3-8',
          name: 'Подъемы на икры',
          type: 'reps',
          targetReps: 10,
          description: 'Отдых 30 сек и еще раз',
        },
        {
          id: 'p2-w2-3-9',
          name: 'Горизонтальная тяга резины до жжения',
          type: 'reps',
          recordResult: true,
        },
        {
          id: 'p2-w2-3-10',
          name: 'Подъемы на икры',
          type: 'reps',
          targetReps: 10,
          description: 'Отдых 30 сек и еще раз',
        },
      ],
    },
    {
      id: 'p2-w2-4',
      name: 'Кардио',
      type: 'time',
      duration: 12 * 60,
      description: 'Бег, скакалка, велосипед или ходьба',
    },
  ],
};
