import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { z } from "zod";

export const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  attachmentUrl: z.string().optional(),
  category: z.nativeEnum(FOOD_CATEGORIES).optional(),
  ingredients: z.string().array().optional(),
  price: z.number().optional(),
});

export type FormProps = z.infer<typeof schema>;
