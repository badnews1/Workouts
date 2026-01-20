/**
 * Вспомогательные функции для работы с замерами
 */

import type { Goal } from '@/shared/model';

/**
 * Определяет цвет фона для замера на основе изменения и цели
 */
export function getMeasurementColor(
  current: number | undefined,
  previous: number | undefined,
  param: string,
  goal: Goal
): { bg: string; textColor: string } {
  // Если нет текущего замера - белый
  if (current === undefined) {
    return { bg: 'var(--brand-white)', textColor: 'var(--brand-black)' };
  }

  // Если нет предыдущего замера - белый
  if (previous === undefined) {
    return { bg: 'var(--brand-white)', textColor: 'var(--brand-black)' };
  }

  const diff = current - previous;
  const isIncrease = diff > 0;

  // Без изменений - белый
  if (diff === 0) {
    return { bg: 'var(--brand-white)', textColor: 'var(--brand-black)' };
  }

  // Набор мышечной массы: увеличение - хорошо (зеленый), уменьшение - плохо (красный)
  // Применяется ко всем параметрам одинаково
  if (goal === 'muscle_gain') {
    if (isIncrease) {
      return { bg: 'var(--brand-green)', textColor: 'var(--brand-white)' };
    } else {
      return { bg: 'var(--brand-red)', textColor: 'var(--brand-white)' };
    }
  }

  // Похудение: для веса/талии уменьшение - хорошо, для мышц - плохо
  if (goal === 'weight_loss') {
    // Вес и талия: уменьшение = хорошо (зеленый)
    if (param === 'weight' || param === 'waist') {
      if (isIncrease) {
        return { bg: 'var(--brand-red)', textColor: 'var(--brand-white)' };
      } else {
        return { bg: 'var(--brand-green)', textColor: 'var(--brand-white)' };
      }
    }
    
    // Мышцы (грудь, бицепс, икры, бедра): увеличение = хорошо (зеленый)
    // т.к. при похудении нужно сохранить/набрать мышечную массу
    if (param === 'chest' || param === 'biceps' || param === 'calves' || param === 'hips') {
      if (isIncrease) {
        return { bg: 'var(--brand-green)', textColor: 'var(--brand-white)' };
      } else {
        return { bg: 'var(--brand-red)', textColor: 'var(--brand-white)' };
      }
    }
  }

  // Поддержание формы: любое изменение = желтый
  if (goal === 'maintain') {
    return { bg: 'var(--brand-yellow)', textColor: 'var(--brand-black)' };
  }

  return { bg: 'var(--brand-white)', textColor: 'var(--brand-black)' };
}

/**
 * Рассчитывает прогресс к целевому весу
 */
export function calculateWeightProgress(
  measurements: Array<{ weight?: number }>,
  targetWeight: number | null
): { progress: number; remaining: number; isCompleted: boolean } | null {
  // Если нет целевого веса или замеров - возвращаем null
  if (!targetWeight || measurements.length === 0) {
    return null;
  }

  // Получаем текущий вес из последнего замера
  const currentWeight = measurements[0]?.weight;
  if (!currentWeight) {
    return null;
  }

  // Вычисляем сколько осталось до цели
  const remaining = Math.abs(currentWeight - targetWeight);
  
  // Если уже достигли цели
  if (remaining === 0) {
    return {
      progress: 100,
      remaining: 0,
      isCompleted: true,
    };
  }

  // Получаем начальный вес (самый старый замер с весом)
  let startWeight = currentWeight;
  for (let i = measurements.length - 1; i >= 0; i--) {
    if (measurements[i]?.weight) {
      startWeight = measurements[i].weight!;
      break;
    }
  }

  // Общая дистанция от старта до цели
  const totalDistance = Math.abs(startWeight - targetWeight);
  
  // Если дистанция 0 (старт = цель) - 100%
  if (totalDistance === 0) {
    return {
      progress: 100,
      remaining: 0,
      isCompleted: true,
    };
  }

  // Пройденная дистанция
  const coveredDistance = Math.abs(startWeight - currentWeight);
  
  // Прогресс в процентах
  const progress = Math.min(100, Math.round((coveredDistance / totalDistance) * 100));

  return {
    progress,
    remaining: parseFloat(remaining.toFixed(1)),
    isCompleted: progress >= 100,
  };
}
