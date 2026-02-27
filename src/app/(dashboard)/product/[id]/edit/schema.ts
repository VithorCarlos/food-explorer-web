import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";
import { z } from "zod";

export const schema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  attachmentUrl: z.string().optional(),
  category: z.nativeEnum(PRODUCT_CATEGORIES).optional(),
  ingredients: z.string().array().optional(),
  price: z.number().optional(),
});

export type FormProps = z.infer<typeof schema>;
