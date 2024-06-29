"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface GobackButtonProps extends ComponentProps<"button"> {}

export function GobackButton({ className, ...props }: GobackButtonProps) {
  const { back } = useRouter();
  return (
    <button
      onClick={back}
      className={twMerge(
        "flex items-center justify-center gap-2 font-bold",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="h-8 w-8" />
      <span className="text-2xl ">voltar</span>
    </button>
  );
}
