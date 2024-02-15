import { ComponentProps } from "react";

type InputViewportProps = ComponentProps<"div">;

export function Viewport(props: InputViewportProps) {
  return (
    <div
      className="bg-dark_900 flex items-center px-3.5  py-3.5 gap-3.5 rounded"
      {...props}
    />
  );
}
