import { SnackDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";

interface FindOneFoodResponse {
  snack: SnackDTO;
}

export const findOneFood = async (id: string): Promise<FindOneFoodResponse> => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${id}`;

  const { data } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["find-one-food"],
    },
  });

  return data;
};
