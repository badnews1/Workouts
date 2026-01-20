/**
 * LevelDescription - Виджет сворачиваемого описания уровня
 * 
 * Отображает описание программы уровня и начальные требования
 */

import { Info } from 'lucide-react';
import { ExpandableInfo } from '@/shared/ui/expandable-info';

interface LevelDescriptionProps {
  description: string;
  requirements: {
    pullups: number;
    pushups: number;
  };
}

export function LevelDescription({ description, requirements }: LevelDescriptionProps) {
  return (
    <ExpandableInfo
      title="О программе уровня"
      icon={<Info className="w-5 h-5 text-black" strokeWidth={2.5} />}
      iconColor="var(--brand-blue)"
    >
      <p className="text-sm font-bold leading-relaxed mb-4 text-gray-800">
        {description}
      </p>
      <div className="pt-4 border-t-[3px] border-black">
        <h3 className="text-sm font-black uppercase mb-2 text-black">
          Начальные требования:
        </h3>
        <div className="space-y-1 text-sm font-bold text-gray-800">
          <div>• Подтягивания: {requirements.pullups}</div>
          <div>• Отжимания: {requirements.pushups}</div>
        </div>
      </div>
    </ExpandableInfo>
  );
}