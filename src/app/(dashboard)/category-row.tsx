import { SectionProduct } from "@/components/section-product";
import { fetchSearchProducts } from "@/services/products/fetch-search-products";
import { PRODUCT_CATEGORIES } from "@/utils/enums/product-categories";
import { PRODUCT_CATEGORIES_TRANSLATIONS } from "@/utils/translations/product-categories-translation";

interface CategoryRowProps {
  category?: PRODUCT_CATEGORIES;
  isAdmin: boolean;
  searchQuery?: string;
}

export async function CategoryRow({
  category,
  isAdmin,
  searchQuery,
}: CategoryRowProps) {
  const search = searchQuery || undefined;

  const initialProducts = await fetchSearchProducts({
    ...(category && { category }),
    title: search,
    ingredients: search ? [search] : undefined,
    page: "1",
    perPage: "4",
  });

  const totalItems = initialProducts.pagination.total;

  const textForItemFound = `(${totalItems}) resultado ${totalItems > 1 ? "encontrados" : "encontrado"} em sua
        busca.`;

  const textForItemNotFound = "Nenhum resultado foi encontrado para sua busca.";

  return (
    <div>
      {searchQuery && (
        <span className="text-xl font-bold">
          {totalItems !== 0 ? textForItemFound : textForItemNotFound}
        </span>
      )}

      {initialProducts.products.length > 0 && (
        <SectionProduct
          className="mb-6 px-4"
          title={
            category ? PRODUCT_CATEGORIES_TRANSLATIONS[category] : undefined
          }
          initialData={initialProducts.products}
          category={category}
          isAdmin={isAdmin}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
}
