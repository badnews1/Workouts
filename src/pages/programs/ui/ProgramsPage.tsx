/**
 * ProgramsPage - Страница выбора программы тренировок
 * 
 * Отображает все доступные программы (Calisthenics, Gym, Home, Cardio) для выбора.
 * Позволяет переключаться между программами. Выбранная программа сохраняется в localStorage.
 * 
 * Роут: /programs
 * Навигация: Назад → /workouts (WorkoutsPage)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Header } from '../../../shared/ui/header';
import { programs } from '../../../entities/program';
import { ProgramCard } from '../../../features/select-program';
import { useLocalStorage } from '../../../shared/lib/hooks';

export function ProgramsPage() {
  const navigate = useNavigate();
  const [selectedProgramId, setSelectedProgramId] = useLocalStorage<string | null>('selectedProgramId', null);

  return (
    <div className="h-full bg-white">
      <Header 
        title="Программы"
        leftAction={
          <button
            onClick={() => navigate('/workouts')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
            aria-label="Назад"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        }
      />
      <div className="px-4 py-6">
        <div className="space-y-4">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isSelected={selectedProgramId === program.id}
              onSelect={() => setSelectedProgramId(program.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}