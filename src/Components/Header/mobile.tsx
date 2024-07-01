import * as Collapsible from "@radix-ui/react-collapsible";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { ExplorerLogo } from "../explorer-logo";
import { IconReceipt } from "./icon-receipt";
import { Form } from "../input";
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

  return (
    <Collapsible.Root className="lg:hidden">
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

        <Link href="/dashboard" className="mx-auto flex items-center gap-2">
          <ExplorerLogo className="text-xl" />
          {isAdmin && <span className="text-xs text-cake_200">admin</span>}
        </Link>

        {!isAdmin && <IconReceipt count={5} className="relative h-6 w-6" />}
      </div>

      <Collapsible.Content className="mt-9 flex flex-col space-y-9 overflow-y-auto bg-dark_400 px-7 data-[state=open]:h-screen">
        <Form.Root>
          <Form.Viewport>
            <Search className="h-5 w-5 text-light_400" />

            <Form.Input
              id="email"
              type="email"
              placeholder="Exemplo: exemplo@hotmail.com"
            />
          </Form.Viewport>
        </Form.Root>

        <div className="relative">
          <span className="text-2xl font-light outline-none">Sair</span>
          <div className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-dark_950"></div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
