import { z } from "zod";
import { RUNTIME } from "./runtime";

const envSchema = z.object({
  NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production"]),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});

const _env = envSchema.safeParse(RUNTIME);

if (_env.error) {
  const errorMessage = `❌ Something's wrong with environment variables: 
  ${_env.error.flatten().fieldErrors}`;

  console.error(errorMessage);
  throw new Error(errorMessage);
}

export const env = _env.data;
