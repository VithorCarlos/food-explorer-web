"use client";
import { Logo } from "@/components/Logo";
import { Menu, Search, X } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Input from "@/components/Input";
import { ComponentRef, useRef, useState } from "react";
import { IconReceipt } from "./IconReceipt";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const collapseRef = useRef<ComponentRef<"div">>(null);
  const isAdmin = false;

  function handleToggle() {
    const collapseState = collapseRef.current?.getAttribute("data-state");

    if (collapseState === "open") {
      setMenuIsOpen(false);
    } else {
      setMenuIsOpen(true);
    }
  }
  return (
    <Collapsible.Root ref={collapseRef}>
      <div className="flex h-[7.125rem] items-center justify-between overflow-hidden bg-dark_700 px-7">
        <Collapsible.Trigger asChild className="lg:hidden ">
          <button
            onClick={handleToggle}
            className="p-2 shadow-none data-[state=open]:rounded-md data-[state=open]:bg-dark_900"
          >
            {menuIsOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </Collapsible.Trigger>

        <div className="mx-auto flex items-center gap-2">
          <Logo className="text-xl" />
          {isAdmin && <span className="text-xs text-cake_200">admin</span>}
        </div>

        {!isAdmin && (
          <IconReceipt count={5} className="relative  h-[22px] w-[26px]" />
        )}
      </div>

      <Collapsible.Content className="bg-dar_400 mt-9 flex flex-1 flex-col  space-y-9 px-7">
        <Input.Root>
          <Input.Viewport>
            <Search className="h-5 w-5 text-light_400" />

            <Input.Control
              id="email"
              type="email"
              placeholder="Exemplo: exemplo@hotmail.com"
            />
          </Input.Viewport>
        </Input.Root>

        <div className="relative">
          <span className="text-2xl font-light outline-none">Sair</span>
          <div className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-dark_950"></div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
