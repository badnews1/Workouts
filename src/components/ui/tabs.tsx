"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "inline-flex w-fit items-center justify-center bg-white border-black p-1 gap-1",
  {
    variants: {
      size: {
        sm: "h-9 border-[3px]",
        md: "h-11 border-[3px]",
        lg: "h-14 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  shadow?: boolean;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size = "md", shadow = true, ...props }, ref) => {
  const getShadow = () => {
    if (!shadow) return 'none';
    switch (size) {
      case 'lg':
        return '3px 3px 0px #000';
      case 'sm':
        return '2px 2px 0px #000';
      default:
        return '2px 2px 0px #000';
    }
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(tabsListVariants({ size }), className)}
      style={{
        boxShadow: getShadow(),
      }}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

const tabsTriggerVariants = cva(
  "inline-flex flex-1 items-center justify-center font-bold whitespace-nowrap transition-all border-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-xs border-[3px]",
        md: "px-4 py-1.5 text-sm border-[3px]",
        lg: "px-5 py-2 text-base border-[3px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  shadow?: boolean;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size = "md", shadow = true, ...props }, ref) => {
  const getShadow = (isActive: boolean) => {
    if (!shadow) return 'none';
    if (!isActive) return 'none';
    switch (size) {
      case 'lg':
        return '2px 2px 0px #000';
      default:
        return '2px 2px 0px #000';
    }
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        tabsTriggerVariants({ size }),
        "data-[state=inactive]:bg-white data-[state=inactive]:text-gray-400",
        "data-[state=active]:bg-[#10B981] data-[state=active]:text-white",
        className
      )}
      style={{
        boxShadow: props['data-state'] === 'active' ? getShadow(true) : 'none',
      }}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
