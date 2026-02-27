import { z } from "zod";

export const schema = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.password) return;

    if (data.password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Digite uma senha de no mínimo 6 caracteres",
        path: ["password"],
      });
    }

    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não correspondem!",
        path: ["confirm_password"],
      });
    }
  });

export type FormProps = z.infer<typeof schema>;
