import { revalidateTag } from "next/cache";
import { REVALIDATE } from "./enums/revalidate";

export const revalidateTags = () => {
  const tagsToRevalidate = Object.values(REVALIDATE).map((tag) => tag);

  return tagsToRevalidate.map((tag) => revalidateTag(tag));
};
