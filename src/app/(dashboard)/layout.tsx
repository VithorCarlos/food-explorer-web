import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRole = await getUserRole();
  const isAdmin = userRole?.role === ROLE.ADMIN;

  return (
    <>
      <Header {...{ isAdmin }} />
      {children}
      <Footer />
    </>
  );
}
