import { FoodPropsDTO } from "@/dto/food.dto";
import { create } from "zustand";

interface FoodStore {
  favorites: FoodPropsDTO[];
  handleFavorites: (food: FoodPropsDTO) => void;
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

  function handleFavorites(food: FoodPropsDTO) {
    return set((state) => {
      const isFavorited = state.favorites.some(
        (favorite) => favorite.id === food.id,
      );

      if (isFavorited) {
        return {
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== food.id,
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
