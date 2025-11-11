import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[4px] px-6 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[#00C977] text-white shadow-md hover:bg-[#00E08C] hover:shadow-lg",
        secondary:
          "border border-gray-300 text-gray-900 dark:text-gray-100 bg-transparent hover:bg-gray-100/10",
        ghost:
          "border border-transparent bg-transparent text-slate hover:bg-frost/10",
        destructive:
          "bg-[#E03C31] text-white shadow-md hover:bg-[#ff5a4a]",
        accent:
          "bg-accent text-night font-semibold shadow-sm hover:bg-accent/90",
      },
      size: {
        default: "",
        lg: "h-11 px-7 text-base",
        sm: "h-10 px-4 text-sm",
        icon: "h-11 w-11 rounded-[4px] px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
