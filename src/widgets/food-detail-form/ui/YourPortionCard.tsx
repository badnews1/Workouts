/**
 * YourPortionCard - Карточка с информацией о твоей порции
 * 
 * Отображает калории и БЖУ на выбранное количество
 */

interface YourPortionCardProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  unit: string;
}

export function YourPortionCard({ calories, protein, fat, carbs, unit }: YourPortionCardProps) {
  return (
    <div className="bg-[#ffda54] p-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
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
        <div className="bg-white p-4 border-4 border-black text-center">
          <div className="font-black text-3xl leading-none mb-1">
            {Math.round(protein)}
          </div>
          <div className="font-black text-xs uppercase">Белки</div>
        </div>

        {/* Жиры */}
        <div className="bg-white p-4 border-4 border-black text-center">
          <div className="font-black text-3xl leading-none mb-1">
            {Math.round(fat)}
          </div>
          <div className="font-black text-xs uppercase">Жиры</div>
        </div>

        {/* Углеводы */}
        <div className="bg-white p-4 border-4 border-black text-center">
          <div className="font-black text-3xl leading-none mb-1">
            {Math.round(carbs)}
          </div>
          <div className="font-black text-xs uppercase">Углеводы</div>
        </div>
      </div>
    </div>
  );
}