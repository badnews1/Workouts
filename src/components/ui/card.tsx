import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import { cn } from "./utils";

// Типы для neubrutalism стиля
type CardSize = 'sm' | 'md' | 'lg' | 'xl';
type CardState = 'default' | 'completed' | 'current' | 'locked';

interface CardProps extends React.ComponentProps<"div"> {
  /** Размер карточки (влияет на тень и границу) */
  size?: CardSize;
  /** Цвет фона */
  backgroundColor?: string;
  /** Состояние карточки (автоматически устанавливает цвет фона) */
  state?: CardState;
  /** Элемент для рендера (по умолчанию div) */
  as?: React.ElementType;
  /** Дополнительные стили */
  style?: React.CSSProperties;
}

function Card({ 
  className, 
  size = 'md',
  backgroundColor,
  state,
  as: Component = 'div',
  style,
  ...props 
}: CardProps) {
  // Определяем цвет фона на основе state
  const getBackgroundColor = (): string => {
    // Если передан backgroundColor напрямую, используем его
    if (backgroundColor) return backgroundColor;
    
    // Иначе используем state
    switch (state) {
      case 'completed':
        return '#10B981'; // зеленый
      case 'current':
        return '#ffda54'; // желтый
      case 'locked':
        return '#F3F4F6'; // серый
      case 'default':
      default:
        return '#fff'; // белый
    }
  };

  // Определяем стили в зависимости от размера
  const getShadow = (): string => {
    switch (size) {
      case 'sm':
        return '2px 2px 0px #000';
      case 'md':
        return '4px 4px 0px #000';
      case 'lg':
        return '6px 6px 0px #000';
      case 'xl':
        return '8px 8px 0px #000';
      default:
        return '4px 4px 0px #000';
    }
  };

  const getBorderWidth = (): string => {
    return size === 'sm' ? 'border-3' : 'border-4';
  };

  return (
    <Component
      data-slot="card"
      className={cn(
        "border-black overflow-hidden",
        getBorderWidth(),
        className,
      )}
      style={{
        ...style,
        backgroundColor: getBackgroundColor(),
        boxShadow: getShadow(),
      }}
      {...props}
    />
  );
}

// Варианты для CardHeader
const cardHeaderVariants = cva(
  "flex items-center justify-between p-4",
  {
    variants: {
      variant: {
        default: "",
        yellow: "bg-[#ffda54] border-b-4 border-black",
        green: "bg-[#10B981] border-b-4 border-black",
        blue: "bg-[#93C5FD] border-b-4 border-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function CardHeader({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof cardHeaderVariants>) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ variant, className }))}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-black uppercase", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm font-black", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-4", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-4 border-t-4 border-black", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

export type { CardSize, CardState };