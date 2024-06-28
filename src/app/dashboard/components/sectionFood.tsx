"use client";

import { Button } from "@/components/Button";
import { FoodProps } from "@/dto/food.dto";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export interface SectionFoodProps extends ComponentProps<"section"> {
  data: FoodProps[];
  title: string;
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

export function SectionFood({ title, data, ...props }: SectionFoodProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleSaveFavorite = (foodName: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(foodName)) {
        return prevFavorites.filter((name) => name !== foodName);
      } else {
        return [...prevFavorites, foodName];
      }
    });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section {...props}>
      <h2 className="mb-6 text-lg font-medium lg:text-3xl">{title}</h2>
      <div className="relative select-none">
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className="absolute bottom-0 left-5 top-0 z-20 hidden lg:block"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
        )}
        <div
          ref={scrollRef}
          className={twMerge(
            "no-scrollbar relative flex flex-grow gap-4 overflow-x-auto",
            "lg:after:absolute lg:after:left-0 lg:after:top-0 lg:after:z-10 lg:after:block lg:after:h-full lg:after:content-['']",
            "lg:after:w-64 lg:after:bg-gradient-to-r lg:after:from-[rgba(0,10,15,0.8)] lg:after:to-[rgba(0,10,15,0.27)]",
            "lg:before:absolute lg:before:right-0 lg:before:top-0 lg:before:z-10 lg:before:block lg:before:h-full lg:before:content-['']",
            "lg:before:w-64 lg:before:bg-gradient-to-l lg:before:from-[rgba(0,10,15,0.8)] lg:before:to-[rgba(0,10,15,0.27)]",
            !showRightButton && "lg:before:sr-only",
          )}
        >
          {!!data &&
            data.map((food) => (
              <div
                key={food.foodName}
                className="relative flex min-w-52 flex-col items-center justify-center gap-3 rounded border border-dark_300 bg-dark_200 p-6"
              >
                <button onClick={() => handleSaveFavorite(food.foodName)}>
                  <Heart
                    data-favorited={favorites.includes(food.foodName)}
                    className={heart({
                      color: favorites.includes(food.foodName)
                        ? "marked"
                        : "default",
                      className: "",
                    })}
                  />
                </button>

                <img src={food.imageUrl} alt={food.foodName} />

                <span className="flex items-center justify-center gap-1 text-sm">
                  {food.foodName} <ChevronRight className="w-4" />
                </span>

                <span className="text-cake_200">R$ {food.price}</span>

                <div className="mb-1 flex items-center justify-center gap-3.5">
                  <button>
                    <Minus />
                  </button>
                  <span>{food.qtd}</span>
                  <button>
                    <Plus />
                  </button>
                </div>

                <Button>Incluir</Button>
              </div>
            ))}
        </div>

        {showRightButton && (
          <button
            onClick={scrollRight}
            className="absolute bottom-0 right-5 top-0 z-20 hidden lg:block"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        )}
      </div>
    </section>
  );
}
