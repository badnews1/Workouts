/**
 * QuickPortionSelector - Селектор размера порции с быстрыми кнопками
 * 
 * Позволяет выбрать стандартные размеры или ввести свое значение
 */

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickPortionSelectorProps {
  amount: string;
  unit: string;
  onAmountChange: (value: string) => void;
}

const QUICK_PORTIONS = [50, 100, 200, 250];

export function QuickPortionSelector({ amount, unit, onAmountChange }: QuickPortionSelectorProps) {
  const currentAmount = parseFloat(amount) || 0;

  const handleIncrement = () => {
    const newAmount = currentAmount + 10;
    onAmountChange(newAmount.toString());
  };

  const handleDecrement = () => {
    const newAmount = Math.max(0, currentAmount - 10);
    onAmountChange(newAmount.toString());
  };

  const handleQuickSelect = (value: number) => {
    onAmountChange(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем только цифры и пустую строку
    if (value === '' || /^\d+$/.test(value)) {
      onAmountChange(value);
    }
  };

  return (
    <Card backgroundColor="#1a1a1a" size="xl" className="p-4">
      {/* Заголовок и быстрые кнопки */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-white uppercase text-sm">Размер порции</h2>
        <div className="flex gap-2">
          {QUICK_PORTIONS.map((portion) => (
            <button
              key={portion}
              onClick={() => handleQuickSelect(portion)}
              className={`px-3 py-1 border-4 border-black font-black text-xs uppercase transition-all ${
                currentAmount === portion
                  ? 'bg-[#ffda54] text-black shadow-[2px_2px_0_0_#000]'
                  : 'bg-white text-black hover:bg-[#ffda54] shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5'
              }`}
            >
              {portion}{unit}
            </button>
          ))}
        </div>
      </div>

      {/* Инпут с кнопками +/- */}
      <Card backgroundColor="white" className="p-4 flex items-center gap-3">
        {/* Кнопка минус */}
        <Button
          onClick={handleDecrement}
          variant="outline"
          size="icon"
          shadow={false}
          className="shadow-[4px_4px_0_0_#000] active:shadow-none"
        >
          <Minus className="w-6 h-6" strokeWidth={4} />
        </Button>

        {/* Поле ввода */}
        <div className="flex-1 flex items-center justify-center">
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleInputChange}
            className="font-black text-5xl text-center w-full outline-none bg-transparent"
            placeholder="0"
          />
          <span className="font-black text-2xl text-gray-400 ml-2">{unit}</span>
        </div>

        {/* Кнопка плюс */}
        <Button
          onClick={handleIncrement}
          variant="outline"
          size="icon"
          shadow={false}
          className="shadow-[4px_4px_0_0_#000] active:shadow-none"
        >
          <Plus className="w-6 h-6" strokeWidth={4} />
        </Button>
      </Card>
    </Card>
  );
}