import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
}
export function Wrapper({ children, className, ...props }: Props) {
  return (
    <div
      className={twMerge("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
