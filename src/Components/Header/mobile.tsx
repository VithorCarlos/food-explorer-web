import * as Collapsible from "@radix-ui/react-collapsible";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { ExplorerLogo } from "../explorer-logo";
import { IconReceipt } from "@/components/header/icon-receipt";
import { Form } from "@/components/input";
import Link from "next/link";

interface MobileProps {
  isAdmin: boolean;
}

export function Mobile({ isAdmin }: MobileProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggle() {
    if (menuIsOpen) {
      setMenuIsOpen(false);
      document.body.classList.remove("scroll-none");
    } else {
      setMenuIsOpen(true);
      document.body.classList.add("scroll-none");
    }
  }

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/";
  };

  return (
    <Collapsible.Root
      open={menuIsOpen}
      onOpenChange={handleToggle}
      className="lg:hidden"
    >
      <div className="flex h-[7.125rem] items-center justify-between overflow-hidden bg-dark_700 px-7">
        <Collapsible.Trigger asChild>
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

        <Link href="/" className="mx-auto flex items-center gap-2">
          <ExplorerLogo className="text-xl" />
          {isAdmin && <span className="text-xs text-cake_200">admin</span>}
        </Link>

        {!isAdmin && <IconReceipt count={5} className="relative h-6 w-6" />}
      </div>

      <Collapsible.Content className="mt-9 flex flex-col space-y-9 overflow-y-auto bg-dark_400 px-7 data-[state=open]:h-screen">
        <Form.Root>
          <Form.Viewport className="px-3.5 py-3.5">
            <Search className="h-5 w-5 text-light_400" />

            <Form.Search
              id="search"
              type="text"
              placeholder="Busque por pratos ou ingredientes"
            />
          </Form.Viewport>
        </Form.Root>

        <div className="relative flex flex-col gap-3">
          {!isAdmin && (
            <Link
              href="/favorites"
              onClick={() => setMenuIsOpen(false)}
              className="min-w-max border-b-2 border-dark_950 pb-2"
            >
              <span className="text-2xl">Meus favoritos</span>
            </Link>
          )}

          <Link
            href="/account"
            onClick={() => setMenuIsOpen(false)}
            className="min-w-max border-b-2 border-dark_950 pb-2"
          >
            <span className="text-2xl">Minha conta</span>
          </Link>

          <button
            className="w-full min-w-max border-b-2 border-dark_950 pb-2 text-left "
            onClick={handleLogout}
          >
            <span className="text-2xl">Sair</span>
          </button>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
