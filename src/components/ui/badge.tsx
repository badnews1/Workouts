"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center border-black bg-white font-bold w-fit whitespace-nowrap shrink-0 transition-all",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        primary: "bg-[#10B981] text-white",
        secondary: "bg-[#ffda54] text-black",
        destructive: "bg-[#ef4444] text-white",
        info: "bg-[#93c5fd] text-black",
        outline: "bg-white text-black",
      },
      size: {
        sm: "px-2 py-0.5 text-xs border-2",
        md: "px-3 py-1 text-sm border-[3px]",
        lg: "px-4 py-1.5 text-base border-[3px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  shadow?: boolean;
}

function Badge({
  className,
  variant,
  size = "md",
  asChild = false,
  shadow = true,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  // Размер тени в зависимости от размера badge
  const getShadow = () => {
    if (!shadow) return 'none';
    switch (size) {
      case 'lg':
        return '2px 2px 0px #000';
      case 'sm':
        return '1px 1px 0px #000';
      default:
        return '2px 2px 0px #000';
    }
  };

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      style={{
        boxShadow: getShadow(),
      }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
