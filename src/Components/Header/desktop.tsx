import { LogOut, Search } from "lucide-react";
import { ExplorerLogo } from "../explorer-logo";
import { IconReceipt } from "./icon-receipt";
import { Form } from "../input";
import Link from "next/link";

export interface DesktopProps {
  isAdmin: boolean;
}

export function Desktop({ isAdmin }: DesktopProps) {
  return (
    <div className="hidden bg-dark_700 lg:block">
      <div className="mx-auto flex h-28 max-w-6xl items-center justify-between gap-8 overflow-hidden  px-7">
        <Link href="/dashboard" className="flex flex-col items-center">
          <ExplorerLogo className="w-max text-xl" />
          {isAdmin && (
            <span className="-mt-3 self-end text-xs text-cake_200">admin</span>
          )}
        </Link>

        <Form.Root className="flex-grow">
          <Form.Viewport>
            <Search className="h-5 w-5 text-light_400" />

            <Form.Input
              id="email"
              type="email"
              placeholder="Busque por pratos ou ingredientes"
            />
          </Form.Viewport>
        </Form.Root>

        <Link href="/dashboard/favorites" className="min-w-max">
          <span className="text-sm">Meus favoritos</span>
        </Link>

        {!isAdmin ? (
          <button className="flex h-14 w-56 items-center justify-center gap-2 rounded-md  bg-tomato_100 px-8 py-6">
            <IconReceipt className="h-7 w-7" />
            <span className="text-sm">Pedidos</span>
            <span className="text-sm">(0)</span>
          </button>
        ) : (
          <button className="flex h-14 w-56 items-center justify-center gap-2 rounded-md bg-tomato_100 px-8 py-6">
            <span className="text-sm">Novo prato</span>
          </button>
        )}

        <button>
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
