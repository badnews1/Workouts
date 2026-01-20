/**
 * StepsSection - Секция шагов приготовления
 * 
 * Позволяет добавлять, редактировать, удалять и менять порядок шагов
 */

import { Plus, X, ChevronUp, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { RecipeStep } from '@/entities/recipe';

interface StepsSectionProps {
  steps: RecipeStep[];
  onAddStep: (description: string) => void;
  onRemoveStep: (stepId: string) => void;
  onUpdateStep: (stepId: string, description: string) => void;
  onMoveStepUp: (stepId: string) => void;
  onMoveStepDown: (stepId: string) => void;
}

export function StepsSection({
  steps,
  onAddStep,
  onRemoveStep,
  onUpdateStep,
  onMoveStepUp,
  onMoveStepDown,
}: StepsSectionProps) {
  const handleAddPhoto = (stepId: string) => {
    // TODO: Реализовать загрузку фото для шага
    console.log('Add photo for step:', stepId);
  };

  return (
    <div>
      {/* Таб "ШАГИ ПРИГОТОВЛЕНИЯ" */}
      <div className="inline-block bg-black text-[#ffda54] px-4 py-2 font-black uppercase text-xs mb-4 border-4 border-black">
        Шаги приготовления
      </div>

      {/* Голубая карточка */}
      <div className="bg-[#93c5fd] p-4 border-4 border-black shadow-[8px_8px_0_0_#000]">
        {/* Заголовок с бейджем */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black uppercase text-sm">Пошаговый рецепт</h3>
          <div className="bg-black text-white w-8 h-8 border-4 border-black flex items-center justify-center font-black text-sm">
            {steps.length}
          </div>
        </div>

        {/* Список шагов */}
        {steps.length === 0 ? (
          <p className="text-sm text-center py-4 font-bold opacity-70">
            Добавьте шаги приготовления
          </p>
        ) : (
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="bg-white p-4 border-4 border-black"
              >
                <div className="flex gap-3">
                  {/* Номер шага */}
                  <div className="w-12 h-12 bg-black text-white border-4 border-black flex items-center justify-center font-black text-xl flex-shrink-0">
                    {step.order}
                  </div>

                  {/* Текст шага */}
                  <div className="flex-1">
                    <Textarea
                      value={step.description}
                      onChange={(e) => onUpdateStep(step.id, e.target.value)}
                      placeholder={`Опишите шаг ${step.order}...`}
                      rows={3}
                      className="border-4 border-black resize-none mb-3"
                    />

                    {/* Кнопка добавления фото */}
                    <button
                      onClick={() => handleAddPhoto(step.id)}
                      className="px-4 py-2 border-4 border-black bg-white font-black uppercase text-xs shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" strokeWidth={3} />
                      Добавить фото
                    </button>
                  </div>

                  {/* Кнопки управления */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {/* Вверх */}
                    <button
                      onClick={() => onMoveStepUp(step.id)}
                      disabled={index === 0}
                      className="w-10 h-10 bg-white border-4 border-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="w-5 h-5" strokeWidth={3} />
                    </button>

                    {/* Вниз */}
                    <button
                      onClick={() => onMoveStepDown(step.id)}
                      disabled={index === steps.length - 1}
                      className="w-10 h-10 bg-white border-4 border-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="w-5 h-5" strokeWidth={3} />
                    </button>

                    {/* Удалить */}
                    <button
                      onClick={() => onRemoveStep(step.id)}
                      className="w-10 h-10 bg-white border-4 border-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center"
                    >
                      <X className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Кнопка добавления шага */}
        <button
          onClick={() => onAddStep('')}
          className="w-full mt-4 py-3 border-4 border-black bg-white font-black uppercase text-sm shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          Добавить шаг
        </button>
      </div>
    </div>
  );
}
