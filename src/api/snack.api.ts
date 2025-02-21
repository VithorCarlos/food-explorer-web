"use server";
import { SearchSnacksDTO } from "@/dto/snack.dto";
import { api } from "@/services/axios/api.service";

// export const fetchSearchSnacks = async ({
//   page = "1",
//   perPage = "10",
//   title,
//   ingredients,
// }: SearchSnacksDTO) => {
//   const queryParams = new URLSearchParams({
//     page,
//     perPage,
//     ...(title && { title }),
//   });

//   if (ingredients) {
//     ingredients.forEach((ingredient) => {
//       queryParams.append("ingredients", ingredient);
//     });
//   }

//   const queryString = queryParams.toString();

//   const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack?${queryString}`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//       },
//     });

//     const snacks = (await response.json()) ?? [];

//     return snacks;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const fetchSearchSnacks = async ({
  page = "1",
  perPage = "10",
  title,
  ingredients,
}: SearchSnacksDTO) => {
  const { data } = await api.get("/snack", {
    params: {
      page,
      perPage,
      ...(title && { title }),
      ...(ingredients && ingredients.length > 0 && { ingredients }),
    },
  });

  return data;
};
