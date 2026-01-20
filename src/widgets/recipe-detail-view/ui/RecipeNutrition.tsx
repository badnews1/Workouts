/**
 * RecipeNutrition - Полоса с пищевой ценностью рецепта
 */

interface RecipeNutritionProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export function RecipeNutrition({ calories, protein, fat, carbs }: RecipeNutritionProps) {
  return (
    <div className="bg-[#1a1a1a] text-white grid grid-cols-4 border-4 border-black mx-4 mb-6">
      {/* Калории */}
      <div className="text-center py-4 border-r-4 border-black">
        <div className="font-black text-3xl leading-none mb-1 text-[#ffda54]">
          {Math.round(calories)}
        </div>
        <div className="font-black text-xs uppercase opacity-70">
          ккал
        </div>
      </div>

      {/* Белки */}
      <div className="text-center py-4 border-r-4 border-black">
        <div className="font-black text-3xl leading-none mb-1 text-[#ffda54]">
          {Math.round(protein)}г
        </div>
        <div className="font-black text-xs uppercase opacity-70">
          белки
        </div>
      </div>

      {/* Жиры */}
      <div className="text-center py-4 border-r-4 border-black">
        <div className="font-black text-3xl leading-none mb-1 text-[#ffda54]">
          {Math.round(fat)}г
        </div>
        <div className="font-black text-xs uppercase opacity-70">
          жиры
        </div>
      </div>

      {/* Углеводы */}
      <div className="text-center py-4">
        <div className="font-black text-3xl leading-none mb-1 text-[#ffda54]">
          {Math.round(carbs)}г
        </div>
        <div className="font-black text-xs uppercase opacity-70">
          углеводы
        </div>
      </div>
    </div>
  );
}
