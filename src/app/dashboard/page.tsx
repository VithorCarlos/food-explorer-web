/* eslint-disable @next/next/no-img-element */

export default function Dashboard() {
  return (
    <div className=" bg-linear_200 mx-4 mb-8 flex flex-1 items-center gap-4 rounded pt-5">
      <div>
        <img className=" -ml-4 -mt-8" src="/images/cookies.png" alt="Biscoitos" />
      </div>

      <div className="max-w-52 space-y-1">
        <strong className="text-lg font-semibold">Sabores inigualáveis</strong>
        <p className="text-xs  text-light_300">
          Sinta o cuidado do preparo com ingredientes selecionados.
        </p>
      </div>
    </div>
  );
}
