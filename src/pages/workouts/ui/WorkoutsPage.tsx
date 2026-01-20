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

import { LayoutGrid } from 'lucide-react';
import { LevelsList, ProgressHeader } from '@/widgets/levels-list';
import { Header } from '@/shared';
import { useWorkoutsLogic } from '../model';

export function WorkoutsPage() {
  // Вся логика в хуке
  const {
    selectedProgram,
    levels,
    overallProgress,
    totalCompletedWorkouts,
    totalWorkoutsCount,
    handleLevelClick,
    handleProgramsClick,
  } = useWorkoutsLogic();

  // Вычисляем текущий уровень (первый незавершенный или последний завершенный)
  const currentLevel = levels.find(l => !l.isCompleted)?.level || levels.length;

  return (
    <div className="h-full bg-white">
      {/* Хедер с кнопкой выбора программы */}
      <Header 
        title="Тренировки"
        rightAction={
          <button
            onClick={handleProgramsClick}
            className="p-2"
            style={{
              backgroundColor: 'var(--brand-yellow)',
              border: '3px solid var(--brand-black)',
            }}
            aria-label="Программы"
          >
            <LayoutGrid className="w-5 h-5" style={{ color: 'var(--brand-black)' }} strokeWidth={3} />
          </button>
        }
      />

      {/* Хедер с прогрессом */}
      <div className="px-4 pt-4">
        <ProgressHeader
          programName={selectedProgram?.name || 'Выберите программу'}
          programDescription={selectedProgram?.description}
          currentLevel={currentLevel}
          totalLevels={8}
          completedWorkouts={totalCompletedWorkouts}
          totalWorkouts={totalWorkoutsCount}
          color={selectedProgram?.color || 'var(--brand-yellow)'}
        />
      </div>

      {/* Список уровней */}
      <div className="px-4 py-6 pb-28">
        <LevelsList levels={levels} onLevelClick={handleLevelClick} />
      </div>
    </div>
  );
}