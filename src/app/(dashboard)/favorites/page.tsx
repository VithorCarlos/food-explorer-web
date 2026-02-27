"use client";
import { useProductStore } from "@/providers/product-provider";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Favorites() {
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 12;

  const favorites = useProductStore((state) => state.favorites);
  const handleFavorites = useProductStore((state) => state.handleFavorites);
  const loadFavorites = useProductStore((state) => state.loadFavorites);
  const hasFetched = useRef(false);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    const { hasMore: newHasMore, nextPage } = await loadFavorites(
      page,
      perPage,
    );

    setHasMore(newHasMore);
    setPage(nextPage ?? 1);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchInitialFavs = async () => {
      setIsFetching(true);
      const { hasMore, nextPage } = await loadFavorites(1, perPage);

      setHasMore(hasMore);
      setPage(nextPage ?? 1);

      setIsFetching(false);
    };

    fetchInitialFavs();
  }, []);

  return (
    <section className="mx-auto mb-10 h-screen max-w-6xl px-8 ">
      <h1 className="my-8 text-3xl font-medium">Meus favoritos</h1>

      {isFetching && (
        <div className="mt-20 animate-pulse text-center text-light_400">
          Buscando seus pratos favoritos...
        </div>
      )}

      {!isFetching && favorites.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center gap-4">
          <p className="text-xl text-light_400">
            Você ainda não tem nenhum prato favorito.
          </p>
          <Link
            href="/"
            className="text-tomato_300 transition-colors hover:text-tomato_400"
          >
            Explorar o cardápio
          </Link>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-12   md:gap-8">
        {!isFetching &&
          favorites &&
          favorites.map((favorite) => (
            <div
              key={favorite.productId}
              className="flex w-full basis-full items-center gap-3 sm:basis-[46%] md:basis-[30%]"
            >
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={favorite.attachmentUrl}
                alt={`Imagem ${favorite.title}`}
              />
              <div className="flex w-max flex-col items-start justify-start gap-1">
                <span className="text-xl font-medium">{favorite.title}</span>
                <button
                  className="text-start text-xs text-tomato_400"
                  onClick={() => handleFavorites(favorite)}
                >
                  Remover dos favoritos
                </button>
              </div>
            </div>
          ))}
      </div>

      {!isFetching && favorites.length > 0 && hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="text-light_100 flex items-center gap-2 rounded bg-dark_900 px-6 py-3 text-sm font-medium transition-colors hover:bg-dark_950 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              "Carregar mais pratos"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
