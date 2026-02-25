import { SectionFood } from "@/components/section-food";
import { fetchSearchFoods } from "@/services/foods/fetch-search-foods";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { FOOD_CATEGORIES_TRANSLATIONS } from "@/utils/translations/food-categories-translation";

interface CategoryRowProps {
  category?: FOOD_CATEGORIES;
  isAdmin: boolean;
  searchQuery?: string;
}

export async function CategoryRow({
  category,
  isAdmin,
  searchQuery,
}: CategoryRowProps) {
  const search = searchQuery || undefined;

  const initialFoods = await fetchSearchFoods({
    ...(category && { category }),
    title: search,
    ingredients: search ? [search] : undefined,
    page: "1",
    perPage: "4",
  });

  if (!initialFoods || initialFoods.length === 0) {
    return null;
  }
  return (
    <SectionFood
      className="mb-6 px-4"
      title={category ? FOOD_CATEGORIES_TRANSLATIONS[category] : undefined}
      initialData={initialFoods.snacks}
      category={category}
      isAdmin={isAdmin}
    />
  );
}
