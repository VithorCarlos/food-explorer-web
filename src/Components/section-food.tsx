"use client";

import { Button } from "@/components/button";
import { ButtonQuantity } from "@/components/button-quantity";
import { shortDescription } from "@/utils/short-description";
import { ChevronLeft, ChevronRight, Edit3, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { Currency } from "./currency";
import { useFood } from "@/store/useFood";
import { SnackDTO } from "@/dto/snack.dto";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { fetchSearchFoods } from "@/api/food.api";
import { CardFoodSkeleton } from "./section-food-skeleton";

export interface SectionFoodProps extends ComponentProps<"section"> {
  initialData: SnackDTO[];
  title: string;
  category: FOOD_CATEGORIES;
  isAdmin: boolean;
  searchQuery?: string;
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
  initialData,
  category,
  isAdmin,
  searchQuery,
  ...props
}: SectionFoodProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(
    initialData.length >= 4,
  );

  const [foods, setFoods] = useState<SnackDTO[]>(initialData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length >= 4);
  const isLoadingRef = useRef(false);
  const [favorites, handleFavorites] = useFood((state) => [
    state.favorites,
    state.handleFavorites,
  ]);

  const checkIsFavorite = (snackId: string) => {
    if (!isMounted) return false;
    return favorites.some((favorite) => favorite.snackId === snackId);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      // Deixe apenas isso! O ato de rolar vai acionar o 'handleScroll' automaticamente
      scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  const loadMoreFoods = async () => {
    if (isLoading || !hasMore) return;
    const search = searchQuery || undefined;
    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const newFoods = await fetchSearchFoods({
        category,
        page: String(nextPage),
        title: search,
        ingredients: search ? [search] : undefined,
      });

      if (!newFoods || newFoods.length === 0) {
        setHasMore(false);
      } else {
        setFoods((prev) => {
          const existingIds = new Set(prev.map((f) => f.snackId));
          const uniqueNewFoods = newFoods.filter(
            (food: SnackDTO) => !existingIds.has(food.snackId),
          );
          return [...prev, ...uniqueNewFoods];
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(
        Math.ceil(scrollLeft + clientWidth) < scrollWidth || hasMore,
      );

      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 200) {
        if (hasMore && !isLoading) {
          loadMoreFoods();
        }
      }
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, page, category, searchQuery]);

  return (
    <section {...props}>
      <h2 className="mb-6 text-lg font-medium lg:text-3xl">{title}</h2>
      <div className="relative select-none">
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className="absolute -left-9 bottom-0 top-0 z-20 hidden lg:block"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="no-scrollbar relative flex w-full flex-nowrap gap-4 overflow-x-auto scroll-smooth"
        >
          {!!foods &&
            foods.map((food) => {
              const isFavorited = checkIsFavorite(food.snackId);

              return (
                <div
                  key={food.snackId}
                  className="relative flex min-w-[320px] shrink-0 flex-col items-center justify-center gap-3 rounded border border-dark_300 bg-dark_200 p-6"
                >
                  {isAdmin ? (
                    <Link href={`/dish/${food.snackId}/edit`}>
                      <button className="absolute right-4 top-4 hover:scale-105">
                        <Edit3 className="text-white" />
                      </button>
                    </Link>
                  ) : (
                    <button onClick={() => handleFavorites(food)}>
                      <Heart
                        data-favorited={isFavorited}
                        className={heart({
                          color: isFavorited ? "marked" : "default",
                        })}
                      />
                    </button>
                  )}

                  <Link
                    className="h-24 w-24 lg:h-44 lg:w-44"
                    href={`/${food.snackId}`}
                  >
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={food.attachmentUrl}
                      alt={food.title}
                    />
                  </Link>

                  <Link href={`/${food.snackId}`}>
                    <span className="flex items-center justify-center gap-1 text-xl">
                      {food.title} <ChevronRight className="w-4" />
                    </span>
                  </Link>

                  <p className="w-full text-center text-sm text-light_400">
                    {shortDescription(food.description)}
                  </p>

                  <Currency
                    id={food.snackId}
                    price={food?.price!}
                    color="cake_200"
                  />

                  {!isAdmin && (
                    <>
                      <ButtonQuantity id={food.snackId} />
                      <Button>Incluir</Button>
                    </>
                  )}
                </div>
              );
            })}

          {isLoading && <CardFoodSkeleton />}
        </div>

        {showRightButton && (
          <button
            onClick={scrollRight}
            className="absolute -right-9 bottom-0 top-0 z-20 hidden lg:block"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        )}
      </div>
    </section>
  );
}
