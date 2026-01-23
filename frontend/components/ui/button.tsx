import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center leading-[100%] font-bold tracking-[1px] gap-3 whitespace-nowrap uppercase text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "w-[160px] h-12 bg-primary text-white hover:bg-primary-muted",
        outline:
          "w-[160px] h-12 border border-black bg-white text-black hover:bg-black hover:text-white",
        ghost: "text-black/50 hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Button({
  className,
  variant,
  showArrow,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    showArrow?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      <span>
        {children}
        {variant === "ghost" && showArrow && (
          <ChevronRight className="text-primary" />
        )}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
