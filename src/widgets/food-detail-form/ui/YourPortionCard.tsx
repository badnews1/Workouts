/**
 * YourPortionCard - Карточка с информацией о твоей порции
 * 
 * Отображает калории и БЖУ на выбранное количество
 */

import { Card } from '@/components/ui/card';

interface YourPortionCardProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  unit: string;
}

export function YourPortionCard({ calories, protein, fat, carbs, unit }: YourPortionCardProps) {
  return (
    <Card backgroundColor="#ffda54" size="xl" className="p-6">
      {/* Таб "Твоя порция" */}
      <div className="inline-block bg-black text-white px-4 py-2 font-black uppercase text-xs mb-4 border-4 border-black">
        Твоя порция
      </div>

      {/* Калории */}
      <div className="mb-6">
        <div className="font-black text-6xl leading-none mb-1">
          {Math.round(calories)}
        </div>
        <div className="font-black text-xl uppercase">ккал</div>
      </div>

      {/* БЖУ */}
      <div className="grid grid-cols-3 gap-3">
        {/* Белки */}
        <Card backgroundColor="white" className="p-4 text-center">
          <div className="font-black text-3xl leading-none mb-1">
            {Math.round(protein)}
          </div>
          <div className="font-black text-xs uppercase">Белки</div>
        </Card>

        {/* Жиры */}
        <Card backgroundColor="white" className="p-4 text-center">
          <div className="font-black text-3xl leading-none mb-1">
            {Math.round(fat)}
          </div>
          <div className="font-black text-xs uppercase">Жиры</div>
        </Card>

        {/* Углеводы */}
        <Card backgroundColor="white" className="p-4 text-center">
          <div className="font-black text-3xl leading-none mb-1">
            {Math.round(carbs)}
          </div>
          <div className="font-black text-xs uppercase">Углеводы</div>
        </Card>
      </div>
    </Card>
  );
}