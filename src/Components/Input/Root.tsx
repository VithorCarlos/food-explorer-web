import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type InputRootProps = ComponentProps<"div">;

export function Root({ className, ...props }: InputRootProps) {
  return (
    <div
      className={twMerge("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}
