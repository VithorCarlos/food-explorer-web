import { SearchSnacksDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { fetchWithAuth } from "@/services/http/fetchWithAuth";

export const fetchSearchFoods = async ({
  page = "1",
  perPage = "10",
  title,
  ingredients,
}: SearchSnacksDTO) => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
    ...(title && { title }),
  });

  if (ingredients) {
    ingredients.forEach((ingredient) => {
      queryParams.append("ingredients", ingredient);
    });
  }

  const queryString = queryParams.toString();

  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack?${queryString}`;

  try {
    const response = await fetchWithAuth(url, { method: "GET" });

    const foods = (await response.json()) ?? [];

    return foods;
  } catch (err) {
    console.log(err);
  }
};
