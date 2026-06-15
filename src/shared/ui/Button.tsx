import { Loader2 } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg";

  const variants = {
    primary: "bg-brand-orange text-white hover:bg-opacity-90 focus:ring-brand-orange",
    secondary: "bg-brand-navy text-white hover:bg-opacity-90 focus:ring-brand-navy",
    outline:
      "border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-200",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-200",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base", // Updated to match the py-3 height (48px) often used
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
