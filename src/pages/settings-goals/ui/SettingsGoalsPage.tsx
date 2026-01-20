/**
 * SettingsGoalsPage - Страница настройки целей
 * 
 * Включает выбор основной цели (набор/похудение/поддержание),
 * установку целевого веса и целей по КБЖУ.
 * 
 * Роут: /settings/goals
 */

import { useNavigate } from 'react-router';
import { toast } from 'sonner@2.0.3';
import { Header, SettingsSection, type Goal } from '@/shared';
import { useUserGoal } from '@/entities/user-goal';
import { useNutritionGoals } from '@/entities/food';
import { GoalSelector, WeightGoalForm } from '@/widgets/settings-goal';
import { SettingsNutrition } from '@/widgets/settings-nutrition';
import { useWeightGoalForm } from '../model/useWeightGoalForm';
import { useNutritionGoalsForm } from '../model/useNutritionGoalsForm';

export function SettingsGoalsPage() {
  const navigate = useNavigate();
  
  // Используем хуки из entities
  const { goalData, updateGoal, updateWeightGoal } = useUserGoal();
  const { goals: nutritionGoalsData, updateGoals: updateNutritionGoals } = useNutritionGoals();
  
  // Хук для формы целевого веса
  const weightGoalForm = useWeightGoalForm({
    initialWeight: goalData.targetWeight,
    initialDate: goalData.targetDate || '',
    onSave: updateWeightGoal,
  });
  
  // Хук для формы целей по питанию
  const nutritionForm = useNutritionGoalsForm({
    initialGoals: nutritionGoalsData,
    onSave: updateNutritionGoals,
  });

  const handleGoalChange = (goal: Goal) => {
    updateGoal(goal);
    toast.success('Цель сохранена');
  };

  return (
    <div className="h-full bg-white">
      <Header title="Настройка целей" onBack={() => navigate(-1)} />
      
      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Основная цель */}
        <SettingsSection title="Основная цель">
          <div className="space-y-3">
            <GoalSelector
              selectedGoal={goalData.goal}
              onGoalChange={handleGoalChange}
            />
          </div>
        </SettingsSection>

        {/* Целевой вес */}
        <SettingsSection title="Целевой вес">
          <WeightGoalForm
            targetWeight={weightGoalForm.targetWeight}
            targetDate={weightGoalForm.targetDate}
            onWeightChange={weightGoalForm.setTargetWeight}
            onDateChange={weightGoalForm.setTargetDate}
            onSave={weightGoalForm.handleSave}
          />
        </SettingsSection>

        {/* Питание */}
        <SettingsNutrition
          goals={nutritionForm.nutritionGoals}
          onUpdateGoal={nutritionForm.updateGoal}
          onSave={nutritionForm.handleSave}
        />
      </div>
    </div>
  );
}