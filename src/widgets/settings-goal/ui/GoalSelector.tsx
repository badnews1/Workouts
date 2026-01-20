/**
 * GoalSelector - Выбор цели пользователя
 * 
 * Компонент для выбора основной цели (набор/похудение/поддержание)
 */

import { GOAL_OPTIONS, type Goal } from '@/shared';
import { Card } from '@/components/ui/card';
import { IconBox } from '@/shared/ui/icon-box';

interface GoalSelectorProps {
  selectedGoal: Goal;
  onGoalChange: (goal: Goal) => void;
}

export function GoalSelector({ selectedGoal, onGoalChange }: GoalSelectorProps) {
  return (
    <>
      {GOAL_OPTIONS.map(goal => {
        const isSelected = selectedGoal === goal.id;
        const bgColor = goal.color === 'var(--brand-white)' ? 'var(--brand-white)' : goal.color;
        
        return (
          <button
            key={goal.id}
            onClick={() => onGoalChange(goal.id)}
            className="w-full"
          >
            <Card 
              className={`p-4 flex flex-row items-center gap-4 transition-all active:translate-x-1 active:translate-y-1 ${
                isSelected ? 'bg-gray-50' : ''
              }`}
              backgroundColor={isSelected ? '#f9fafb' : 'var(--brand-white)'}
            >
              <IconBox size="md" backgroundColor={bgColor}>
                <span className="text-2xl">{goal.emoji}</span>
              </IconBox>
              <div className="flex-1 text-left">
                <div className="font-black text-base">{goal.label}</div>
                <div className="text-sm font-medium text-gray-600">
                  {isSelected ? '✓ Выбрано' : 'Нажмите для выбора'}
                </div>
              </div>
              {isSelected && (
                <div className="w-6 h-6 border-2 border-black flex items-center justify-center" style={{ backgroundColor: 'var(--brand-green)' }}>
                  <span className="text-white text-xs font-black">✓</span>
                </div>
              )}
            </Card>
          </button>
        );
      })}
    </>
  );
}