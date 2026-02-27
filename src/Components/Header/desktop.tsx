import { LogOut, Search } from "lucide-react";
import { ExplorerLogo } from "../explorer-logo";
import Link from "next/link";
import { Form } from "@/components/input";
import { IconReceipt } from "@/components/header/icon-receipt";

export interface DesktopProps {
  isAdmin: boolean;
}

export function Desktop({ isAdmin }: DesktopProps) {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/";
  };

  return (
    <div className="hidden bg-dark_700 lg:block">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between gap-8 px-7">
        <Link href="/" className="flex flex-col items-center">
          <ExplorerLogo className="w-max text-xl" />
          {isAdmin && (
            <span className="-mt-3 self-end text-xs text-cake_200">admin</span>
          )}
        </Link>

        <Form.Root className="flex-grow">
          <Form.Viewport className="px-3.5 py-3.5">
            <Search className="h-5 w-5  text-light_400" />

            <Form.Search
              id="search"
              type="text"
              placeholder="Busque por pratos ou ingredientes"
            />
          </Form.Viewport>
        </Form.Root>

        {!isAdmin && (
          <Link href="/favorites" className="min-w-max">
            <span className="text-sm">Meus favoritos</span>
          </Link>
        )}

        <Link href="/account" className="min-w-max">
          <span className="text-sm">Minha conta</span>
        </Link>

        {!isAdmin ? (
          <button className="flex h-14 w-56 items-center justify-center gap-2 rounded-md  bg-tomato_100 px-8 py-6">
            <IconReceipt className="h-7 w-7" />
            <span className="text-sm">Pedidos</span>
            <span className="text-sm">(0)</span>
          </button>
        ) : (
          <Link href="/dish/create">
            <button className="flex h-14 w-56 items-center justify-center gap-2 rounded-md bg-tomato_100 px-8 py-6">
              <span className="text-sm">Novo prato</span>
            </button>
          </Link>
        )}

        <button>
          <LogOut onClick={handleLogout} className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
