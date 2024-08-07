"use client";
import { Button } from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExplorerLogo } from "@/components/explorer-logo";
import { Form } from "@/components/input";

export default function Login() {
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

      <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-[4.375rem] lg:flex-row lg:gap-36 lg:px-8 xl:gap-72">
        <ExplorerLogo className="text-4xl lg:w-80" />

        <form className="flex w-full flex-col items-center space-y-8 rounded-2xl px-10 lg:bg-dark_700 lg:px-16 lg:py-16">
          <h2 className="sr-only text-3xl font-medium text-light_200 lg:not-sr-only">
            Faça login
          </h2>
          <Form.Root>
            <Form.Label title="Email" htmlFor="email" />
            <Form.Viewport>
              <Form.Input
                id="email"
                type="email"
                placeholder="Exemplo: exemplo@hotmail.com"
              />
            </Form.Viewport>
          </Form.Root>

          <Form.Root>
            <Form.Label title="Senha" htmlFor="passowrd" />
            <Form.Viewport>
              <Form.Input
                id="passowrd"
                type="passowrd"
                placeholder="Mínimo 6 caracteres"
              />
            </Form.Viewport>
          </Form.Root>

          <Button type="button" onClick={handleRedirect}>
            Entrar
          </Button>

          <Link href="/new-account" className="text-sm">
            Criar conta
          </Link>
        </form>
      </div>
    </section>
  );
}
