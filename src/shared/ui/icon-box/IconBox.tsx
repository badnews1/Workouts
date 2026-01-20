/**
 * IconBox - Квадратный контейнер для иконок в стиле neubrutalism
 * 
 * Используется для декоративного выделения иконок с толстой черной рамкой
 */

import * as React from 'react';
import { cn } from '@/components/ui/utils';

type IconBoxSize = 'sm' | 'md' | 'lg';

interface IconBoxProps extends React.ComponentProps<'div'> {
  /** Размер контейнера */
  size?: IconBoxSize;
  /** Цвет фона */
  backgroundColor?: string;
  /** Иконка или другой контент */
  children: React.ReactNode;
}

export function IconBox({
  size = 'md',
  backgroundColor = 'var(--brand-yellow)',
  className,
  children,
  ...props
}: IconBoxProps) {
  // Определяем размеры в зависимости от пропа
  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10'; // 40x40px
      case 'md':
        return 'w-12 h-12'; // 48x48px
      case 'lg':
        return 'w-16 h-16'; // 64x64px
      default:
        return 'w-12 h-12';
    }
  };

  const getBorderWidth = (): string => {
    return size === 'sm' ? 'border-3' : 'border-4';
  };

  return (
    <div
      className={cn(
        'border-black flex items-center justify-center shrink-0',
        getSizeClasses(),
        getBorderWidth(),
        className
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </div>
  );
}