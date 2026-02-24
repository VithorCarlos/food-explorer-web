import { SnackDTO } from "@/dto/snack.dto";
import { create } from "zustand";

interface FoodStore {
  favorites: SnackDTO[];
  handleFavorites: (food: SnackDTO) => void;
  quantities: { [id: string]: number };
  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
}

export const useFood = create<FoodStore>()((set) => {
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
          (state.quantities[id] || 1) > 1 ? (state.quantities[id] || 1) - 1 : 1,
      },
    }));
  }

  async function handleFavorites(food: SnackDTO) {
    console.log(food);
    return set((state) => {
      const isFavorited = state.favorites.some(
        (favorite) => favorite.snackId === food.snackId,
      );

      if (isFavorited) {
        return {
          favorites: state.favorites.filter(
            (favorite) => favorite.snackId !== food.snackId,
          ),
        };
      }

      return {
        favorites: [food, ...state.favorites],
      };
    });
  }

  return {
    quantities: {},
    favorites: [],
    addQuantity,
    removeQuantity,
    handleFavorites,
  };
});
