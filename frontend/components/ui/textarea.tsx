import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "selection:bg-primary selection:text-primary-foreground dark:bg-input/30 outline-primary min-h-[120px] w-full min-w-0 rounded-md border border-[#CFCFCF] bg-transparent px-6 py-[18px] text-sm font-bold tracking-[-0.25px] shadow-xs transition-[color,box-shadow] placeholder:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive aria-invalid:ring-2",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
