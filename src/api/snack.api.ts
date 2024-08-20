import { SearchSnacksDTO, SnackDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { makeFetch } from "@/services/http/make-fetch";

export const fetchSearchSnacks = async ({
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

  return await makeFetch<SnackDTO>({
    url,
    method: "GET",
  });
};
