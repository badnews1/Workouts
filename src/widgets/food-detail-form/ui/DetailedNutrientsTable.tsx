/**
 * DetailedNutrientsTable - Таблица детальных нутриентов
 * 
 * Отображает дополнительные данные, витамины и минералы на 100г
 * Показывает только заполненные поля
 */

import { Card } from '@/components/ui/card';
import { VITAMINS, MINERALS, ADDITIONAL_DATA } from '@/entities/food';
import type { NutritionalValue } from '@/entities/food';

interface DetailedNutrientsTableProps {
  unit: string;
  nutrition: NutritionalValue;
}

export function DetailedNutrientsTable({ unit, nutrition }: DetailedNutrientsTableProps) {
  // Фильтруем только заполненные дополнительные данные
  const filledAdditionalData = ADDITIONAL_DATA.filter(
    item => nutrition[item.key] !== undefined && nutrition[item.key] !== null && nutrition[item.key] !== 0
  );

  // Фильтруем только заполненные витамины
  const filledVitamins = VITAMINS.filter(
    vitamin => nutrition[vitamin.key] !== undefined && nutrition[vitamin.key] !== null && nutrition[vitamin.key] !== 0
  );

  // Фильтруем только заполненные минералы
  const filledMinerals = MINERALS.filter(
    mineral => nutrition[mineral.key] !== undefined && nutrition[mineral.key] !== null && nutrition[mineral.key] !== 0
  );

  // Если ничего не заполнено, не показываем компонент
  if (filledAdditionalData.length === 0 && filledVitamins.length === 0 && filledMinerals.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Дополнительные данные */}
      {filledAdditionalData.length > 0 && (
        <Card className="p-6" shadow="large">
          <h2 className="font-black text-lg uppercase mb-1">Дополнительные данные</h2>
          <div className="font-bold text-gray-500 text-xs uppercase mb-4">
            На 100{unit}
          </div>
          
          <div className="space-y-3">
            {filledAdditionalData.map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <span className="font-bold text-sm">{item.label}</span>
                <span className="font-black">{nutrition[item.key]} {item.unit}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Витамины */}
      {filledVitamins.length > 0 && (
        <Card className="p-6" shadow="large">
          <h2 className="font-black text-lg uppercase mb-1">Витамины</h2>
          <div className="font-bold text-gray-500 text-xs uppercase mb-4">
            На 100{unit}
          </div>
          
          <div className="space-y-3">
            {filledVitamins.map((vitamin) => (
              <div key={vitamin.key} className="flex justify-between items-center">
                <span className="font-bold text-sm">{vitamin.label}</span>
                <span className="font-black">{nutrition[vitamin.key]} {vitamin.unit}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Минералы */}
      {filledMinerals.length > 0 && (
        <Card className="p-6" shadow="large">
          <h2 className="font-black text-lg uppercase mb-1">Минералы</h2>
          <div className="font-bold text-gray-500 text-xs uppercase mb-4">
            На 100{unit}
          </div>
          
          <div className="space-y-3">
            {filledMinerals.map((mineral) => (
              <div key={mineral.key} className="flex justify-between items-center">
                <span className="font-bold text-sm">{mineral.label}</span>
                <span className="font-black">{nutrition[mineral.key]} {mineral.unit}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
