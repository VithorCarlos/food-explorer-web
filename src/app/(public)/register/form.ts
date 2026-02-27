import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(3, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "Insira um email válido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não correspondem!",
    path: ["confirm_password"],
  });

export type FormProps = z.infer<typeof schema>;
