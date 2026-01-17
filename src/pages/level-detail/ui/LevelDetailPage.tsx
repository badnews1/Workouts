/**
 * LevelDetailPage - Страница детализации уровня
 * 
 * Показывает информацию о конкретном уровне сложности (например, Уровень 1 в программе Calisthenics).
 * Отображает общий прогресс по уровню, начальные требования и список всех периодов (period-0, period-1, period-2, period-3).
 * 
 * Роут: /workouts/:programId/:levelId
 * Навигация: 
 *   - Назад → /workouts (WorkoutsPage)
 *   - Клик на период → /workouts/:programId/:levelId/intro (PeriodDetailPage)
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronDown, Info } from 'lucide-react';
import { Header } from '../../../shared/ui/header';
import { getLevelData } from '../../../entities/workout';
import { programs } from '../../../entities/program';
import { LevelProgressHeader } from '../../../widgets/level-progress-header';
import { PeriodsList } from '../../../widgets/periods-list';
import { IntroWorkoutHistory } from '../../../widgets/intro-workouts-list/ui/IntroWorkoutHistory';

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

// Тип для истории тренировок
interface WorkoutHistoryEntry {
  workoutId: string;
  workoutName: string;
  periodName: string;
  completedDates: string[];
  totalTime?: number;
}

// Получить историю всех завершенных тренировок по всем периодам
function getAllCompletedWorkouts(levelData: any): WorkoutHistoryEntry[] {
  const completed: WorkoutHistoryEntry[] = [];

  // Проходим по всем периодам
  levelData.periods.forEach((period: any, periodIndex: number) => {
    // Определяем название периода
    const isIntroPeriod = period.id === 'period-intro';
    const periodName = isIntroPeriod 
      ? 'Подготовка' 
      : `Период ${periodIndex}`;

    // Проходим по всем тренировкам в периоде
    period.workouts.forEach((workout: any) => {
      const state = loadWorkoutState(workout.id);
      if (state && state.isCompleted && state.completionDate) {
        completed.push({
          workoutId: state.workoutId,
          workoutName: workout.name,
          periodName: periodName,
          completedDates: [state.completionDate],
          totalTime: state.totalTime
        });
      }
    });
  });

  // Сортируем по дате (старые первые - хронологический порядок)
  completed.sort((a, b) => {
    const dateA = new Date(a.completedDates[0]).getTime();
    const dateB = new Date(b.completedDates[0]).getTime();
    return dateA - dateB;
  });

  return completed;
}

export function LevelDetailPage() {
  const navigate = useNavigate();
  const { programId, levelId } = useParams();
  const [showDescription, setShowDescription] = useState(false);
  
  // Получаем данные уровня по ID
  const levelData = getLevelData(programId || '', levelId || '');

  // Получаем цвет программы
  const program = programs.find(p => p.id === programId);
  const color = program?.color || '#6366f1';

  // Если данных нет - показываем заглушку
  if (!levelData) {
    return (
      <div className="bg-white">
        <Header
          title={`Уровень ${levelId}`}
          leftAction={
            <button
              onClick={() => navigate(`/workouts`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
              aria-label="Назад"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          }
        />
        <div className="flex flex-col items-center justify-center px-4 py-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            В разработке
          </h2>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            Программа для этого уровня находится в разработке и скоро будет доступна
          </p>
        </div>
      </div>
    );
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
  const displayPeriodNumber = isIntroPeriod ? 0 : currentPeriodIndex; // для основных периодов: 1, 2, 3
  const displayTotalPeriods = totalPeriods - 1; // исключаем вводный период (4 - 1 = 3)

  // Получаем историю всех завершенных тренировок
  const workoutHistory = getAllCompletedWorkouts(levelData);

  return (
    <div className="bg-white">
      <Header
        title={levelData.name}
        leftAction={
          <button
            onClick={() => navigate(`/workouts`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
            aria-label="Назад"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        }
      />

      {/* Заголовок с прогрессом */}
      <LevelProgressHeader
        currentPeriod={displayPeriodNumber}
        totalPeriods={displayTotalPeriods}
        progress={levelData.totalProgress || 0}
        currentDay={currentPeriod?.currentDay}
        completedWorkouts={levelData.totalCompletedWorkouts}
        totalWorkouts={levelData.totalWorkoutsCount}
        color={color}
        isIntroPeriod={isIntroPeriod}
      />

      {/* Сворачиваемый блок описания */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="w-full bg-gray-50 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">О программе уровня</span>
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
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {levelData.description}
            </p>
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Начальные требования:
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• Подтягивания: {levelData.requirements.pullups}</div>
                <div>• Отжимания: {levelData.requirements.pushups}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Список периодов */}
      <PeriodsList 
        periods={levelData.periods}
        color={color}
        onPeriodClick={(periodId) => {
          // Если это вводные тренировки - переходим на /intro
          if (periodId === 'period-intro') {
            navigate(`/workouts/${programId}/${levelId}/intro`);
          } else {
            // Для остальных периодов извлекаем номер (period-1 → 1, period-2 → 2, etc.)
            const periodNumber = periodId.replace('period-', '');
            navigate(`/workouts/${programId}/${levelId}/period/${periodNumber}`);
          }
        }}
      />

      {/* История всех тренировок */}
      <IntroWorkoutHistory history={workoutHistory} />
    </div>
  );
}