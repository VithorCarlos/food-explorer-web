"use client";

import Button from "@/components/button";
import { ButtonQuantity } from "@/components/button-quantity";
import { shortDescription } from "@/utils/short-description";
import { ChevronLeft, ChevronRight, Edit3, Heart } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { Currency } from "./currency";
import { ProductDTO } from "@/dto/product.dto";
import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";
import { CardProductSkeleton } from "./section-product-skeleton";
import { useProductStore } from "@/providers/product-provider";
import { fetchSearchProducts } from "@/services/products/fetch-search-products";

export interface SectionProductProps extends ComponentProps<"section"> {
  initialData: ProductDTO[];
  title?: string;
  category?: PRODUCT_CATEGORIES;
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

export function SectionProduct({
  title,
  initialData,
  category,
  isAdmin,
  searchQuery,
  ...props
}: SectionProductProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const favorites = useProductStore((state) => state.favorites);
  const handleFavorites = useProductStore((state) => state.handleFavorites);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(
    initialData.length >= 4,
  );

  const [products, setProducts] = useState<ProductDTO[]>(initialData);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length >= 4);

  const favoriteIds = new Set(favorites.map((fav) => fav.productId));

  const checkIsFavorite = (productId: string) => {
    return favoriteIds.has(productId);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  const loadMoreProducts = async () => {
    if (isLoading || !hasMore) return;
    const search = searchQuery || undefined;
    setIsLoading(true);
    const { products, pagination } = await fetchSearchProducts({
      category,
      page: String(page),
      title: search,
      ingredients: search ? [search] : undefined,
    });
    setHasMore(pagination.hasMore);
    setProducts((prev) => {
      const existingIds = new Set(prev.map((f) => f.productId));
      const uniqueNewProducts = products.filter(
        (product: ProductDTO) => !existingIds.has(product.productId),
      );
      return [...prev, ...uniqueNewProducts];
    });
    setPage(pagination.nextPage ?? 1);
    setIsLoading(false);
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
          loadMoreProducts();
        }
      }
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, page, category, searchQuery]);

  useEffect(() => {
    setProducts(initialData);
    setPage(2);
    setHasMore(initialData.length >= 4);
  }, [initialData]);

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
          className="no-scrollbar relative flex w-full flex-nowrap gap-4 overflow-x-auto "
        >
          {!!products &&
            products.map((product) => {
              const isFavorited = checkIsFavorite(product.productId);

              return (
                <div
                  key={product.productId}
                  className="relative flex min-w-[320px] shrink-0 flex-col items-center justify-center gap-3 rounded border border-dark_300 bg-dark_200 p-6"
                >
                  {isAdmin ? (
                    <Link href={`/dish/${product.productId}/edit`}>
                      <button className="absolute right-4 top-4 hover:scale-105">
                        <Edit3 className="text-white" />
                      </button>
                    </Link>
                  ) : (
                    <button onClick={() => handleFavorites(product)}>
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
                    href={`/${product.productId}`}
                  >
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={
                        product.attachmentUrl ||
                        "/images/default-image-product.webp"
                      }
                      alt={product.title}
                    />
                  </Link>

                  <Link href={`/${product.productId}`}>
                    <span className="flex items-center justify-center gap-1 text-xl">
                      {product.title} <ChevronRight className="w-4" />
                    </span>
                  </Link>

                  <p className="w-full text-center text-sm text-light_400">
                    {shortDescription(product.description)}
                  </p>

                  <Currency
                    id={product.productId}
                    price={product?.price!}
                    color="cake_200"
                  />

                  {!isAdmin && (
                    <>
                      <ButtonQuantity id={product.productId} />
                      <Button asChild>
                        <Link href={`/${product.productId}`}>Incluir</Link>
                      </Button>
                    </>
                  )}
                </div>
              );
            })}

          {isLoading && <CardProductSkeleton />}
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
