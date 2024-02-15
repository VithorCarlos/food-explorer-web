import { Logo } from "../Logo";

export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <div className="bg-dark_600 flex flex-1 items-center justify-center gap-4 px-6 py-7 text-xs">
      <Logo svgClassName="w-5" className="fill-light_700 text-light_700 " />
      <span className=" ">
        © 2024 - Todos os direitos reservados.
      </span>
    </div>
  );
}
