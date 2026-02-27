"use client";

import { useProductStore } from "@/providers/product-provider";
import { formatCurrency } from "@/utils/fomart-curency";
import { VariantProps, tv } from "tailwind-variants";

const currency = tv({
  base: "block lg:text-2xl text-lg",
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
  const quantities = useProductStore((state) => state.quantities);
  const quantity = quantities[id] || 1;

  return (
    <span className={currency({ color })}>
      {customText}
      {formatCurrency(quantity * price)}
    </span>
  );
}
