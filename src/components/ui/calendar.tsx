"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react@0.487.0";
import { DayPicker } from "react-day-picker@8.10.1";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-between items-center w-full px-1",
        caption_label: "text-base font-bold uppercase",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "size-7 p-0 border-[2px] border-black bg-gray-100 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center",
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-x-1",
        head_row: "flex gap-[2px]",
        head_cell:
          "text-muted-foreground rounded-md w-11 font-semibold text-xs uppercase text-center",
        row: "flex w-full mt-[2px] gap-[2px]",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-11 p-0 font-normal border border-black aria-selected:opacity-100 aria-selected:bg-[#ffda54] aria-selected:text-black",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-[#ffda54] text-black",
        day_today: "bg-accent text-accent-foreground aria-selected:bg-[#ffda54] aria-selected:text-black",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      modifiersClassNames={{
        workout: "bg-[#10B981] text-white border-black aria-selected:bg-[#ffda54] aria-selected:text-black",
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };