"use client";

import { useProductStore } from "@/providers/product-provider";
import { Minus, Plus } from "lucide-react";

export interface ButtonQuantityProps {
  id: string;
}

export function ButtonQuantity({ id }: ButtonQuantityProps) {
  const quantities = useProductStore((state) => state.quantities);
  const addQuantity = useProductStore((state) => state.addQuantity);
  const removeQuantity = useProductStore((state) => state.removeQuantity);

  const quantity = quantities[id] || 1;

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => removeQuantity(id)}>
        <Minus className="h-5 w-5 lg:h-8 lg:w-8" />
      </button>
      <span className="lg:text-2xl">{quantity}</span>
      <button onClick={() => addQuantity(id)}>
        <Plus className="h-5 w-5 lg:h-8 lg:w-8" />
      </button>
    </div>
  );
}
