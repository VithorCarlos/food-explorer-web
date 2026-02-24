"use client";

import { useFood } from "@/store/useFood";
import { formatCurrency } from "@/utils/fomart-curency";
import { VariantProps, tv } from "tailwind-variants";

const currency = tv({
  base: "block text-3xl",
  variants: {
    color: {
      cake_200: "text-cake_200",
      default: "text-white",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

interface CurrencyProps extends VariantProps<typeof currency> {
  price: number;
  id: string;
  customText?: string;
}

export function Currency({ price, color, id, customText }: CurrencyProps) {
  const quantities = useFood((state) => state.quantities);
  const quantity = quantities[id] || 1;

  return (
    <span className={currency({ color })}>
      {customText}
      {formatCurrency(quantity * price)}
    </span>
  );
}
