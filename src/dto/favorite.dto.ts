import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";

export interface FavoriteDTO {
  favoriteId: string;
  productId: string;
  userId: string;
  attachmentUrl: string;
  title: string;
  category: PRODUCT_CATEGORIES;
  ingredients?: string[];
  price: number;
  description: string;
}
