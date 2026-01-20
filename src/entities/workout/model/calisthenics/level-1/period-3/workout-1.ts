import { Workout } from '../../../types';

export const period3Workout1: Workout = {
  id: 'p3-w1',
  name: 'Тренировка 1',
  exercises: [
    {
      id: 'p3-w1-1',
      name: 'Круговой блок',
      type: 'time',
      duration: 30 * 60,
      exercises: [
        {
          id: 'p3-w1-1-1',
          name: 'Выпады на каждую ногу',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p3-w1-1-2',
          name: 'Приседания',
          type: 'reps',
          targetReps: 10,
        },
        {
          id: 'p3-w1-1-3',
          name: 'Горизонтальная тяга резины',
          type: 'reps',
          targetReps: 10,
          requiresBandSelection: true,
        },
        {
          id: 'p3-w1-1-4',
          name: 'Вертикальная тяга резины',
          type: 'reps',
          targetReps: 15,
          requiresBandSelection: true,
        },
        {
          id: 'p3-w1-1-5',
          name: 'Махи на плечи с резиной',
          type: 'reps',
          targetReps: 30,
          requiresBandSelection: true,
        },
        {
          id: 'p3-w1-1-6',
          name: 'Отжимания от пола',
          type: 'reps',
          targetReps: 20,
        },
      ],
    },
    {
      id: 'p3-w1-2',
      name: 'Пресс + пуловер',
      type: 'combo',
      sets: 3,
      exercises: [
        {
          id: 'p3-w1-2-1',
          name: 'Скручивания на пресс с пуловером резины',
          type: 'reps',
          targetReps: 15,
          description: 'С одновременным пуловером резины закрепленной за опору',
          requiresBandSelection: true,
        },
      ],
      restAfter: 60,
    },
    {
      id: 'p3-w1-3',
      name: 'Растяжка',
      type: 'time',
      duration: 5 * 60,
      description: 'Базовая растяжка',
    },
  ],
};