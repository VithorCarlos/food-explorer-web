"use client";

import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export function Toast() {
  return (
    <Suspense>
      <ToastContainer />
    </Suspense>
  );
}
