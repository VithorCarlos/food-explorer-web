import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<'button'> {
  title: string
}

export function Button({title, ...props}: ButtonProps) {
  return (
    <button
      type="button"
      className="w-full rounded bg-tomato_100 py-3 text-sm"
      {...props}
    >
      {title}
    </button>
  );
}
