"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const checkboxVariants = cva(
  "peer shrink-0 border-black bg-white transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#10B981] active:translate-x-[1px] active:translate-y-[1px]",
  {
    variants: {
      size: {
        sm: "size-5 border-[3px]",
        md: "size-10 border-4",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

function Checkbox({
  className,
  shadow = true,
  size = "sm",
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & 
  VariantProps<typeof checkboxVariants> & {
    shadow?: boolean;
  }) {
  
  // Размер иконки в зависимости от размера чекбокса
  const getIconSize = () => {
    switch (size) {
      case 'md':
        return 'size-5';
      default:
        return 'size-3';
    }
  };

  // Размер тени в зависимости от размера чекбокса
  const getShadow = () => {
    if (!shadow) return 'none';
    switch (size) {
      case 'md':
        return '3px 3px 0px #000';
      default:
        return '2px 2px 0px #000';
    }
  };

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size, className }))}
      style={{
        boxShadow: getShadow(),
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white transition-none"
      >
        <CheckIcon className={cn(getIconSize(), "stroke-[3px]")} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };