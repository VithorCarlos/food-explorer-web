"use client";

import { Button } from "@/Components/Button";
import { ChevronRight, Heart, HeartIcon, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";

export interface SectionFoodProps {
  foodName: string;
  price: number;
  qtd: number;
  imageUrl: string;
}

const heart = tv({
  base: "absolute right-4 top-4 data-[favorited=true]:animate-jump",
  variants: {
    color: {
      marked: "text-tomato_300 fill-tomato_300",
      default: "",
    },
  },
  defaultVariants: { color: "marked" },
});

export function SectionFood({
  foodName,
  imageUrl,
  price,
  qtd,
}: SectionFoodProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleSaveFavorite = () => {
    setIsFavorited((state) => !state);
  };

  return (
    <div className="relative flex min-w-52 flex-col items-center justify-center gap-3 rounded border border-dark_300 bg-dark_200 p-6">
      <button onClick={handleSaveFavorite}>
        <Heart
          data-favorited={isFavorited}
          className={heart({
            color: isFavorited ? "marked" : "default",
            className: "",
          })}
        />
      </button>

      <img src={imageUrl} alt={foodName} />

      <span className="flex items-center justify-center gap-1 text-sm">
        {foodName} <ChevronRight className="w-4" />
      </span>

      <span className="text-cake_200">R$ {price}</span>

      <div className="mb-1 flex items-center justify-center gap-3.5">
        <button>
          <Minus />
        </button>
        <span>{qtd}</span>
        <button>
          <Plus />
        </button>
      </div>

      <Button>Incluir</Button>
    </div>
  );
}
