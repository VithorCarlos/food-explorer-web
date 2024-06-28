/* eslint-disable @next/next/no-img-element */

import { SectionFood } from "./components/sectionFood";

export default function Dashboard() {
  return (
    <div>
      <div className="mx-4 mb-8 mt-5 flex items-center rounded bg-linear_200">
        <div>
          <img
            className="-ml-5 -mt-10 h-40 min-w-36"
            src="/images/cookies.png"
            alt="Biscoitos"
          />
        </div>

        <div className="max-w-52 flex-grow space-y-1 py-1 pr-2">
          <strong className="text-lg font-semibold">
            Sabores inigualáveis
          </strong>
          <p className="text-xs  text-light_300">
            Sinta o cuidado do preparo com ingredientes selecionados.
          </p>
        </div>
      </div>

      <section className="mb-6 px-4">
        <h2 className="mb-6 text-lg font-medium">Refeições</h2>

        <div className="no-scrollbar flex flex-grow gap-4 overflow-x-auto">
          {[0, 1, 2, 3, 4].map((item) => (
            <SectionFood
              key={item}
              foodName="Salada Ravanello"
              price={49.99}
              qtd={2}
              imageUrl={"/svg/salada.svg"}
            />
          ))}
        </div>
      </section>

      <section className="mb-6 px-4">
        <h2 className="mb-6 text-lg font-medium">Pratos principais</h2>

        <div className="no-scrollbar flex flex-grow gap-4 overflow-x-auto">
          {[0, 1, 2, 3, 4].map((item) => (
            <SectionFood
              key={item}
              foodName="Salada Ravanello"
              price={49.99}
              imageUrl={"/svg/feijao.svg"}
              qtd={2}
            />
          ))}
        </div>
      </section>

      <section className="mb-6 px-4">
        <h2 className="mb-6 text-lg font-medium">Lanches</h2>

        <div className="no-scrollbar flex flex-grow gap-4 overflow-x-auto">
          {[0, 1, 2, 3, 4].map((item) => (
            <SectionFood
              key={item}
              foodName="Hamburger"
              price={60.99}
              imageUrl={"/svg/lanche.svg"}
              qtd={2}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
