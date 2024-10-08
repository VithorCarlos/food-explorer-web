"use client";
import { Button } from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExplorerLogo } from "@/components/explorer-logo";
import { Form } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProps, schema } from "./form";
import { showToast } from "@/utils/toast-message";
import { RequestErrorApi } from "@/utils/errors/request-error";
import { errorMessages } from "@/utils/errors/login-user";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { fetchLogin } from "@/api/user.api";
import { TOKEN } from "@/utils/enums/cookie";
import { setCookie } from "cookies-next";

export default function Login() {
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

  const loginUser = async (data: FormProps) => {
    setIsFetching(true);
    const { email, password } = data;

    try {
      const response = await fetchLogin({ email, password });
      const { accessToken } = response.data;

      setCookie(TOKEN.ACCESS_TOKEN, accessToken, {
        maxAge: 60 * 15, // 15 minutes
      });

      replace("/dashboard");
      reset();
    } catch (err) {
      if (err instanceof RequestErrorApi) {
        return showToast({
          type: "error",
          content: errorMessages[err.message],
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <section className="w-full">
      <h1 className="sr-only">Food Explorer</h1>
      <p className="sr-only">
        Cardápio digital para consumir os melhores petiscos
      </p>

      <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-[4.375rem] lg:flex-row lg:gap-36 lg:px-8 xl:gap-72">
        <ExplorerLogo className="text-4xl lg:w-80" />

        <form
          onSubmit={handleSubmit(loginUser)}
          className="flex w-full flex-col items-center space-y-8 rounded-2xl px-10 lg:bg-dark_700 lg:px-16 lg:py-16"
        >
          <h2 className="sr-only text-3xl font-medium text-light_200 lg:not-sr-only">
            Faça login
          </h2>
          <Form.Root>
            <Form.Label title="Email" htmlFor="email" />
            <Form.Viewport>
              <Form.Input
                id="email"
                type="email"
                placeholder="exemplo@hotmail.com"
                hasError={!!errors.email}
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
                placeholder="Mínimo 6 caracteres"
                {...register("password")}
                hasError={!!errors.password}
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

          <Button isLoading={isFetching} type="submit">
            Entrar
          </Button>

          <Link href="/register" className="text-sm">
            Criar conta
          </Link>
        </form>
      </div>
    </section>
  );
}
