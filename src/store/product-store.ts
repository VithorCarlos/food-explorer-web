import { FavoriteDTO } from "@/dto/favorite.dto";
import { ProductDTO } from "@/dto/product.dto";
import { fetchAddFavorite } from "@/services/favorites/fetch-add-favorite";
import { fetchRemoveFavorite } from "@/services/favorites/fetch-delete-favorite";
import { fetchFindManyFavorite } from "@/services/favorites/fetch-find-many-favorites";
import { createStore } from "zustand";

export interface ProductState {
  favorites: ProductDTO[];
  userId: string;
  handleFavorites: (product: ProductDTO) => Promise<boolean>;
  quantities: { [id: string]: number };
  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
  loadFavorites: (
    page: number,
    perPage: number,
  ) => Promise<{ hasMore: boolean; nextPage: number | null }>;
}

export type ProductStore = ReturnType<typeof createProductStore>;

export const createProductStore = (initState: Partial<ProductState>) => {
  return createStore<ProductState>((set, get) => {
    function addQuantity(id: string) {
      return set((state) => ({
        quantities: {
          ...state.quantities,
          [id]:
            (state.quantities[id] || 1) < 20
              ? (state.quantities[id] || 1) + 1
              : state.quantities[id] || 1,
        },
      }));
    }

    function removeQuantity(id: string) {
      return set((state) => ({
        quantities: {
          ...state.quantities,
          [id]:
            (state.quantities[id] || 1) > 1
              ? (state.quantities[id] || 1) - 1
              : 1,
        },
      }));
    }

    async function loadFavorites(page: number = 1, perPage = 12) {
      const currentState = get();
      const { favorites, success, pagination } = await fetchFindManyFavorite(
        String(page),
        String(perPage),
        currentState.userId,
      );
      if (success && favorites) {
        const formattedFavorites: ProductDTO[] = favorites.map(
          (fav: FavoriteDTO) => ({
            ...fav,
            isFavorited: true,
          }),
        );

        set((state) => {
          if (page === 1) return { favorites: formattedFavorites };

          const existingIds = new Set(
            state.favorites.map((f: ProductDTO) => f.productId),
          );

          const uniqueNewFavs = formattedFavorites.filter(
            (f) => !existingIds.has(f.productId),
          );

          return { favorites: [...state.favorites, ...uniqueNewFavs] };
        });
        return {
          hasMore: pagination.hasMore,
          nextPage: pagination.nextPage,
        };
      }
      return { hasMore: false, nextPage: null };
    }

    async function handleFavorites(data: ProductDTO) {
      const currentState = get();

      const isFavorited =
        data.isFavorited ??
        currentState.favorites.some((fav) => fav.productId === data.productId);

      if (isFavorited) {
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.productId !== data.productId,
          ),
        }));

        const { success } = await fetchRemoveFavorite(
          data.productId,
          currentState.userId,
        );
        if (!success) {
          set((state) => ({ favorites: [data, ...state.favorites] }));
          return false;
        }
        return true;
      } else {
        const productToAdd = { ...data, isFavorited: true };

        set((state) => ({
          favorites: [productToAdd, ...state.favorites],
        }));

        const response = await fetchAddFavorite(
          data.productId,
          currentState.userId,
        );

        if (!response.success) {
          console.error("Unexpected error on ADD favorites");
          set((state) => ({
            favorites: state.favorites.filter(
              (favorite) => favorite.productId !== data.productId,
            ),
          }));
          return false;
        }
        return true;
      }
    }

    return {
      quantities: {},
      favorites: [],
      userId: "",
      addQuantity,
      loadFavorites,
      removeQuantity,
      handleFavorites,
      ...initState,
    };
  });
};
