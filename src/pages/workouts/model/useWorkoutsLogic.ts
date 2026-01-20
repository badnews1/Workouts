/**
 * useWorkoutsLogic - Логика главной страницы тренировок
 * 
 * Управляет генерацией уровней, определением текущего уровня и статусов
 */

import { useNavigate } from 'react-router';
import { useLocalStorage } from '@/shared';
import { programs } from '@/entities/program';
import { type Level } from '@/entities/level';
import { getLevelData } from '@/entities/workout';
import { getLevelName, getLevelDescription } from '../config';

export function useWorkoutsLogic() {
  const navigate = useNavigate();
  const [selectedProgramId] = useLocalStorage<string | null>('selectedProgramId', null);

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  // Генерируем 8 уровней с реальными данными
  const levels: Level[] = Array.from({ length: 8 }, (_, i) => {
    const levelNumber = i + 1;
    
    // Получаем реальные данные уровня
    const levelData = selectedProgramId 
      ? getLevelData(selectedProgramId, levelNumber.toString())
      : null;
    
    if (levelData) {
      // Если есть реальные данные - используем их
      const isCompleted = levelData.totalProgress === 100;
      const progress = levelData.totalProgress || 0;
      
      return {
        id: levelNumber,
        name: getLevelName(levelNumber),
        description: getLevelDescription(levelNumber),
        isCompleted,
        isLocked: false, // Будет установлено ниже
        isCurrent: false, // Будет установлено ниже
        progress: isCompleted ? undefined : progress,
      };
    } else {
      // Если данных нет - уровень пока недоступен (заблокирован)
      return {
        id: levelNumber,
        name: getLevelName(levelNumber),
        description: getLevelDescription(levelNumber),
        isCompleted: false,
        isLocked: true,
        isCurrent: false,
        progress: undefined,
      };
    }
  });

  // Определяем текущий уровень (первый незавершенный с реальными данными)
  let currentLevelIndex = levels.findIndex(level => {
    const levelData = selectedProgramId 
      ? getLevelData(selectedProgramId, level.id.toString())
      : null;
    return levelData && levelData.totalProgress < 100;
  });

  if (currentLevelIndex === -1) {
    // Если все уровни с данными завершены, текущий - последний с данными
    currentLevelIndex = levels.findIndex(level => {
      const levelData = selectedProgramId 
        ? getLevelData(selectedProgramId, level.id.toString())
        : null;
      return levelData !== null;
    });
    if (currentLevelIndex !== -1) {
      // Находим последний уровень с данными
      for (let i = levels.length - 1; i >= 0; i--) {
        const levelData = selectedProgramId 
          ? getLevelData(selectedProgramId, levels[i].id.toString())
          : null;
        if (levelData !== null) {
          currentLevelIndex = i;
          break;
        }
      }
    }
  }

  // Устанавливаем статусы для уровней
  levels.forEach((level, index) => {
    const levelData = selectedProgramId 
      ? getLevelData(selectedProgramId, level.id.toString())
      : null;
    
    if (!levelData) {
      // Уровни без данных заблокированы
      level.isLocked = true;
      level.isCurrent = false;
    } else if (index === currentLevelIndex) {
      // Текущий уровень
      level.isCurrent = true;
      level.isLocked = false;
    } else if (level.isCompleted) {
      // Завершенные уровни разблокированы
      level.isLocked = false;
      level.isCurrent = false;
    } else if (index > currentLevelIndex) {
      // Уровни после текущего заблокированы
      level.isLocked = true;
      level.isCurrent = false;
    } else {
      // Уровни до текущего (если есть незавершенные) - разблокированы
      level.isLocked = false;
      level.isCurrent = false;
    }
  });

  // Подсчитываем общую статистику по всем уровням
  let totalWorkoutsCount = 0;
  let totalCompletedWorkouts = 0;
  let levelsWithData = 0;

  levels.forEach(level => {
    const levelData = selectedProgramId 
      ? getLevelData(selectedProgramId, level.id.toString())
      : null;
    
    if (levelData) {
      levelsWithData++;
      totalWorkoutsCount += levelData.totalWorkoutsCount || 0;
      totalCompletedWorkouts += levelData.totalCompletedWorkouts || 0;
    }
  });

  // Вычисляем общий прогресс
  const overallProgress = totalWorkoutsCount > 0 
    ? Math.round((totalCompletedWorkouts / totalWorkoutsCount) * 100)
    : 0;

  // Обработчики
  const handleLevelClick = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level && !level.isLocked && selectedProgramId) {
      navigate(`/workouts/${selectedProgramId}/${levelId}`);
    }
  };

  const handleProgramsClick = () => {
    navigate('/programs');
  };

  return {
    selectedProgram,
    levels,
    overallProgress,
    totalCompletedWorkouts,
    totalWorkoutsCount,
    handleLevelClick,
    handleProgramsClick,
  };
}
