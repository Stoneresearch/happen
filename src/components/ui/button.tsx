// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border bg-background",
        // Add more variants as needed
      },
    },
  }
);

export const Button = React.forwardRef<HTMLButtonElement>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />
    );
  }
);
