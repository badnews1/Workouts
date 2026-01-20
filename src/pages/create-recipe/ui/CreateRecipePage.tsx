/**
 * CreateRecipePage - Страница создания рецепта
 * 
 * Позволяет создать рецепт с выбором продуктов, шагами приготовления и расчетом КБЖУ
 * 
 * Роут: /create-recipe
 */

import { ArrowLeft } from 'lucide-react';
import { CreateRecipeForm } from '@/features/create-recipe';
import { useNavigate } from 'react-router';

export function CreateRecipePage() {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-[#f5f5f5] flex flex-col">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white px-4 py-4 border-b-4 border-black flex items-center gap-3">
        <button
          onClick={() => navigate('/recipes')}
          className="bg-[#ffda54] text-black p-2 border-4 border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
        </button>
        <h1 className="font-black text-xl uppercase">Новый рецепт</h1>
      </div>
      
      {/* Форма */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <CreateRecipeForm 
          onSuccess={() => navigate('/recipes')}
        />
      </div>
    </div>
  );
}