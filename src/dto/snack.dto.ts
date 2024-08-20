export interface SearchSnacksDTO {
  page: string;
  perPage?: string;
  title?: string;
  ingredients?: string[];
}

export interface SnackDTO {
  id: string;
  title: string;
  category: string;
  ingredients: string[];
  userId: string;
  price: number;
  description: string;
  imageUrl: string;
  created_at?: Date;
  updated_at?: Date;
}
