/**
 * SettingsButton - Кнопка настроек с иконкой
 * 
 * Универсальная кнопка для всех секций настроек
 */

import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IconBox } from './icon-box';

interface SettingsButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
  textColor?: string;
  onClick?: () => void;
}

export function SettingsButton({
  icon: Icon,
  title,
  description,
  iconBgColor = 'var(--brand-yellow)',
  iconColor = 'currentColor',
  textColor = 'inherit',
  onClick,
}: SettingsButtonProps) {
  return (
    <button onClick={onClick} className="w-full">
      <Card className="p-4 flex flex-row items-center gap-4 transition-all active:translate-x-1 active:translate-y-1">
        <IconBox size="md" backgroundColor={iconBgColor}>
          <Icon className="w-6 h-6" strokeWidth={3} style={{ color: iconColor }} />
        </IconBox>
        <div className="flex-1 text-left">
          <div className="font-black text-base" style={{ color: textColor }}>
            {title}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {description}
          </div>
        </div>
      </Card>
    </button>
  );
}