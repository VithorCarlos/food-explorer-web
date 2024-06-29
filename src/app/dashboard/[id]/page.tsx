import { Button } from "@/components/button";
import { ButtonQuantity } from "@/components/button-quantity";
import { GobackButton } from "@/components/goback-button";
import { Tags } from "@/components/tags";
import { foodData, tags } from "@/utils/mock";
import { Currency } from "../../../components/currency";

export interface PageProps {
  params: {
    id: string;
  };
}

export default function Preview({ params }: PageProps) {
  const { id } = params;
  const food = foodData.find((food) => food.id === id);

  return (
    <section className="mx-auto max-w-6xl">
      <GobackButton className="mt-8" />

      <div className="mb-20 mt-10 flex flex-col items-center justify-between gap-10 px-6 md:flex-row md:items-start">
        <img
          className="h-[264px] w-[264px] rounded-full object-cover md:h-64 md:w-64 lg:h-96 lg:w-96"
          src={food?.imageUrl}
          alt={food?.title}
        />
        <div className="min-w-2xl grid w-full gap-6">
          <h1 className="text-3xl font-bold">{food?.title}</h1>
          <p className="text-base lg:text-2xl">{food?.description}</p>

          <Tags tags={tags} />

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <ButtonQuantity id={id} />

            <Button className="w-max px-8">
              <Currency id={id} price={food?.price!} customText="Incluir ∙ " />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
