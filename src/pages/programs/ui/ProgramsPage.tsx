/**
 * ProgramsPage - Страница выбора программы тренировок
 * 
 * Отображает все доступные программы (Calisthenics, Gym, Home, Cardio) для выбора.
 * Позволяет переключаться между программами. Выбранная программа сохраняется в localStorage.
 * 
 * Роут: /programs
 * Навигация: Назад → /workouts (WorkoutsPage)
 */

import { useNavigate } from 'react-router';
import { Header, useLocalStorage } from '@/shared';
import { programs } from '@/entities/program';
import { ProgramCard } from '@/features/select-program';
import { Badge } from '@/components/ui/badge';

export function ProgramsPage() {
  const navigate = useNavigate();
  const [selectedProgramId, setSelectedProgramId] = useLocalStorage<string | null>('selectedProgramId', null);

  return (
    <div className="h-full bg-white">
      <Header 
        title="Программы"
        onBack={() => navigate('/workouts')}
      />
      <div className="px-4 py-6 pb-28">
        <Badge 
          size="md" 
          className="mb-6 bg-black text-[var(--brand-yellow)] uppercase tracking-tight"
        >
          Выбери свой путь
        </Badge>
        <div className="space-y-6">
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