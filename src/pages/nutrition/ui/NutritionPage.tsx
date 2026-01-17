/**
 * NutritionPage - Страница питания
 * 
 * Страница для отображения информации о питании и рационе (в разработке).
 * 
 * Роут: /nutrition
 * Доступ: Через нижнюю навигацию
 */

import { Header } from '../../../shared/ui/header';

export function NutritionPage() {
  return (
    <div className="h-full">
      <Header title="Питание" />
      <div className="flex items-center justify-center h-[calc(100%-60px)] px-4">
        <div className="text-center">
          <p className="text-gray-500">Страница в разработке</p>
        </div>
      </div>
    </div>
  );
}