"use client";
import { Button } from "@/Components/Button";
import { Logo } from "@/Components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Input from "@/Components/Input";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <section className="w-full">
      <h1 className="sr-only">Food Explorer</h1>
      <p className="sr-only">
        Cardápio digital para consumir os melhores petiscos
      </p>

      <div className="flex  h-screen flex-col items-center justify-center gap-[4.375rem]">
        <Logo className="text-4xl" />
        
        <form className="flex w-full flex-col items-center space-y-8 px-10">
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

          <Button type="button" onClick={handleRedirect} title="Entrar" />

          <Link href="/new-account" className="text-sm">
            Criar conta
          </Link>
        </form>
      </div>
    </section>
  );
}
