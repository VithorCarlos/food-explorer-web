"use client";
import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends ComponentProps<"input"> {
  isValid?: boolean;
  hasError?: boolean | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isValid, hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          "h-full w-full overflow-hidden rounded border border-transparent bg-transparent px-3.5 py-3.5",
          "placeholder:text-light_500 focus:outline-1 focus:outline-dark_950",
          isValid && "focus:outline-lightborder-light_200 border-light_200",
          hasError && " !border-tomato_400 focus:border-tomato_200",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
