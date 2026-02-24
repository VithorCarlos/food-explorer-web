"use client";
import { useFood } from "@/store/useFood";

export default function Favorites() {
  const [dishesFavorited, handleFavorites] = useFood((state) => [
    state.favorites,
    state.handleFavorites,
  ]);

  return (
    <section className="mx-auto mb-10 h-screen max-w-6xl px-8">
      <h1 className="my-8 text-3xl font-medium">Meus favoritos</h1>

      <div className="flex flex-wrap items-center justify-center gap-12 md:justify-start md:gap-8">
        {dishesFavorited &&
          dishesFavorited.map((favorite) => (
            <div className="flex w-full basis-full items-center gap-3 sm:basis-[46%] md:basis-[30%] lg:basis-[21%] ">
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
    </section>
  );
}
