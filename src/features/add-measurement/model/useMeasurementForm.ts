/**
 * useMeasurementForm - Хук управления формой замеров
 * 
 * Управляет состоянием формы, валидацией и сохранением замеров тела
 */

import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { parseNumericFields, getTodayDateKey } from '@/shared/lib/utils';
import type { Measurement } from '@/entities/measurement';
import type { MeasurementFormData } from './types';

const INITIAL_FORM_DATA: MeasurementFormData = {
  date: getTodayDateKey(), // Текущая дата в формате YYYY-MM-DD
  weight: '',
  biceps: '',
  forearm: '',
  shoulders: '',
  chest: '',
  waist: '',
  glutes: '',
  hips: '',
  calves: '',
};

/**
 * Конвертирует Measurement в MeasurementFormData для редактирования
 */
const measurementToFormData = (measurement: Measurement): MeasurementFormData => ({
  date: measurement.date.split('T')[0],
  weight: measurement.weight.toString(),
  biceps: measurement.biceps.toString(),
  forearm: measurement.forearm.toString(),
  shoulders: measurement.shoulders.toString(),
  chest: measurement.chest.toString(),
  waist: measurement.waist.toString(),
  glutes: measurement.glutes.toString(),
  hips: measurement.hips.toString(),
  calves: measurement.calves.toString(),
});

export function useMeasurementForm(
  addMeasurement: (measurement: Omit<Measurement, 'id'>) => Measurement,
  updateMeasurement: (id: string, measurement: Omit<Measurement, 'id'>) => void
) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MeasurementFormData>(INITIAL_FORM_DATA);

  // Обновление отдельного поля
  const updateField = (field: keyof MeasurementFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Валидация формы
  const validateForm = (): boolean => {
    // Проверка даты
    if (!formData.date) {
      toast.error('Выберите дату замера');
      return false;
    }
    
    // Проверка пустых полей (кроме даты)
    const numericFields = Object.entries(formData).filter(([key]) => key !== 'date');
    const hasEmptyFields = numericFields.some(([_, value]) => !value);
    
    if (hasEmptyFields) {
      toast.error('Заполните все поля');
      return false;
    }
    
    // Проверка диапазона значений (1-999)
    const invalidFields = numericFields.filter(([_, value]) => {
      const numValue = parseFloat(value);
      return numValue < 1 || numValue > 999;
    });
    
    if (invalidFields.length > 0) {
      toast.error('Все значения должны быть от 1 до 999');
      return false;
    }
    
    return true;
  };

  // Сброс формы
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingId(null);
  };

  // Сохранение замера
  const handleSave = () => {
    if (!validateForm()) return;

    const numericFields = parseNumericFields({
      weight: formData.weight,
      biceps: formData.biceps,
      forearm: formData.forearm,
      shoulders: formData.shoulders,
      chest: formData.chest,
      waist: formData.waist,
      glutes: formData.glutes,
      hips: formData.hips,
      calves: formData.calves,
    });

    const measurementData = {
      date: formData.date,
      ...numericFields,
    };

    if (editingId) {
      // Редактирование существующего замера
      updateMeasurement(editingId, measurementData);
      toast.success('Замер обновлен');
    } else {
      // Добавление нового замера
      addMeasurement(measurementData);
      toast.success('Замер сохранен');
    }
    
    resetForm();
    setIsAdding(false);
  };

  // Отмена добавления/редактирования
  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
  };

  // Открытие формы для добавления нового замера
  const openForm = () => {
    resetForm();
    setIsAdding(true);
  };

  // Открытие формы для редактирования замера
  const openEditForm = (measurement: Measurement) => {
    setFormData(measurementToFormData(measurement));
    setEditingId(measurement.id);
    setIsAdding(true);
  };

  return {
    isAdding,
    isEditing: !!editingId,
    formData,
    updateField,
    handleSave,
    handleCancel,
    openForm,
    openEditForm,
  };
}
