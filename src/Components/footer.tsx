import { ExplorerLogo } from "./explorer-logo";

export function Footer() {
  const actualYear = new Date().getFullYear();
  return (
    <footer className=" bg-dark_600 px-6 py-7 text-xs">
      <div className="mx-auto flex max-w-6xl flex-1 items-center justify-center gap-4 lg:justify-between">
        <ExplorerLogo
          svgClassName="w-8 h-8"
          className="fill-light_700 text-light_700 lg:text-2xl"
        />
        <span className="lg-text-base block">
          © {actualYear} - Criado por: Vithor Carlos - Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  );
}
