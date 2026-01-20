/**
 * IngredientSelector - Модальное окно выбора ингредиента
 */

import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Food } from '@/entities/food';

interface IngredientSelectorProps {
  foods: Food[];
  onSelect: (food: Food, amount: number) => void;
  onClose: () => void;
}

export function IngredientSelector({ foods, onSelect, onClose }: IngredientSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (food: Food) => {
    // Автоматически добавляем 100 единиц (г или мл)
    onSelect(food, 100);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-3xl border-4 border-black flex flex-col">
        {/* Шапка */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black">
          <h3 className="text-lg font-black uppercase">Выбрать продукт</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        {/* Поиск */}
        <div className="p-4 border-b-4 border-black">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={3} />
            <Input
              type="text"
              placeholder="Поиск продукта..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Список продуктов */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredFoods.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Продукты не найдены</p>
          ) : (
            <div className="space-y-2">
              {filteredFoods.map(food => (
                <button
                  key={food.id}
                  onClick={() => handleSelect(food)}
                  className="w-full text-left p-3 border-3 border-black bg-white hover:bg-[var(--brand-yellow)] transition-colors"
                >
                  <div className="font-bold text-sm">{food.name}</div>
                  {food.brand && (
                    <div className="text-xs text-gray-600">{food.brand}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}