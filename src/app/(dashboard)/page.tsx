import { fetchSearchFoods } from "@/api/food.api";
import { SectionFood } from "../../components/section-food";
import { Suspense } from "react";
import { SnackDTO } from "@/dto/snack.dto";
import { FOOD_CATEGORIES_TRANSLATIONS } from "@/utils/translations/food-categories-translation";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";

export default async function Dashboard() {
  const categories = Object.keys(
    FOOD_CATEGORIES_TRANSLATIONS,
  ) as FOOD_CATEGORIES[];
  const newFoodsByCategory: Record<string, SnackDTO[]> = {};
  const newCurrentPages: Record<string, number> = {};

  for (let category of categories) {
    const foods = await fetchSearchFoods({ category, page: "1" });
    newFoodsByCategory[category] = foods;
    newCurrentPages[category] = 1;
  }
  const userRole = await getUserRole();
  const isAdmin = userRole?.role === ROLE.ADMIN;

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

      {categories.map((category) => {
        const categoryFoods = newFoodsByCategory[category] || [];

        if (categoryFoods.length === 0) return null;

        return (
          <Suspense key={category}>
            <SectionFood
              className="mb-6 px-4"
              title={FOOD_CATEGORIES_TRANSLATIONS[category]}
              data={categoryFoods}
              isAdmin={isAdmin}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
