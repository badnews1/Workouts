import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none border-4 border-black",
  {
    variants: {
      variant: {
        // Primary - зеленая кнопка (основное действие)
        primary: "bg-[#10B981] text-white active:translate-x-[2px] active:translate-y-[2px]",
        // Secondary - желтая кнопка (второстепенное действие)
        secondary: "bg-[#ffda54] text-black active:translate-x-[2px] active:translate-y-[2px]",
        // Destructive - красная кнопка (опасное действие)
        destructive: "bg-[#ef4444] text-white active:translate-x-[2px] active:translate-y-[2px]",
        // Outline - белая с черной рамкой
        outline: "bg-white text-black active:translate-x-[2px] active:translate-y-[2px]",
        // Ghost - без рамки и фона
        ghost: "border-0 active:bg-gray-100",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        "icon-sm": "size-10 border-3",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button(
  {
    className,
    variant,
    size,
    asChild = false,
    shadow = true,
    style,
    ...props
  }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      shadow?: boolean;
    }
) {
  const Comp = asChild ? Slot : "button";

  // Определяем тень в зависимости от варианта и пропа shadow
  const getShadow = () => {
    if (!shadow || variant === 'ghost') return 'none';
    return '4px 4px 0px #000';
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{
        boxShadow: getShadow(),
        ...style,
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };