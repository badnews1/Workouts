/**
 * QuickPortionSelector - Селектор размера порции с быстрыми кнопками
 * 
 * Позволяет выбрать стандартные размеры или ввести свое значение
 */

import { Minus, Plus } from 'lucide-react';

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
    <div className="bg-[#1a1a1a] p-4 border-4 border-black shadow-[8px_8px_0_0_#000]">
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
      <div className="bg-white border-4 border-black p-4 flex items-center gap-3">
        {/* Кнопка минус */}
        <button
          onClick={handleDecrement}
          className="w-12 h-12 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
        >
          <Minus className="w-6 h-6" strokeWidth={4} />
        </button>

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
        <button
          onClick={handleIncrement}
          className="w-12 h-12 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
        >
          <Plus className="w-6 h-6" strokeWidth={4} />
        </button>
      </div>
    </div>
  );
}
