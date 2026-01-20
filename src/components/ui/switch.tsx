"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.2";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center border-[3px] border-black transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#10b981] data-[state=unchecked]:bg-white",
  {
    variants: {
      size: {
        sm: "h-5 w-9 rounded-full p-0.5",
        md: "h-6 w-11 rounded-full p-0.5",
        lg: "h-8 w-14 rounded-full p-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block bg-black rounded-full transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "size-3 data-[state=checked]:translate-x-[14px]",
        md: "size-4 data-[state=checked]:translate-x-[18px]",
        lg: "size-5 data-[state=checked]:translate-x-[24px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(switchVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };