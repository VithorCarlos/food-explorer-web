import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";
import { FoodProvider } from "@/providers/food";
import { fetchFindManyFavorite } from "@/services/favorites/fetch-find-many-favorites";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userRole, initialFavorites] = await Promise.all([
    getUserRole(),
    fetchFindManyFavorite("1", "50"),
  ]);
  const isAdmin = userRole?.role === ROLE.ADMIN;

  return (
    <div className="flex min-h-screen flex-col">
      <Header {...{ isAdmin }} />
      <FoodProvider
        initialState={{ favorites: initialFavorites.data.favorites }}
      >
        <main className="flex-1">{children}</main>
      </FoodProvider>

      <Footer />
    </div>
  );
}
