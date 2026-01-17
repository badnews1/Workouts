/**
 * PeriodDetailPage - Страница детализации периода
 * 
 * Показывает список тренировок конкретного периода.
 * Отображает статус выполнения периода и список всех тренировок с возможностью их запуска.
 * 
 * Роуты: 
 *   - /workouts/:programId/:levelId/intro (period-0)
 *   - /workouts/:programId/:levelId/period/:periodNumber (period-1, period-2, period-3)
 * Навигация:
 *   - Назад → /workouts/:programId/:levelId (LevelDetailPage)
 *   - Клик на тренировку → /workout-session/:workoutId (WorkoutSessionPage)
 */

import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, Info } from 'lucide-react';
import { Header } from '../../../shared/ui/header';
import { getLevelData } from '../../../entities/workout';
import { programs } from '../../../entities/program';
import { IntroStatusHeader } from '../../../widgets/intro-status-header';
import { IntroWorkoutsList } from '../../../widgets/intro-workouts-list';

// Тип для сохраненного состояния тренировки
interface SavedWorkoutState {
  workoutId: string;
  isCompleted: boolean;
  totalTime: number;
  completedExercises: number[];
  results: Record<string, number>;
  completionDate: string | null;
}

// Функции для работы с localStorage
function loadWorkoutState(workoutId: string): SavedWorkoutState | null {
  const key = `workout_${workoutId}`;
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// Получить историю завершенных тренировок для периода
function getCompletedWorkoutsForPeriod(workoutIds: string[]) {
  const completed: Array<{
    workoutId: string;
    workoutName: string;
    periodName: string;
    completedDates: string[];
    totalTime: number;
  }> = [];

  workoutIds.forEach(workoutId => {
    const state = loadWorkoutState(workoutId);
    if (state && state.isCompleted && state.completionDate) {
      completed.push({
        workoutId: state.workoutId,
        workoutName: '', // Заполним позже
        periodName: '', // Заполним позже
        completedDates: [state.completionDate],
        totalTime: state.totalTime
      });
    }
  });

  return completed;
}

export function PeriodDetailPage() {
  const navigate = useNavigate();
  const { programId, levelId, periodNumber } = useParams();
  const [showDescription, setShowDescription] = useState(false);
  
  // Определяем ID периода: intro или period-1, period-2, period-3
  const periodId = periodNumber ? `period-${periodNumber}` : 'period-intro';
  const isIntroPeriod = periodId === 'period-intro';
  
  // Получаем данные уровня
  const levelData = getLevelData(programId || '', levelId || '');
  
  // Получаем цвет программы
  const program = programs.find(p => p.id === programId);
  const color = program?.color || '#6366f1';

  // Если данных нет - возвращаемся назад
  if (!levelData) {
    navigate(`/workouts/${programId}/${levelId}`);
    return null;
  }

  // Находим текущий период
  const currentPeriod = levelData.periods.find(p => p.id === periodId);
  
  if (!currentPeriod) {
    navigate(`/workouts/${programId}/${levelId}`);
    return null;
  }

  const isCompleted = currentPeriod.isCompleted || false;
  const progress = currentPeriod.progress || 0;
  const completedWorkouts = currentPeriod.completedWorkouts || 0;

  // Получаем историю завершенных тренировок для текущего периода
  const workoutHistory = getCompletedWorkoutsForPeriod(currentPeriod.workouts.map(w => w.id));
  
  // Определяем название периода для истории
  const periodName = isIntroPeriod 
    ? 'Подготовка' 
    : currentPeriod.name;
  
  // Добавляем названия тренировок и период в историю
  const enrichedHistory = workoutHistory.map(entry => {
    const workout = currentPeriod.workouts.find(w => w.id === entry.workoutId);
    return {
      ...entry,
      workoutName: workout?.name || 'Тренировка',
      periodName: periodName
    };
  });
  
  // Создаем структуру программы для компонента IntroWorkoutsList
  const mockProgram = {
    id: programId || 'program-1',
    name: program?.name || 'Программа',
    color: color,
    levels: [
      {
        id: levelId || 'level-1',
        name: 'Уровень 1',
        workouts: currentPeriod.workouts
      }
    ]
  };

  // Получаем заголовок и описание в зависимости от периода
  const getTitle = () => {
    if (isIntroPeriod) return 'Подготовка';
    return currentPeriod.name;
  };

  const getDescriptionTitle = () => {
    if (isIntroPeriod) return 'О подготовке';
    return `О ${currentPeriod.name.toLowerCase()}`;
  };

  const getDescription = () => {
    if (isIntroPeriod) {
      return 'Являются полноценными тренировками, выполняются однократно перед переходом к основным уровням. Необходимы для начальной подготовки организма к основной нагрузке.';
    }
    return currentPeriod.description;
  };

  return (
    <div className="bg-white">
      <Header
        title={getTitle()}
        leftAction={
          <button
            onClick={() => navigate(`/workouts/${programId}/${levelId}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
            aria-label="Назад"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        }
      />

      {/* Заголовок со статусом */}
      <IntroStatusHeader
        isCompleted={isCompleted}
        progress={progress}
        color={color}
      />

      {/* Сворачиваемый блок описания - только для вводных тренировок */}
      {isIntroPeriod && (
        <div className="px-4 mb-6">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900">{getDescriptionTitle()}</span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform ${
                showDescription ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Раскрывающийся контент */}
          {showDescription && (
            <div className="mt-3 bg-white rounded-2xl p-5 border-2 border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                {getDescription()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Список тренировок */}
      <div className={!isIntroPeriod ? 'mt-2' : ''}>
        <IntroWorkoutsList 
          program={mockProgram}
          currentLevel={0}
          completedWorkouts={completedWorkouts}
          history={enrichedHistory}
          onWorkoutClick={(workoutId) => {
            navigate(`/workout-session/${workoutId}`);
          }}
        />
      </div>
    </div>
  );
}