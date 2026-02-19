"use client";
import { Toast } from "./toast";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Toast />
      {children}
    </>
  );
};
