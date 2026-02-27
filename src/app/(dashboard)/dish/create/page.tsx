import { GobackButton } from "@/components/goback-button";
import { FormCreateDish } from "./form";

export default async function CreateDish() {
  return (
    <section className="mx-auto max-w-6xl  px-8 lg:px-4">
      <GobackButton className="mt-8" />

      <h1 className="my-8 text-3xl font-medium">Adicionar prato</h1>

      <FormCreateDish />
    </section>
  );
}
