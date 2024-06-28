import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="w-full rounded bg-tomato_100 py-3 text-sm"
      {...props}
    >
      {children}
    </button>
  );
}
