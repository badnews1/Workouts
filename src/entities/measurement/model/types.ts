/**
 * Типы для замеров тела
 */

/**
 * Замер тела пользователя
 */
export interface Measurement {
  /** ID замера */
  id: string;
  /** Дата замера */
  date: string;
  /** Вес (кг) */
  weight: number;
  /** Обхват бицепса (см) */
  biceps: number;
  /** Обхват предплечья (см) */
  forearm: number;
  /** Обхват плеч (см) */
  shoulders: number;
  /** Обхват груди (см) */
  chest: number;
  /** Обхват талии (см) */
  waist: number;
  /** Обхват ягодиц (см) */
  glutes: number;
  /** Обхват бедер (см) */
  hips: number;
  /** Обхват икр (см) */
  calves: number;
}