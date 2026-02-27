import { ProductDTO } from "@/dto/product.dto";
import { env } from "@/env";
import { fetchOnServer } from "../http/fetch-on-server";
import { REVALIDATE } from "@/utils/enums/revalidate";

interface FindOneProductResponse {
  product: ProductDTO;
}

export const findOneProduct = async (
  id: string,
): Promise<FindOneProductResponse> => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`;

  const { data } = await fetchOnServer(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [REVALIDATE.FETCH_FIND_ONE_PRODUCT],
    },
  });

  return data;
};
