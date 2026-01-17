/**
 * WorkoutsPage - Главная страница приложения
 * 
 * Отображает список из 8 уровней сложности выбранной программы тренировок
 * с текущим прогрессом, завершенными и заблокированными уровнями.
 * 
 * Роут: /workouts
 * Навигация: 
 *   - Клик на уровень → /workouts/:programId/:levelId (LevelDetailPage)
 *   - Кнопка "Программы" → /programs (ProgramsPage)
 */

import { useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { Header } from '../../../shared/ui/header';
import { useLocalStorage } from '../../../shared/lib/hooks';
import { programs } from '../../../entities/program';
import { Level } from '../../../entities/level';
import { LevelsList, ProgressHeader } from '../../../widgets/levels-list';
import { getLevelData } from '../../../entities/workout';

export function WorkoutsPage() {
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

  // Определяем текущий активный уровень для отображения в шапке
  const activeLevelNumber = currentLevelIndex >= 0 ? currentLevelIndex + 1 : 1;

  function getLevelName(level: number): string {
    const names = [
      'Новичок',
      'Базовый',
      'Продвинутый новичок',
      'Средний',
      'Продвинутый',
      'Опытный',
      'Эксперт',
      'Мастер',
    ];
    return names[level - 1] || `Уровень ${level}`;
  }

  function getLevelDescription(level: number): string {
    const descriptions = [
      'Начальная подготовка',
      'Основы силы',
      'Развитие выносливости',
      'Сложные элементы',
      'Силовая база',
      'Продвинутые техники',
      'Сложные элементы',
      'Мастерство владения телом',
    ];
    return descriptions[level - 1] || 'Нажмите, чтобы начать';
  }

  const handleLevelClick = (levelId: number) => {
    if (selectedProgramId) {
      navigate(`/workouts/${selectedProgramId}/${levelId}`);
    }
  };

  if (!selectedProgram) {
    return (
      <div className="h-full">
        <Header 
          title="Тренировки"
          rightAction={
            <button
              onClick={() => navigate('/programs')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Программы"
            >
              <LayoutGrid className="w-6 h-6 text-gray-700" />
            </button>
          }
        />
        <div className="flex items-center justify-center h-[calc(100%-60px)] px-4">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Программа не выбрана</p>
            <button
              onClick={() => navigate('/programs')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Выбрать программу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <Header 
        title="Тренировки"
        rightAction={
          <button
            onClick={() => navigate('/programs')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Программы"
          >
            <LayoutGrid className="w-6 h-6 text-gray-700" />
          </button>
        }
      />
      <div className="px-4 py-6">
        <ProgressHeader
          programName={selectedProgram.name}
          programDescription={selectedProgram.description}
          currentLevel={activeLevelNumber}
          totalLevels={8}
          totalWorkouts={totalWorkoutsCount} // Пример: 3 периода * 8 тренировок
          completedWorkouts={totalCompletedWorkouts} // Пример: завершили 8 тренировок
          color={selectedProgram.color}
        />

        <LevelsList
          levels={levels}
          color={selectedProgram.color}
          onLevelClick={handleLevelClick}
        />
      </div>
    </div>
  );
}