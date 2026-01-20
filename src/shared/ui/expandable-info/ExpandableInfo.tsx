/**
 * ExpandableInfo - Переиспользуемый сворачиваемый блок с информацией
 * 
 * Neubrutalism стиль с толстой рамкой, тенью и анимированной иконкой
 */

import { ChevronDown } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '../../../components/ui/collapsible';
import { Card } from '../../../components/ui/card';
import { IconBox } from '../icon-box';

interface ExpandableInfoProps {
  /** Заголовок блока */
  title: string;
  /** Иконка для отображения в заголовке */
  icon: React.ReactNode;
  /** Цвет фона иконки */
  iconColor: string;
  /** Содержимое блока */
  children: React.ReactNode;
}

export function ExpandableInfo({ 
  title, 
  icon, 
  iconColor, 
  children 
}: ExpandableInfoProps) {
  return (
    <div className="px-4 mb-6">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button
            className="w-full p-4 flex items-center justify-between border-4 border-black bg-white"
            style={{
              boxShadow: '6px 6px 0px var(--brand-black)',
            }}
          >
            <div className="flex items-center gap-3">
              <IconBox size="sm" backgroundColor={iconColor}>
                {icon}
              </IconBox>
              <span className="font-black uppercase text-black">{title}</span>
            </div>
            <ChevronDown 
              className="w-5 h-5 transition-transform data-[state=open]:rotate-180"
              style={{ color: 'var(--brand-black)' }}
              strokeWidth={3}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Card
            size="lg"
            className="mt-3 p-5"
          >
            {children}
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}