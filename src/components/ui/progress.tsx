"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const progressVariants = cva(
  "relative w-full overflow-hidden bg-white border-black",
  {
    variants: {
      size: {
        sm: "h-2 border-[2px]",
        md: "h-3 border-[3px]",
        lg: "h-8 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-[#10B981]",
        secondary: "bg-[#ffda54]",
        destructive: "bg-[#ef4444]",
        info: "bg-[#93c5fd]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  shadow?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size = "md", variant = "primary", shadow = true, ...props }, ref) => {
  const getShadow = () => {
    if (!shadow) return 'none';
    switch (size) {
      case 'sm':
        return '1px 1px 0px #000';
      case 'lg':
        return '3px 3px 0px #000';
      default:
        return '2px 2px 0px #000';
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={cn(progressVariants({ size }), className)}
      style={{
        boxShadow: getShadow(),
      }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressIndicatorVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";

export { Progress, progressVariants, progressIndicatorVariants };