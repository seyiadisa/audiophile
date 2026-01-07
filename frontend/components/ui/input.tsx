import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 outline-primary h-14 w-full min-w-0 rounded-md border border-[#CFCFCF] bg-transparent px-6 py-[18px] text-sm font-bold tracking-[-0.25px] shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-2 aria-invalid:ring-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
