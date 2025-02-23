import { GobackButton } from "@/components/goback-button";
import { FormEditDish } from "./form";
import { findOneFood } from "@/api/food.api";

export interface PageProps {
  searchParams: Promise<{
    id: string;
  }>;
}

export default async function EditDish(props: PageProps) {
  const params = await props.searchParams;
  const { id } = params;
  const food = await findOneFood(id);

  return (
    <section className="mx-auto max-w-6xl px-8 lg:px-4">
      <GobackButton className="mt-8" />

      <h1 className="my-8 text-3xl font-medium">Editar prato</h1>

      <FormEditDish {...{ food }} />
    </section>
  );
}
