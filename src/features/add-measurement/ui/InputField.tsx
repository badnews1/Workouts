/**
 * InputField - Поле ввода для замеров
 * 
 * Компонент для ввода числовых значений замеров с единицей измерения
 */

import { Input } from '@/components/ui/input';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
}

export function InputField({ label, value, onChange, unit }: InputFieldProps) {
  // Отключаем изменение значения колесом мыши
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  // Валидация введенного значения
  const handleChange = (newValue: string) => {
    // Разрешаем пустое значение для возможности очистки поля
    if (newValue === '') {
      onChange(newValue);
      return;
    }

    const numValue = parseFloat(newValue);
    
    // Блокируем отрицательные значения и ноль
    if (numValue <= 0) return;
    
    // Ограничиваем максимум 999
    if (numValue > 999) return;
    
    onChange(newValue);
  };

  return (
    <div>
      <div className="mb-2">
        <label className="text-xs font-black uppercase text-gray-700">{label}</label>
      </div>
      <Input
        type="number"
        inputMode="decimal"
        step="0.1"
        min="1"
        max="999"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onWheel={handleWheel}
        fontSize="xl"
        fontWeight="black"
        rightText={unit}
        placeholder="0"
        shadow={false}
      />
    </div>
  );
}
