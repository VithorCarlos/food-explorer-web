import { SnackDTO } from "@/dto/snack.dto";
import { fetchAddFavorite } from "@/services/favorites/fetch-add-favorite";
import { fetchRemoveFavorite } from "@/services/favorites/fetch-delete-favorite";
import { fetchFindManyFavorite } from "@/services/favorites/fetch-find-many-favorites";
import { createStore } from "zustand";

export interface FoodState {
  favorites: SnackDTO[];
  userId: string;
  handleFavorites: (food: SnackDTO) => void;
  quantities: { [id: string]: number };
  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
  loadFavorites: (
    page: number,
    perPage: number,
  ) => Promise<{ hasMore: boolean; nextPage: number | null }>;
}

export type FoodStore = ReturnType<typeof createFoodStore>;

export const createFoodStore = (initState: Partial<FoodState>) => {
  return createStore<FoodState>((set, get) => {
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

          const existingIds = new Set(state.favorites.map((f) => f.snackId));

          const uniqueNewFavs = favorites.filter(
            (f: SnackDTO) => !existingIds.has(f.snackId),
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

    async function handleFavorites(data: SnackDTO) {
      const currentState = get();

      const favOnState = new Set(
        currentState.favorites.map((fav) => fav.snackId),
      );

      const isFavorited = favOnState.has(data.snackId);

      if (isFavorited) {
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.snackId !== data.snackId,
          ),
        }));

        const { success } = await fetchRemoveFavorite(
          data.snackId,
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
          data.snackId,
          currentState.userId,
        );

        if (!response.success) {
          console.error("Unexpected error on ADD favorites");
          set((state) => ({
            favorites: state.favorites.filter(
              (favorite) => favorite.snackId !== data.snackId,
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
