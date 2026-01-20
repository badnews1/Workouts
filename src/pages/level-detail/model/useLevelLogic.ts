/**
 * useLevelLogic - Логика страницы детализации уровня
 * 
 * Управляет данными уровня, прогрессом и навигацией
 */

import { useNavigate } from 'react-router';
import { getLevelData, getCompletedWorkouts } from '@/entities/workout';
import { programs } from '@/entities/program';

interface UseLevelLogicProps {
  programId: string;
  levelId: string;
}

export function useLevelLogic({ programId, levelId }: UseLevelLogicProps) {
  const navigate = useNavigate();
  
  // Получаем данные уровня по ID
  const levelData = getLevelData(programId, levelId);

  // Получаем цвет программы
  const program = programs.find(p => p.id === programId);
  const color = program?.color || 'var(--brand-blue)';

  // Если данных нет - возвращаем null
  if (!levelData) {
    return {
      levelData: null,
      color,
      workoutHistory: [],
      displayData: null,
      handleBack: () => navigate('/workouts'),
      handlePeriodClick: () => {},
    };
  }

  // Подсчитываем общее количество периодов и текущий период
  const totalPeriods = levelData.periods.length;
  const currentPeriodIndex = levelData.currentPeriod || 0;
  const currentPeriod = levelData.periods[currentPeriodIndex];

  // Вычисляем номер периода для отображения
  // period-intro (index 0) → "Подготовка"
  // period-1 (index 1) → "Период 1 из 3"
  // period-2 (index 2) → "Период 2 из 3"
  // period-3 (index 3) → "Период 3 из 3"
  const isIntroPeriod = currentPeriod?.id === 'period-intro';
  const displayPeriodNumber = isIntroPeriod ? 0 : currentPeriodIndex;
  const displayTotalPeriods = totalPeriods - 1; // исключаем вводный период

  // Получаем историю всех завершенных тренировок
  const workoutHistory = getCompletedWorkouts(levelData);

  // Обработчик возврата назад
  const handleBack = () => {
    navigate('/workouts');
  };

  // Обработчик клика на период
  const handlePeriodClick = (periodId: string) => {
    // Если это вводные тренировки - переходим на /intro
    if (periodId === 'period-intro') {
      navigate(`/workouts/${programId}/${levelId}/intro`);
    } else {
      // Для остальных периодов извлекаем номер (period-1 → 1, period-2 → 2, etc.)
      const periodNumber = periodId.replace('period-', '');
      navigate(`/workouts/${programId}/${levelId}/period/${periodNumber}`);
    }
  };

  return {
    levelData,
    color,
    workoutHistory,
    displayData: {
      currentPeriod: displayPeriodNumber,
      totalPeriods: displayTotalPeriods,
      progress: levelData.totalProgress || 0,
      currentDay: currentPeriod?.currentDay,
      completedWorkouts: levelData.totalCompletedWorkouts,
      totalWorkouts: levelData.totalWorkoutsCount,
      isIntroPeriod,
    },
    handleBack,
    handlePeriodClick,
  };
}