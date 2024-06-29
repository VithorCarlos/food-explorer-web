"use client";

import { useFood } from "@/store/useFood";
import { Minus, Plus } from "lucide-react";

export interface ButtonQuantityProps {
  id: string;
}

export function ButtonQuantity({ id }: ButtonQuantityProps) {
  const [quantities, addQuantity, removeQuantity] = useFood((state) => [
    state.quantities,
    state.addQuantity,
    state.removeQuantity,
  ]);

  const quantity = quantities[id] || 1;

  return (
    <div className="flex items-center gap-3.5">
      <button onClick={() => removeQuantity(id)}>
        <Minus />
      </button>
      <span>{quantity}</span>
      <button onClick={() => addQuantity(id)}>
        <Plus />
      </button>
    </div>
  );
}
