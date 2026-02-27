import { FormUpdateAccount } from "./form";
import { fetchFindUserById } from "@/services/user/fetch-find-user-by-id";

export default async function Account() {
  const {
    data: { user },
  } = await fetchFindUserById();

  return (
    <div className="mx-auto max-w-6xl">
      <section className="mx-4 mb-16 mt-5 flex flex-col items-center rounded ">
        <h1 className="text-3xl font-bold">Minha Conta</h1>

        <FormUpdateAccount user={user} />
      </section>
    </div>
  );
}
