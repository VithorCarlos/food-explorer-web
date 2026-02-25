import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";

export interface FavoriteDTO {
  favoriteId: string;
  snackId: string;
  userId: string;
  attachmentUrl: string;
  title: string;
  category: FOOD_CATEGORIES;
  ingredients?: string[];
  price: number;
  description: string;
}
