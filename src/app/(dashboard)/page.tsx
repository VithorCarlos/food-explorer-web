import { Suspense } from "react";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";
import { CategoryRow } from "./category-row";
import { SectionFoodSkeleton } from "@/components/section-food-skeleton";
import { fetchActiveCategories } from "@/services/foods/fetch-active-categories";

interface DashboardProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const params = await searchParams;

  const searchQuery = params.search ?? "";

  const [categoriesResponse, userRole] = await Promise.all([
    fetchActiveCategories(),
    getUserRole(),
  ]);

  const categories = categoriesResponse.categories || [];
  const sortedCategories = categories.sort((a, b) => {
    const indexA = Object.keys(FOOD_CATEGORIES).indexOf(a);
    const indexB = Object.keys(FOOD_CATEGORIES).indexOf(b);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

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
          <p className="text-xs text-light_300 lg:text-base">
            Sinta o cuidado do preparo com ingredientes selecionados.
          </p>
        </div>
      </div>

      {searchQuery ? (
        <Suspense fallback={<SectionFoodSkeleton />}>
          <CategoryRow isAdmin={isAdmin} searchQuery={searchQuery} />
        </Suspense>
      ) : (
        sortedCategories.map((category) => (
          <Suspense key={category} fallback={<SectionFoodSkeleton />}>
            <CategoryRow category={category} isAdmin={isAdmin} />
          </Suspense>
        ))
      )}
    </div>
  );
}
