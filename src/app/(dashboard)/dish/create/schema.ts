import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, { message: "Insira o título do produto" }),
  description: z.string().min(1, { message: "Insira a descrição do produto" }),
  imageUrl: z.string().url(),
  category: z.nativeEnum(FOOD_CATEGORIES),
  ingredients: z.string().array().optional(),
  price: z.number().min(1, { message: "Insira o preço do produto" }),
});

export type FormProps = z.infer<typeof schema>;
