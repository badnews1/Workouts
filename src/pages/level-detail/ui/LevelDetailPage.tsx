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

import { useParams } from 'react-router';
import { Header } from '@/shared';
import { LevelProgressHeader } from '@/widgets/level-progress-header';
import { LevelDescription } from '@/widgets/level-description';
import { PeriodsList } from '@/widgets/periods-list';
import { IntroWorkoutHistory } from '@/widgets/intro-workouts-list';
import { useLevelLogic } from '../model/useLevelLogic';

export function LevelDetailPage() {
  const { programId, levelId } = useParams();
  
  // Вся логика в хуке
  const {
    levelData,
    color,
    workoutHistory,
    displayData,
    handleBack,
    handlePeriodClick,
  } = useLevelLogic({
    programId: programId || '',
    levelId: levelId || '',
  });

  // Если данных нет - показываем заглушку
  if (!levelData) {
    return (
      <div className="bg-white">
        <Header
          title={`Уровень ${levelId}`}
          onBack={handleBack}
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

  return (
    <div className="bg-white">
      <Header
        title={levelData.name}
        onBack={handleBack}
      />

      {/* Заголовок с прогрессом */}
      {displayData && (
        <LevelProgressHeader
          currentPeriod={displayData.currentPeriod}
          totalPeriods={displayData.totalPeriods}
          progress={displayData.progress}
          currentDay={displayData.currentDay}
          completedWorkouts={displayData.completedWorkouts}
          totalWorkouts={displayData.totalWorkouts}
          color={color}
          isIntroPeriod={displayData.isIntroPeriod}
        />
      )}

      {/* Сворачиваемый блок описания */}
      <LevelDescription
        description={levelData.description}
        requirements={levelData.requirements}
      />

      {/* Список периодов */}
      <div className="px-4 mt-12 pb-28">
        <PeriodsList 
          periods={levelData.periods}
          color={color}
          onPeriodClick={handlePeriodClick}
        />
      </div>

      {/* История всех тренировок */}
      <IntroWorkoutHistory history={workoutHistory} />
    </div>
  );
}