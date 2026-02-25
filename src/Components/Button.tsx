"use client";
import { ComponentProps, memo } from "react";
import { twMerge } from "tailwind-merge";
import { ThreeDots } from "react-loader-spinner";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  asChild?: boolean;
}

function Button({
  children,
  className,
  isLoading,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      {...(!asChild && { type: "button" })}
      disabled={!asChild ? isLoading : undefined}
      className={twMerge(
        "flex w-full items-center justify-center rounded bg-tomato_100 py-3 text-sm hover:bg-tomato_300",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <ThreeDots
          visible={true}
          height="20"
          width="24"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      ) : (
        children
      )}
    </Comp>
  );
}

export default memo(Button);
