"use client";

import { Button } from "@/components/button";
import { ButtonQuantity } from "@/components/button-quantity";
import { shortDescription } from "@/utils/short-description";
import { ChevronLeft, ChevronRight, Edit3, Heart } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { Currency } from "./currency";
import { useFood } from "@/store/useFood";
import { SnackDTO } from "@/dto/snack.dto";

export interface SectionFoodProps extends ComponentProps<"section"> {
  data: SnackDTO[];
  title: string;
  isAdmin: boolean;
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
  title,
  data,
  isAdmin,
  ...props
}: SectionFoodProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const [favorites, handleFavorites] = useFood((state) => [
    state.favorites,
    state.handleFavorites,
  ]);

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
          className="no-scrollbar relative flex flex-grow gap-4 overflow-x-auto"
        >
          {!!data &&
            data.map((food) => (
              <div
                key={food.id}
                className="relative flex min-w-52 flex-col items-center justify-center gap-3 rounded border border-dark_300 bg-dark_200 p-6"
              >
                {isAdmin ? (
                  <Link href={`/dish/edit?id=${food.id}`}>
                    <button className="absolute right-4 top-4 hover:scale-105">
                      <Edit3 className="text-white" />
                    </button>
                  </Link>
                ) : (
                  <button onClick={() => handleFavorites(food)}>
                    <Heart
                      data-favorited={favorites.some(
                        (favorite) => favorite.id === food.id,
                      )}
                      className={heart({
                        color: favorites.some(
                          (favorite) => favorite.id === food.id,
                        )
                          ? "marked"
                          : "default",
                      })}
                    />
                  </button>
                )}

                <Link
                  className="h-24 w-24 lg:h-44 lg:w-44"
                  href={`/${food.id}`}
                >
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={food.imageUrl}
                    alt={food.title}
                  />
                </Link>

                <Link href={`/${food.id}`}>
                  <span className="flex items-center justify-center gap-1 text-sm">
                    {food.title} <ChevronRight className="w-4" />
                  </span>
                </Link>

                <p className="w-full text-center text-sm text-light_400">
                  {shortDescription(food.description)}
                </p>

                <Currency id={food.id} price={food?.price!} color="cake_200" />

                <ButtonQuantity id={food.id} />

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
