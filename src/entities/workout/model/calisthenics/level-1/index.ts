import { LevelData } from '../../types';
import { period0, intro1, intro2 } from './period-0';
import { period1 } from './period-1';
import { period2 } from './period-2';
import { period3 } from './period-3';

export const calisthenicsLevel1: LevelData = {
  id: 1,
  name: 'Уровень 1 - Новичок',
  description: 'Данный уровень предназначен для начальной подготовки и приведения в тонус, в настоящее время, совершенно не подготовленного человека, с практически нулевым уровнем любых силовых показателей.',
  requirements: {
    pullups: 0,
    pushups: 0,
  },
  introWorkouts: [intro1, intro2],
  periods: [period0, period1, period2, period3],
};