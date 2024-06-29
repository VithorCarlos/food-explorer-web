import { Button } from "@/components/button";
import { ExplorerLogo } from "@/components/explorer-logo";
import * as Input from "@/components/input";
import Link from "next/link";

export default function NewAccount() {
  return (
    <section className="w-full">
      <h2 className="sr-only">Crie sua conta no Food Explorer</h2>
      <p className="sr-only">Crie sua conta em nosso Cardápio digital</p>

      <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-[4.375rem] lg:flex-row lg:gap-36  lg:px-8 xl:gap-72">
        <ExplorerLogo className="text-4xl lg:w-80" />

        <form
          action=""
          className="flex w-full flex-col items-center space-y-8 px-10 lg:bg-dark_700 lg:px-16 lg:py-16"
        >
          <h2 className="sr-only text-3xl font-medium text-light_200 lg:not-sr-only">
            Crie sua Conta
          </h2>
          <Input.Root>
            <Input.Label title="Seu nome" htmlFor="name" />
            <Input.Viewport>
              <Input.Control id="name" placeholder="Exemplo: Vithor Carlos" />
            </Input.Viewport>
          </Input.Root>

          <Input.Root>
            <Input.Label title="Email" htmlFor="email" />
            <Input.Viewport>
              <Input.Control
                id="email"
                type="email"
                placeholder="Exemplo: exemplo@hotmail.com"
              />
            </Input.Viewport>
          </Input.Root>

          <Input.Root>
            <Input.Label title="Senha" htmlFor="passowrd" />
            <Input.Viewport>
              <Input.Control
                id="passowrd"
                type="passowrd"
                placeholder="Mínimo 6 caracteres"
              />
            </Input.Viewport>
          </Input.Root>

          <Button type="button">Criar Conta</Button>

          <Link href="/" className="text-sm">
            Já tenho uma conta
          </Link>
        </form>
      </div>
    </section>
  );
}
