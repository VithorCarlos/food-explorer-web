import { Button } from "@/components/button";
import { ButtonQuantity } from "@/components/button-quantity";
import { GobackButton } from "@/components/goback-button";
import { Tags } from "@/components/tags";
import { Currency } from "../../../components/currency";
import { IconReceipt } from "@/components/header/icon-receipt";
import { findOneFood } from "@/api/food.api";
import { getUserRole } from "@/utils/get-user-role";
import { ROLE } from "@/utils/enums/role";
import Link from "next/link";
import { SnackDTO } from "@/dto/snack.dto";

export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Preview(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  const food = (await findOneFood(id)) as SnackDTO;
  const userRole = await getUserRole();

  const isAdmin = userRole?.role === ROLE.ADMIN;

  return (
    <section className="mx-auto max-w-6xl px-8">
      <GobackButton className="mt-8" />

      <div className="mb-20 mt-10 flex flex-col items-center justify-between gap-10  md:flex-row md:items-start">
        <img
          className="h-[264px] w-[264px] rounded-full object-cover md:h-64 md:w-64 lg:h-96 lg:w-96"
          src={food?.imageUrl}
          alt={food?.title}
        />
        <div className="min-w-2xl grid w-full gap-6">
          <h1 className="text-3xl font-bold">{food?.title}</h1>
          <p className="text-base lg:text-2xl">{food?.description}</p>

          <Tags tags={food.ingredients} />

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            {!isAdmin && <ButtonQuantity id={id} />}

            <Link href={isAdmin ? `/dish/edit?id=${id}` : "#"}>
              <Button className="px-8 lg:w-max">
                {isAdmin ? (
                  <span>Editar prato</span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <IconReceipt className="h-7 w-7" />
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
