
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ButtonProps } from "@/components/ui/button";

interface GradientButtonProps extends ButtonProps {
  glowOnHover?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, glowOnHover = true, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white transition-all",
          glowOnHover && "hover:shadow-[0_0_15px_rgba(110,69,226,0.5)]",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
