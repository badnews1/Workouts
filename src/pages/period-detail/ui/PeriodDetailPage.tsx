/**
 * PeriodDetailPage - Страница детализации периода
 * 
 * Отображает детальную информацию о конкретном периоде (например, Период 1).
 * Показывает список дней, прогресс, цель периода, количество тренировок в неделю.
 * 
 * Роут: /workouts/:programId/:levelId/period/:periodNumber
 * Навигация:
 *   - Назад → /workouts/:programId/:levelId (LevelDetailPage)
 *   - Клик на тренировку → /workout-session/:workoutId (WorkoutSessionPage)
 */

import { useNavigate, useParams } from 'react-router';
import { Info } from 'lucide-react';
import { Header } from '@/shared';
import { getLevelData } from '@/entities/workout';
import { programs } from '@/entities/program';
import { loadWorkoutState, type SavedWorkoutState } from '@/entities/workout-session';
import { IntroStatusHeader } from '@/widgets/intro-status-header';
import { IntroWorkoutsList } from '@/widgets/intro-workouts-list';
import { ExpandableInfo } from '@/shared/ui/expandable-info';

export function PeriodDetailPage() {
  const navigate = useNavigate();
  const { programId, levelId, periodNumber } = useParams();
  
  // Определяем ID периода: intro или period-1, period-2, period-3
  const periodId = periodNumber ? `period-${periodNumber}` : 'period-intro';
  const isIntroPeriod = periodId === 'period-intro';
  
  // Получаем данные уровня
  const levelData = getLevelData(programId || '', levelId || '');
  
  // Получаем цвет программы
  const program = programs.find(p => p.id === programId);
  const color = program?.color || 'var(--brand-blue)';

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
  const workoutHistory = currentPeriod.workouts
    .map(workout => {
      const state = loadWorkoutState(workout.id) as SavedWorkoutState | null;
      if (state && state.isCompleted && state.completionDate) {
        return {
          workoutId: state.workoutId,
          workoutName: workout.name,
          periodName: isIntroPeriod ? 'Подготовка' : currentPeriod.name,
          completedDates: [state.completionDate],
          totalTime: state.totalTime,
        };
      }
      return null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  
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
        onBack={() => navigate(`/workouts/${programId}/${levelId}`)}
      />

      {/* Заголовок со статусом */}
      <IntroStatusHeader
        isCompleted={isCompleted}
        progress={progress}
        color={color}
        completedWorkouts={completedWorkouts}
        totalWorkouts={currentPeriod.workouts.length}
      />

      {/* Сворачиваемый блок описания - только для вводных тренировок */}
      {isIntroPeriod && (
        <ExpandableInfo
          title={getDescriptionTitle()}
          icon={<Info className="w-5 h-5 text-black" strokeWidth={2.5} />}
          iconColor="var(--brand-blue)"
        >
          <p className="text-sm font-bold leading-relaxed text-gray-800">
            {getDescription()}
          </p>
        </ExpandableInfo>
      )}

      {/* Список тренировок */}
      <div className={!isIntroPeriod ? 'mt-2' : ''}>
        <IntroWorkoutsList 
          program={mockProgram}
          currentLevel={0}
          completedWorkouts={completedWorkouts}
          history={workoutHistory}
          onWorkoutClick={(workoutId) => {
            navigate(`/workout-session/${workoutId}`);
          }}
        />
      </div>
    </div>
  );
}