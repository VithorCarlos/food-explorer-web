"use client";

import { Desktop } from "./desktop";
import { Mobile } from "./mobile";

interface HeaderProps {
  isAdmin: boolean;
}

export function Header({ isAdmin }: HeaderProps) {
  return (
    <header>
      <Mobile {...{ isAdmin }} />
      <Desktop {...{ isAdmin }} />
    </header>
  );
}
