import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";

export interface ProductDTO {
  productId: string;
  title: string;
  attachmentUrl?: string;
  attachmentId?: string;
  category: PRODUCT_CATEGORIES;
  ingredients?: string[];
  userId: string;
  isFavorited: boolean;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
