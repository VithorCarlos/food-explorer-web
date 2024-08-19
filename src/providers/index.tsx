"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = async ({ children }: ProviderProps) => {
  return (
    <>
      <Suspense>
        <ToastContainer />
      </Suspense>
      {children}
    </>
  );
};
