import { fetchSearchFoods } from "@/api/food.api";
import { SectionFood } from "../../components/section-food";
import { SnackDTO } from "@/dto/snack.dto";
import { Suspense } from "react";

export default async function Dashboard() {
  const foods = (await fetchSearchFoods({ page: "1" })) as SnackDTO[];

  const snacks = foods.filter((food) => food.category === "snacks");
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mx-4 mb-16 mt-5 flex items-center rounded bg-linear_200">
        <img
          className="-ml-5 w-full min-w-36 max-w-60 lg:-mb-0  lg:-ml-16 lg:h-auto lg:w-[600px] lg:max-w-md"
          src="/svg/cookies.svg"
          alt="Biscoitos"
        />

        <div className="max-w-52 flex-grow space-y-1 py-1 pr-2 lg:max-w-md">
          <strong className="text-lg font-semibold lg:text-4xl">
            Sabores inigualáveis
          </strong>
          <p className="text-xs text-light_300  lg:text-base">
            Sinta o cuidado do preparo com ingredientes selecionados.
          </p>
        </div>
      </div>
      <Suspense>
        <SectionFood className="mb-6 px-4" title="Lanches" data={snacks} />
      </Suspense>

      <Suspense>
        <SectionFood className="mb-6 px-4" title="Refeições" data={[]} />
      </Suspense>

      <Suspense>
        <SectionFood
          className="mb-6 px-4"
          title="Pratos principais"
          data={[]}
        />
      </Suspense>
    </div>
  );
}
