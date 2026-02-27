"use client";
import {
  createProductStore,
  ProductState,
  ProductStore,
} from "@/store/product-store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

interface ProductContextProvider {
  children: ReactNode;
  initialState: Partial<ProductState>;
}

export const ProductContext = createContext<ProductStore | null>(null);

export const ProductProvider = ({
  children,
  initialState,
}: ProductContextProvider) => {
  const storeRef = useRef<ProductStore>(null);

  if (!storeRef.current) {
    storeRef.current = createProductStore(initialState);
  }

  return (
    <ProductContext.Provider value={storeRef.current}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductStore = <T,>(selector: (state: ProductState) => T) => {
  const store = useContext(ProductContext);

  if (!store) {
    throw new Error("Missing ProductProvider");
  }

  return useStore(store, selector);
};
