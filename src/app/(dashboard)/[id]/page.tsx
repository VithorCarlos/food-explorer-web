import Button from "@/components/button";
import { ButtonQuantity } from "@/components/button-quantity";
import { GobackButton } from "@/components/goback-button";
import { Currency } from "../../../components/currency";
import { IconReceipt } from "@/components/header/icon-receipt";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";
import Link from "next/link";
import { Tags } from "@/components/tags";
import { findOneFood } from "@/services/foods/find-one-food";

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Preview(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  const { snack: food } = await findOneFood(id);
  const userRole = await getUserRole();

  const isAdmin = userRole?.role === ROLE.ADMIN;

  return (
    <section className="mx-auto max-w-6xl  px-4 md:px-8">
      <GobackButton className="lg:mt-8" />

      <div className="mb-20 mt-10 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
        <div className="h-72 w-72 overflow-hidden rounded-full lg:h-96 lg:w-96">
          <img
            className="h-full w-full object-cover"
            src={food?.attachmentUrl || "/images/default-image-food.webp"}
            alt={food?.title}
          />
        </div>
        <div className="flex w-full flex-1 flex-col items-center gap-6  md:items-start">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <h1 className=" text-3xl font-bold">{food?.title}</h1>
            <p className="text-base lg:text-2xl">{food?.description}</p>
          </div>

          <Tags tags={food.ingredients!} />

          <div className="mt-8 flex items-center gap-3 lg:justify-start">
            {!isAdmin && <ButtonQuantity id={id} />}

            <Link href={isAdmin ? `/dish/${id}/edit` : "#"}>
              <Button className="w-max px-8">
                {isAdmin ? (
                  <span>Editar prato</span>
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <IconReceipt className="h-5 w-5" />
                    <Currency
                      id={id}
                      price={food?.price!}
                      customText="Pedir ∙ "
                    />
                  </div>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
