import { ProductDTO } from "@/dto/product.dto";
import { fetchAddFavorite } from "@/services/favorites/fetch-add-favorite";
import { fetchRemoveFavorite } from "@/services/favorites/fetch-delete-favorite";
import { fetchFindManyFavorite } from "@/services/favorites/fetch-find-many-favorites";
import { createStore } from "zustand";

export interface ProductState {
  favorites: ProductDTO[];
  userId: string;
  handleFavorites: (product: ProductDTO) => void;
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
        set((state) => {
          if (page === 1) return { favorites: favorites };

          const existingIds = new Set(state.favorites.map((f) => f.productId));

          const uniqueNewFavs = favorites.filter(
            (f: ProductDTO) => !existingIds.has(f.productId),
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

      const favOnState = new Set(
        currentState.favorites.map((fav) => fav.productId),
      );

      const isFavorited = favOnState.has(data.productId);

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
        }
      } else {
        set((state) => ({
          favorites: [data, ...state.favorites],
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
        }
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
