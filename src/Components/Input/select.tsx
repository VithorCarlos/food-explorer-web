"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { VariantProps, tv } from "tailwind-variants";

const select = tv({
  slots: {
    trigger: [
      "text-light_400 data-[placeholder]:text-light_500 select-none flex",
      "outline-1 outline-dark_950 bg-dark_800 px-4 py-3.5 justify-between items-center select-none",
      "rounded-lg overflow-hidden bg-transparent  w-full",
    ],
  },
  variants: {
    state: {
      default: {
        trigger: "",
      },
      error: {
        trigger: "!border-tomato_400 focus:border-tomato_200",
      },
      isValid: {
        trigger: "!border-light_200 focus:border-light_200",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export interface SelectProps
  extends SelectPrimitive.SelectProps,
    VariantProps<typeof select> {
  children: React.ReactNode;
  placeholder: string;
  errorMessage?: string;
  selectedValue: string;
  handleValueChange?: (newValue: string) => void;
}

export function Select({
  handleValueChange,
  children,
  placeholder,
  selectedValue,
  state,
  errorMessage,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger } = select({ state });

  return (
    <>
      <SelectPrimitive.Root
        onOpenChange={() => setIsOpen((state) => !state)}
        onValueChange={handleValueChange}
        {...props}
      >
        <SelectPrimitive.Trigger className={trigger({ state })}>
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="text-purple_950">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="custom-scroll hidden h-56 w-[--radix-select-trigger-width] select-none overflow-y-auto rounded-lg bg-dark_800 text-left text-light_400 shadow-xl "
            position="popper"
            sideOffset={6}
            align="center"
            side="bottom"
          >
            {children}
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {state === "error" && !selectedValue && (
        <span className="-mt-4 text-tomato_400">{errorMessage}</span>
      )}
    </>
  );
}
