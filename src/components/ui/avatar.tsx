"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden border-black bg-white",
  {
    variants: {
      size: {
        sm: "size-10 border-[3px]",
        md: "size-16 border-[3px]",
        lg: "size-24 border-4",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

function Avatar({
  className,
  size,
  shape,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    />
  );
}

interface AvatarImageProps
  extends React.ComponentProps<typeof AvatarPrimitive.Image> {}

function AvatarImage({
  className,
  ...props
}: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

interface AvatarFallbackProps
  extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {
  shape?: "circle" | "square";
}

function AvatarFallback({
  className,
  shape = "circle",
  ...props
}: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center bg-[#93c5fd] font-bold text-black",
        shape === "circle" ? "rounded-full" : "rounded-none",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
export type { AvatarProps };