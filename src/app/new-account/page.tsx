import { Button } from "@/Components/Button";
import * as Input from "@/Components/Input";
import { Logo } from "@/Components/Logo";
import Link from "next/link";

export default function NewAccount() {
  return (
    <section className="w-full">
      <div className="flex  h-screen flex-col items-center justify-center gap-[4.375rem]">
        <Logo className="text-4xl" />

        <form
          action=""
          className="flex w-full flex-col items-center space-y-8 px-10"
        >
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

          <Button type="button" title="Criar conta" />

          <Link href="/" className="text-sm">
            Já tenho uma conta
          </Link>
        </form>
      </div>
    </section>
  );
}
