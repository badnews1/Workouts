"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const inputVariants = cva(
  "w-full border-black bg-white transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 focus:outline-none",
  {
    variants: {
      size: {
        sm: "h-9 px-3 border-[3px]",
        md: "h-11 px-4 border-[3px]",
        lg: "h-14 px-5 border-4",
      },
      variant: {
        default: "bg-white",
        error: "bg-red-50 border-[#ef4444]",
      },
      fontSize: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
      fontWeight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      fontSize: "md",
      fontWeight: "normal",
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  shadow?: boolean;
  rightText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, shadow = true, size = "md", variant = "default", fontSize, fontWeight, rightText, ...props }, ref) => {
    // Размер тени в зависимости от размера инпута
    const getShadow = () => {
      if (!shadow) return 'none';
      switch (size) {
        case 'lg':
          return '3px 3px 0px #000';
        default:
          return '2px 2px 0px #000';
      }
    };

    // Размер и отступ для rightText в зависимости от fontSize
    const getRightTextSize = () => {
      switch (fontSize) {
        case '2xl':
          return 'text-xl';
        case 'xl':
          return 'text-lg';
        case 'lg':
          return 'text-base';
        case 'md':
          return 'text-sm';
        case 'sm':
          return 'text-xs';
        default:
          return 'text-sm';
      }
    };

    const getRightPadding = () => {
      switch (fontSize) {
        case '2xl':
          return 'pr-20';
        case 'xl':
          return 'pr-16';
        case 'lg':
          return 'pr-14';
        default:
          return 'pr-12';
      }
    };

    // Если есть rightText, оборачиваем в контейнер
    if (rightText) {
      return (
        <div className="relative">
          <input
            type={type}
            data-slot="input"
            className={cn(inputVariants({ size, variant, fontSize, fontWeight }), getRightPadding(), className)}
            style={{
              boxShadow: getShadow(),
            }}
            ref={ref}
            {...props}
          />
          <div className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 pointer-events-none",
            getRightTextSize()
          )}>
            {rightText}
          </div>
        </div>
      );
    }

    return (
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ size, variant, fontSize, fontWeight, className }))}
        style={{
          boxShadow: getShadow(),
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };