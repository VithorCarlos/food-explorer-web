import { fetchSearchFoods } from "@/api/food.api";
import { SectionFood } from "@/components/section-food";
import { FOOD_CATEGORIES } from "@/utils/enums/food-categories";
import { FOOD_CATEGORIES_TRANSLATIONS } from "@/utils/translations/food-categories-translation";

interface CategoryRowProps {
  category: FOOD_CATEGORIES;
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
    category,
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
      title={FOOD_CATEGORIES_TRANSLATIONS[category]}
      initialData={initialFoods}
      category={category}
      isAdmin={isAdmin}
    />
  );
}
