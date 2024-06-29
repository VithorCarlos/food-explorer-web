import { LogOut, Search } from "lucide-react";
import * as Input from "@/components/input";
import { ExplorerLogo } from "../explorer-logo";
import { IconReceipt } from "./IconReceipt";

export interface DesktopProps {
  isAdmin: boolean;
}

export function Desktop({ isAdmin }: DesktopProps) {
  return (
    <div className="hidden bg-dark_700 lg:block">
      <div className="mx-auto flex h-28 max-w-6xl items-center justify-between gap-8 overflow-hidden  px-7">
        <div className="flex items-center gap-2">
          <ExplorerLogo className="text-xl" />
          {isAdmin && <span className="text-xs text-cake_200">admin</span>}
        </div>

        <Input.Root className="flex-grow">
          <Input.Viewport>
            <Search className="h-5 w-5 text-light_400" />

            <Input.Control
              id="email"
              type="email"
              placeholder="Busque por pratos ou ingredientes"
            />
          </Input.Viewport>
        </Input.Root>

        {!isAdmin && (
          <button className="flex h-14 w-56 items-center justify-center gap-2  rounded-md bg-tomato_100 py-6">
            <IconReceipt className="h-7 w-7" />
            <span className="text-sm">Pedidos</span>
          </button>
        )}

        <button>
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
