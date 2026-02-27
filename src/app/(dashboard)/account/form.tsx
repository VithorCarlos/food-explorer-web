"use client";
import { Form } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProps, schema } from "./schema";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Button from "@/components/button";
import { RequestErrorApi } from "@/utils/errors/request-error";
import { showToast } from "@/utils/toast-message";
import { fetchUpdateUser } from "@/services/user/fetch-update-user";
import { UserDTO } from "@/dto/user.dto";
import { useRouter } from "next/navigation";
import { USER_ERRORS_TRANSLATE } from "@/utils/translations/user-errors-translate";

interface Props {
  user: Partial<UserDTO>;
}

export function FormUpdateAccount({ user }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { refresh } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const editUserAccount = async (data: FormProps) => {
    delete data.confirm_password;

    const oldUserToVerify: FormProps = {
      name: user.name,
      email: user.email,
      password: user.password || "",
    };

    if (JSON.stringify(data) === JSON.stringify(oldUserToVerify)) {
      return showToast({
        type: "info",
        content: "Nenhum dado foi alterado",
      });
    }

    const { name, email, password } = data;

    try {
      setIsFetching(true);

      const response = await fetchUpdateUser({
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      });

      if (response.success) {
        refresh();
        return showToast({
          type: "success",
          content: "Conta atualizada com sucesso! ",
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
    <div className="mx-auto flex flex-col items-center justify-center gap-[4.375rem] lg:px-8">
      <form
        onSubmit={handleSubmit(editUserAccount)}
        className="flex w-full  flex-col items-center space-y-8 px-10 lg:px-16 lg:py-16"
      >
        <h2 className="sr-only  text-xl font-medium text-light_200 lg:not-sr-only">
          Atualização cadastral
        </h2>
        <Form.Root className="w-96">
          <Form.Label title="Seu nome" htmlFor="name" />
          <Form.Viewport>
            <Form.Input
              id="name"
              placeholder="Informe seu nome"
              hasError={!!errors.name}
              defaultValue={user.name}
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
              defaultValue={user.email}
              {...register("email")}
            />
          </Form.Viewport>
          {errors.email?.message && (
            <Form.Error message={errors.email?.message} />
          )}
        </Form.Root>

        <Form.Root>
          <Form.Label title="Nova Senha" htmlFor="password" />
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
          <Form.Label title="Confirmação de senha" htmlFor="confirm_password" />
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
          Atualizar Informações
        </Button>
      </form>
    </div>
  );
}
