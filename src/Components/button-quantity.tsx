"use client";

import { useFoodStore } from "@/providers/food";
import { Minus, Plus } from "lucide-react";

export interface ButtonQuantityProps {
  id: string;
}

export function ButtonQuantity({ id }: ButtonQuantityProps) {
  const quantities = useFoodStore((state) => state.quantities);
  const addQuantity = useFoodStore((state) => state.addQuantity);
  const removeQuantity = useFoodStore((state) => state.removeQuantity);

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
