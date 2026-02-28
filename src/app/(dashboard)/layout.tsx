import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";
import { ProductProvider } from "@/providers/product-provider";
import { getUserId } from "@/utils/get-user-id";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserId();

  const userRole = await getUserRole();

  const isAdmin = userRole?.role === ROLE.ADMIN;

  return (
    <div className="flex min-h-screen flex-col">
      <Header {...{ isAdmin }} />
      <ProductProvider
        initialState={{
          userId: user!.id,
        }}
      >
        <main className="flex-1">{children}</main>
      </ProductProvider>

      <Footer />
    </div>
  );
}
