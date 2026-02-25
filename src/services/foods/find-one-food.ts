import { SnackDTO } from "@/dto/snack.dto";
import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface FindOneFoodResponse {
  snack: SnackDTO;
}

export const findOneFood = async (id: string): Promise<FindOneFoodResponse> => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/snack/${id}`;

  const { data } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [REVALIDATE.FETCH_FIND_ONE_FOOD],
    },
  });

  return data;
};
