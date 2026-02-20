import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "Insira o título do produto" }),
  description: z.string().min(1, { message: "Insira a descrição do produto" }),
  attachmentUrl: z.string(),
  category: z.nativeEnum(FOOD_CATEGORIES),
  ingredients: z.string().array().optional(),
  price: z.number().finite().min(1, { message: "Insira o preço do produto" }),
});

export type FormProps = z.infer<typeof schema>;
