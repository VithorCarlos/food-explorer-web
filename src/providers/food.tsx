"use client";
import { createFoodStore, FoodState, FoodStore } from "@/store/food-store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

interface FoodContextProvider {
  children: ReactNode;
  initialState: Partial<FoodState>;
}

export const FoodContext = createContext<FoodStore | null>(null);

export const FoodProvider = ({
  children,
  initialState,
}: FoodContextProvider) => {
  const storeRef = useRef<FoodStore>(null);

  if (!storeRef.current) {
    storeRef.current = createFoodStore(initialState);
  }

  return (
    <FoodContext.Provider value={storeRef.current}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodStore = <T,>(selector: (state: FoodState) => T) => {
  const store = useContext(FoodContext);

  if (!store) {
    throw new Error("Missing FoodProvider");
  }

  return useStore(store, selector);
};
