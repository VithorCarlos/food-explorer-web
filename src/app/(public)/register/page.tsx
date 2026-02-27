"use client";
import Button from "@/components/button";
import { ExplorerLogo } from "@/components/explorer-logo";
import { Form } from "@/components/input";
import Link from "next/link";
import { FormProps, schema } from "./form";
import { showToast } from "@/utils/toast-message";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { RequestErrorApi } from "@/utils/errors/request-error";
import { fetchCreateUser } from "@/services/user/fetch-create-user";
import { USER_ERRORS_TRANSLATE } from "@/utils/translations/user-errors-translate";

export default function register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const createUser = async (data: FormProps) => {
    setIsFetching(true);

    const { name, email, password } = data;

    try {
      const response = await fetchCreateUser({ name, email, password });

      if (response.ok) {
        replace("/login");
        reset();
        return showToast({
          type: "success",
          content: "Conta criada com sucesso! Faça o login...",
        });
      }
    } catch (err) {
      if (err instanceof RequestErrorApi) {
        return showToast({
          type: "error",
          content: USER_ERRORS_TRANSLATE[err.message],
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <section className="w-full">
      <h2 className="sr-only">Crie sua conta no Product Explorer</h2>
      <p className="sr-only">Crie sua conta em nosso Cardápio digital</p>

      <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-[4.375rem] lg:flex-row lg:gap-36  lg:px-8 xl:gap-72">
        <ExplorerLogo className="text-4xl lg:w-80" />

        <form
          onSubmit={handleSubmit(createUser)}
          className="flex w-full flex-col items-center space-y-8 px-10 lg:bg-dark_700 lg:px-16 lg:py-16"
        >
          <h2 className="sr-only text-3xl font-medium text-light_200 lg:not-sr-only">
            Crie sua Conta
          </h2>
          <Form.Root>
            <Form.Label title="Seu nome" htmlFor="name" />
            <Form.Viewport>
              <Form.Input
                id="name"
                placeholder="Informe seu nome"
                hasError={!!errors.name}
                {...register("name")}
              />
            </Form.Viewport>
            {errors.name?.message && (
              <Form.Error message={errors.name?.message} />
            )}
          </Form.Root>

          <Form.Root>
            <Form.Label title="Email" htmlFor="email" />
            <Form.Viewport>
              <Form.Input
                id="email"
                type="email"
                hasError={!!errors.email}
                placeholder="exemplo@hotmail.com"
                {...register("email")}
              />
            </Form.Viewport>
            {errors.email?.message && (
              <Form.Error message={errors.email?.message} />
            )}
          </Form.Root>

          <Form.Root>
            <Form.Label title="Senha" htmlFor="password" />
            <Form.Viewport>
              <Form.Input
                id="password"
                type={showPassword ? "text" : "password"}
                hasError={!!errors.password}
                placeholder="Mínimo 6 caracteres"
                {...register("password")}
              />
              <button
                className="mr-3.5 h-full"
                type="button"
                onClick={() => setShowPassword((state) => !state)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </Form.Viewport>
            {errors.password?.message && (
              <Form.Error message={errors.password?.message} />
            )}
          </Form.Root>

          <Form.Root>
            <Form.Label
              title="Confirmação de senha"
              htmlFor="confirm_password"
            />
            <Form.Viewport>
              <Form.Input
                id="confirm_password"
                type="password"
                hasError={!!errors.password}
                placeholder="Digite sua senha novamente"
                {...register("confirm_password")}
              />
            </Form.Viewport>
            {errors.confirm_password?.message && (
              <Form.Error message={errors.confirm_password?.message} />
            )}
          </Form.Root>

          <Button isLoading={isFetching} type="submit">
            Criar Conta
          </Button>

          <Link href="/" className="text-sm">
            Já tenho uma conta
          </Link>
        </form>
      </div>
    </section>
  );
}
