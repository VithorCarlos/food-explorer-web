import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";

export interface SearchSnacksDTO {
  page?: string;
  category: string;
  perPage?: string;
  title?: string;
  ingredients?: string[];
}

export interface SnackDTO {
  snackId: string;
  title: string;
  attachmentUrl?: string;
  attachmentId?: string;
  category: FOOD_CATEGORIES;
  ingredients?: string[];
  userId: string;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
