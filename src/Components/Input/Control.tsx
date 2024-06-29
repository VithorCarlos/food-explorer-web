import { ComponentProps } from "react";

type InputControlProps = ComponentProps<"input">;

export function Control(props: InputControlProps) {
  return (
    <input
      className="h-full w-full overflow-hidden bg-transparent px-3.5 py-3.5 placeholder:text-light_500 focus:outline-none"
      type="text"
      {...props}
    />
  );
}
