import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full px-4 py-3 border-3 border-black font-bold text-base resize-none focus:outline-none focus:ring-0",
        className,
      )}
      style={{
        boxShadow: '4px 4px 0px var(--brand-black)',
      }}
      {...props}
    />
  );
}

export { Textarea };