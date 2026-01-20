/**
 * SettingsWorkouts - Секция настроек тренировок
 * 
 * Навигация к программам и статистике
 */

import { Dumbbell, BarChart3 } from 'lucide-react';
import { SettingsSection, SettingsButton } from '@/shared';

interface SettingsWorkoutsProps {
  onNavigateToPrograms: () => void;
}

export function SettingsWorkouts({ onNavigateToPrograms }: SettingsWorkoutsProps) {
  return (
    <SettingsSection title="Тренировки">
      <SettingsButton
        icon={Dumbbell}
        title="Программа тренировок"
        description="Выбрать программу и уровень"
        iconBgColor="var(--brand-yellow)"
        onClick={onNavigateToPrograms}
      />
      
      <SettingsButton
        icon={BarChart3}
        title="Статистика"
        description="Просмотр прогресса"
        iconBgColor="var(--brand-green)"
        iconColor="var(--brand-white)"
      />
    </SettingsSection>
  );
}