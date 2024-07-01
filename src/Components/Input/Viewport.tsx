import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputViewportProps = ComponentProps<"div">;

export function Viewport({ className, ...props }: InputViewportProps) {
  return (
    <div
      className={twMerge(
        "group flex items-center gap-3.5 rounded bg-dark_900 pl-3.5",
        className,
      )}
      {...props}
    />
  );
}
