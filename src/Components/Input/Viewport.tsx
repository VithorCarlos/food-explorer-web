import { ComponentProps } from "react";

type InputViewportProps = ComponentProps<"div">;

export function Viewport(props: InputViewportProps) {
  return (
    <div
      className="group flex items-center gap-3.5 rounded bg-dark_900 pl-3.5"
      {...props}
    />
  );
}
