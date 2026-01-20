/**
 * MeasurementsPage - Страница замеров
 * 
 * Отображает текущие замеры тела пользователя с визуализацией изменений
 */

import { Plus } from 'lucide-react';
import { Weight } from 'lucide-react';
import { Header } from '@/shared';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Empty, EmptyIcon, EmptyTitle } from '@/components/ui/empty';
import { MeasurementForm } from '@/widgets/measurement-form';
import { MeasurementHistory } from '@/widgets/measurement-history';
import { WeightGoalProgress } from '@/widgets/weight-goal-progress';
import { CurrentMeasurements } from '@/widgets/current-measurements';
import { useMeasurements } from '@/entities/measurement';
import { useUserGoal } from '@/entities/user-goal';
import { useMeasurementForm, calculateWeightProgress, getMeasurementColor } from '../model';

export function MeasurementsPage() {
  const { measurements, deleteMeasurement, addMeasurement, updateMeasurement } = useMeasurements();
  const { goalData } = useUserGoal();
  
  // Логика формы
  const {
    isAdding,
    isEditing,
    formData,
    updateField,
    handleSave,
    handleCancel,
    openForm,
    openEditForm,
  } = useMeasurementForm(addMeasurement, updateMeasurement);

  // Обработчик удаления замера
  const handleDelete = (id: string) => {
    if (confirm('Удалить этот замер?')) {
      deleteMeasurement(id);
    }
  };

  // Прогресс к целевому весу
  const weightProgress = calculateWeightProgress(measurements, goalData.targetWeight);
  
  // Дни до дедлайна
  const daysRemaining = goalData.deadline
    ? Math.ceil((new Date(goalData.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="h-full bg-white">
      <Header title="Замеры" />
      
      <div className="px-4 py-6 pb-24">
        {/* Блок прогресса к цели */}
        {weightProgress && goalData.targetWeight && (
          <WeightGoalProgress
            targetWeight={goalData.targetWeight}
            progress={weightProgress.progress}
            remaining={weightProgress.remaining}
            isCompleted={weightProgress.isCompleted}
            daysRemaining={daysRemaining}
            goal={goalData.goal}
          />
        )}
        
        {/* Текущие параметры */}
        {measurements.length > 0 && (
          <CurrentMeasurements
            currentMeasurement={measurements[0]}
            previousMeasurement={measurements[1]}
            goal={goalData.goal}
            getMeasurementColor={getMeasurementColor}
          />
        )}

        {/* Кнопка добавить замер */}
        {!isAdding && (
          <Button
            onClick={openForm}
            variant="secondary"
            className="w-full mb-6 uppercase"
            size="default"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            Добавить замер
          </Button>
        )}

        {/* Форма добавления/редактирования замера */}
        {isAdding && (
          <MeasurementForm
            formData={formData}
            onUpdateField={updateField}
            onSave={handleSave}
            onCancel={handleCancel}
            isEditing={isEditing}
          />
        )}

        {/* История замеров */}
        <MeasurementHistory 
          measurements={measurements} 
          onDelete={handleDelete} 
          onEdit={openEditForm} 
        />

        {/* Пустое состояние */}
        {measurements.length === 0 && !isAdding && (
          <Card className="bg-gray-50">
            <Empty>
              <EmptyIcon variant="iconbox">
                <Weight className="w-8 h-8" strokeWidth={3} />
              </EmptyIcon>
              <EmptyTitle>Пока нет сохраненных замеров</EmptyTitle>
            </Empty>
          </Card>
        )}
      </div>
    </div>
  );
}
