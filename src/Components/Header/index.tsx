"use client";

import { Desktop } from "./desktop";
import { Mobile } from "./mobile";

export function Header() {
  const isAdmin = false;

  return (
    <header>
      <Mobile {...{ isAdmin }} />
      <Desktop {...{ isAdmin }} />
    </header>
  );
}
