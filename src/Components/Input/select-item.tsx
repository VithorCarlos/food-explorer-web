"use client";
import React, { forwardRef } from "react";
import { CheckCheckIcon } from "lucide-react";
import * as Select from "@radix-ui/react-select";

export interface SelectItemProps extends Select.SelectIconProps {
  value: string;
  hasSeparator?: boolean;
}

const SelectItemForwardRef: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectItemProps
> = ({ children, hasSeparator, ...props }, ref) => {
  return (
    <div>
      <Select.Item
        ref={ref}
        className="flex cursor-pointer select-none items-center justify-between gap-2  px-6 py-4 outline-1 outline-dark_950 hover:bg-dark_950"
        {...props}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="text-light_200">
          <CheckCheckIcon className="h-4 w-4 justify-center" />
        </Select.ItemIndicator>
      </Select.Item>
      {hasSeparator && <div className="h-[1px] bg-dark_950" />}
    </div>
  );
};

export const SelectItem = forwardRef(SelectItemForwardRef);
