"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ThreeDots } from "react-loader-spinner";

export interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
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
    </button>
  );
}
