/**
 * Empty - Компонент для пустых состояний в Neubrutalism стиле
 * 
 * Используется для отображения пустых состояний в списках, формах и т.д.
 * 
 * @example
 * // С эмодзи
 * <Empty>
 *   <EmptyIcon>🍎</EmptyIcon>
 *   <EmptyTitle>Нет продуктов</EmptyTitle>
 *   <EmptyDescription>Добавьте свой первый продукт</EmptyDescription>
 * </Empty>
 * 
 * @example
 * // С IconBox
 * <Empty>
 *   <EmptyIcon variant="iconbox">
 *     <Weight className="w-8 h-8" strokeWidth={3} />
 *   </EmptyIcon>
 *   <EmptyTitle>Пока нет замеров</EmptyTitle>
 * </Empty>
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import { cn } from "./utils";
import { IconBox } from '@/shared/ui/icon-box';

// Корневой контейнер
function Empty({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "text-center py-12",
        className
      )}
      {...props}
    />
  );
}

// Варианты для иконки/эмодзи
const emptyIconVariants = cva(
  "mb-3",
  {
    variants: {
      variant: {
        emoji: "text-4xl",
        iconbox: "flex justify-center mb-4",
      },
    },
    defaultVariants: {
      variant: "emoji",
    },
  }
);

// Иконка (эмодзи или IconBox)
function EmptyIcon({ 
  className,
  variant = "emoji",
  children,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof emptyIconVariants>) {
  // Если вариант iconbox - оборачиваем в IconBox
  if (variant === "iconbox") {
    return (
      <div className={cn(emptyIconVariants({ variant, className }))}>
        <IconBox size="lg" {...props}>
          {children}
        </IconBox>
      </div>
    );
  }

  // Для эмодзи - просто div
  return (
    <div
      data-slot="empty-icon"
      className={cn(emptyIconVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

// Заголовок
function EmptyTitle({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-black text-lg mb-2",
        className
      )}
      {...props}
    />
  );
}

// Описание
function EmptyDescription({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm font-medium text-gray-600",
        className
      )}
      {...props}
    />
  );
}

// Actions (кнопки и т.д.)
function EmptyActions({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-actions"
      className={cn(
        "mt-4",
        className
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
};