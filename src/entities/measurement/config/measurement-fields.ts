/**
 * Конфигурация полей замеров
 * 
 * Определяет список всех полей замеров с метаданными
 */

export interface MeasurementFieldConfig {
  type: 'weight' | 'biceps' | 'forearm' | 'shoulders' | 'chest' | 'waist' | 'glutes' | 'hips' | 'calves';
  label: string;
  unit: string;
}

/**
 * Список всех полей замеров в порядке отображения
 */
export const MEASUREMENT_FIELDS: MeasurementFieldConfig[] = [
  { type: 'weight', label: 'Вес', unit: 'кг' },
  { type: 'biceps', label: 'Бицепс', unit: 'см' },
  { type: 'forearm', label: 'Предплечье', unit: 'см' },
  { type: 'shoulders', label: 'Плечи', unit: 'см' },
  { type: 'chest', label: 'Грудь', unit: 'см' },
  { type: 'waist', label: 'Талия', unit: 'см' },
  { type: 'glutes', label: 'Ягодицы', unit: 'см' },
  { type: 'hips', label: 'Бедра', unit: 'см' },
  { type: 'calves', label: 'Икры', unit: 'см' },
];
