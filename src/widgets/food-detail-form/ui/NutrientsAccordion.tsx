/**
 * NutrientsAccordion - Аккордеон для отображения нутриентов
 * 
 * Раскрывающаяся секция с детальной информацией
 */

import { useState } from 'react';
import { ChevronDown, Activity, Droplet, Wheat } from 'lucide-react';
import { Card } from '@/components/ui/card';

import { VITAMINS, MINERALS, ADDITIONAL_DATA } from '@/entities/food';
import type { NutritionalValue } from '@/entities/food';

interface NutrientsAccordionProps {
  nutrition: NutritionalValue;
  amount: number; // количество грамм для расчета "на Xг"
  unit: string;
}

type SectionType = 'additional' | 'vitamins' | 'minerals';

interface Section {
  type: SectionType;
  title: string;
  icon: typeof BarChart3;
  items: typeof ADDITIONAL_DATA;
}

export function NutrientsAccordion({ nutrition, amount, unit }: NutrientsAccordionProps) {
  const [expandedSection, setExpandedSection] = useState<SectionType | null>(null);

  // Фильтруем только заполненные данные для каждой секции
  const filledAdditionalData = ADDITIONAL_DATA.filter(
    item => nutrition[item.key] !== undefined && nutrition[item.key] !== null && nutrition[item.key] !== 0
  );

  const filledVitamins = VITAMINS.filter(
    vitamin => nutrition[vitamin.key] !== undefined && nutrition[vitamin.key] !== null && nutrition[vitamin.key] !== 0
  );

  const filledMinerals = MINERALS.filter(
    mineral => nutrition[mineral.key] !== undefined && nutrition[mineral.key] !== null && nutrition[mineral.key] !== 0
  );

  // Если ничего не заполнено, не показываем компонент
  if (filledAdditionalData.length === 0 && filledVitamins.length === 0 && filledMinerals.length === 0) {
    return null;
  }

  const sections: Section[] = [
    { 
      type: 'additional', 
      title: 'Дополнительно', 
      icon: Activity, 
      items: filledAdditionalData as any 
    },
    { 
      type: 'vitamins', 
      title: 'Витамины', 
      icon: Droplet, 
      items: filledVitamins as any 
    },
    { 
      type: 'minerals', 
      title: 'Минералы', 
      icon: Wheat, 
      items: filledMinerals as any 
    },
  ].filter(section => section.items.length > 0);

  const toggleSection = (type: SectionType) => {
    setExpandedSection(expandedSection === type ? null : type);
  };

  // Рассчитываем значение нутриента на выбранное количество
  const calculateValue = (valuePer100: number) => {
    return ((valuePer100 * amount) / 100).toFixed(1);
  };

  return (
    <div className="space-y-4">
      {/* Заголовок */}
      <div className="inline-block bg-black text-white px-4 py-2 font-black uppercase text-xs border-4 border-black">
        Подробный состав
      </div>

      {/* Аккордеоны */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.type;

          return (
            <Card 
              key={section.type}
              backgroundColor="white"
            >
              {/* Заголовок секции */}
              <button
                onClick={() => toggleSection(section.type)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ffda54] border-4 border-black flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={3} />
                  </div>
                  <div className="text-left">
                    <div className="font-black uppercase text-sm">{section.title}</div>
                    <div className="font-bold text-xs text-gray-500">на {amount}{unit}</div>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  strokeWidth={3}
                />
              </button>

              {/* Содержимое аккордеона */}
              {isExpanded && (
                <div className="border-t-4 border-black p-4 bg-gray-50">
                  <div className="space-y-3">
                    {section.items.map((item) => {
                      const valuePer100 = nutrition[item.key] || 0;
                      const calculatedValue = calculateValue(valuePer100);
                      
                      return (
                        <div 
                          key={item.key} 
                          className="flex justify-between items-center py-2 border-b-2 border-gray-200 last:border-b-0"
                        >
                          <span className="font-bold text-sm">{item.label}</span>
                          <span className="font-black text-base">
                            {calculatedValue} {item.unit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}