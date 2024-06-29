import { create } from "zustand";

interface FoodStore {
  quantities: { [id: string]: number };
  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
}

export const useFood = create<FoodStore>()((set) => ({
  quantities: {},
  addQuantity: (id) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [id]:
          (state.quantities[id] || 1) < 20
            ? (state.quantities[id] || 1) + 1
            : state.quantities[id] || 1,
      },
    })),
  removeQuantity: (id) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [id]:
          (state.quantities[id] || 1) > 1 ? (state.quantities[id] || 1) - 1 : 1,
      },
    })),
}));
