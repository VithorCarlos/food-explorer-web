import { GobackButton } from "@/components/goback-button";
import { FormEditProduct } from "./form";
import { findOneProduct } from "@/services/products/find-one-product";
import { getUserId } from "@/utils/get-user-id";

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProduct(props: PageProps) {
  const params = await props.params;
  const { id } = params;
  const { product } = await findOneProduct(id);

  return (
    <section className="mx-auto max-w-6xl px-8 lg:px-4">
      <GobackButton className="mt-8" />

      <h1 className="my-8 text-3xl font-medium">Editar prato</h1>

      <FormEditProduct {...{ product }} />
    </section>
  );
}
