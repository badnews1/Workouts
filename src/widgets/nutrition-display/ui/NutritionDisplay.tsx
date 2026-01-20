/**
 * NutritionDisplay - Карточка отображения пищевой ценности
 * 
 * Универсальная карточка для отображения калорий и БЖУ
 */

interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface NutritionDisplayProps {
  nutrition: NutritionData;
  bgColor?: string;
}

export function NutritionDisplay({ 
  nutrition,
  bgColor = 'var(--brand-yellow)'
}: NutritionDisplayProps) {
  return (
    <div 
      className="border-4 border-black p-6"
      style={{ 
        backgroundColor: bgColor,
        boxShadow: '6px 6px 0px var(--brand-black)' 
      }}
    >
      <div className="mb-6">
        <div className="font-black text-4xl">{nutrition.calories} ккал</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="font-bold text-gray-600 text-sm uppercase mb-2">Белки</div>
          <div className="font-black text-2xl">{nutrition.protein} г</div>
        </div>
        <div>
          <div className="font-bold text-gray-600 text-sm uppercase mb-2">Жиры</div>
          <div className="font-black text-2xl">{nutrition.fat} г</div>
        </div>
        <div>
          <div className="font-bold text-gray-600 text-sm uppercase mb-2">Углеводы</div>
          <div className="font-black text-2xl">{nutrition.carbs} г</div>
        </div>
      </div>
    </div>
  );
}