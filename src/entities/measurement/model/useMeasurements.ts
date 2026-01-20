/**
 * Хук для работы с замерами тела
 */

import { useLocalStorage } from '@/shared/lib/hooks';
import { generateId } from '@/shared/lib/utils';
import type { Measurement } from './types';

const STORAGE_KEY = 'measurementsHistory';

/**
 * Сортировка замеров по дате (новые первыми)
 */
const sortMeasurementsByDate = (measurements: Measurement[]): Measurement[] => {
  return [...measurements].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Хук для управления историей замеров
 */
export function useMeasurements() {
  const [storedMeasurements, setStoredMeasurements] = useLocalStorage<Measurement[]>(STORAGE_KEY, []);
  
  // Всегда держим measurements отсортированными
  const measurements = sortMeasurementsByDate(storedMeasurements);

  /**
   * Добавить новый замер
   */
  const addMeasurement = (measurement: Omit<Measurement, 'id'>) => {
    const newMeasurement: Measurement = {
      ...measurement,
      id: generateId(),
    };

    // Добавляем новый замер
    setStoredMeasurements([newMeasurement, ...storedMeasurements]);

    return newMeasurement;
  };

  /**
   * Обновить существующий замер
   */
  const updateMeasurement = (id: string, updatedData: Omit<Measurement, 'id'>) => {
    const updated = storedMeasurements.map((m) =>
      m.id === id ? { ...updatedData, id } : m
    );
    setStoredMeasurements(updated);
  };

  /**
   * Удалить замер
   */
  const deleteMeasurement = (id: string) => {
    setStoredMeasurements(storedMeasurements.filter((m) => m.id !== id));
  };

  /**
   * Получить последний замер (по дате)
   */
  const getLatest = (): Measurement | undefined => {
    return measurements[0];
  };

  /**
   * Получить изменение веса (последний - предыдущий)
   */
  const getWeightChange = (): number | null => {
    if (measurements.length < 2) return null;
    const latest = measurements[0].weight;
    const previous = measurements[1].weight;
    return latest - previous;
  };

  return {
    measurements,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement,
    getLatest,
    getWeightChange,
  };
}