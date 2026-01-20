/**
 * RecipeStepsSection - Секция с шагами приготовления
 */

import type { RecipeStep } from '@/entities/recipe';

interface RecipeStepsSectionProps {
  steps: RecipeStep[];
  checkedSteps: Set<string>;
  onToggleStep: (stepId: string) => void;
}

export function RecipeStepsSection({
  steps,
  checkedSteps,
  onToggleStep,
}: RecipeStepsSectionProps) {
  const completedCount = checkedSteps.size;
  const totalCount = steps.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="px-4 mb-6">
      {/* Таб с прогрессом */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-block bg-black text-[#ffda54] px-4 py-2 font-black uppercase text-xs border-4 border-black">
          Приготовление
        </div>
        <div className="font-black text-sm text-gray-500">
          {completedCount} / {totalCount}
        </div>
      </div>

      {/* Голубая карточка */}
      <div className="bg-[#93c5fd] border-4 border-black shadow-[8px_8px_0_0_#000]">
        {/* Заголовок с прогрессом */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black">
          <h3 className="font-black uppercase text-sm">Пошаговый рецепт</h3>
          <div className="font-black text-sm">{progressPercent}%</div>
        </div>

        {/* Список шагов */}
        <div className="p-4 space-y-3">
          {steps.map((step) => {
            const isChecked = checkedSteps.has(step.id);

            return (
              <div
                key={step.id}
                className="bg-white border-4 border-black p-4 flex items-center gap-3"
              >
                {/* Номер шага */}
                <div className="w-12 h-12 border-4 border-black bg-white flex items-center justify-center font-black text-xl flex-shrink-0">
                  {step.order}
                </div>

                {/* Описание */}
                <div className="flex-1">
                  <p className={`text-sm ${isChecked ? 'line-through opacity-50' : ''}`}>
                    {step.description}
                  </p>
                </div>

                {/* Чекбокс */}
                <button
                  onClick={() => onToggleStep(step.id)}
                  className={`w-10 h-10 border-4 border-black flex-shrink-0 transition-all ${
                    isChecked ? 'bg-black' : 'bg-white'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}