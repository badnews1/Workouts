/**
 * bandOptions - Конфигурация опций резиновых петель
 */

export interface BandOption {
  value: string;
  color: string;
  label: string;
  textColor?: string;
}

export const BAND_OPTIONS: BandOption[] = [
  { value: 'yellow', color: '#ffda54', label: 'Жёлтая' },
  { value: 'red', color: '#EF4444', label: 'Красная' },
  { value: 'black', color: '#000000', label: 'Чёрная', textColor: '#fff' },
  { value: 'purple', color: '#A855F7', label: 'Фиолетовая' },
  { value: 'green', color: '#10B981', label: 'Зелёная' },
];
