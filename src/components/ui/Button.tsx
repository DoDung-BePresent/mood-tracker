/**
 * Node modules
 */
import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

/**
 * Utils
 */
import { cn } from "@/utils/cn";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={cn(
        // Base styles
        "items-center justify-center rounded-full",

        // Variants
        variant === "primary" && ["bg-primary", disabled && "bg-primary/50"],
        variant === "secondary" && [
          "bg-secondary",
          disabled && "bg-background/50",
        ],
        variant === "outline" && ["border-[2px] border-border"],

        // Sizes
        size === "sm" && "px-4 py-2",
        size === "md" && "px-6 py-3",
        size === "lg" && "px-8 py-4",

        // Disabled state
        disabled && "opacity-50",

        className
      )}
      disabled={disabled}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "font-semibold",

            // Text colors based on variant
            variant === "primary" && "text-primary-foreground",
            variant === "secondary" && "text-secondary-foreground",
            variant === "outline" && "text-muted-foreground",

            // Text sizes
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg"
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
