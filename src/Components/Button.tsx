import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(
        "w-full rounded bg-tomato_100 py-3 text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
