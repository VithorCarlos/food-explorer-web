import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";

export interface SearchSnacksDTO {
  page: string;
  category: string;
  perPage?: string;
  title?: string;
  ingredients?: string[];
}

export interface SnackDTO {
  id: string;
  title: string;
  category: FOOD_CATEGORIES;
  ingredients?: string[];
  userId: string;
  price: number;
  description: string;
  imageUrl: string;
  created_at?: Date;
  updated_at?: Date;
}
