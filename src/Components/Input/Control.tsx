import { ComponentProps } from "react";

type InputControlProps = ComponentProps<"input">;

export function Control(props: InputControlProps) {
  return (
    <input
      className="h-full w-full overflow-hidden bg-transparent placeholder:text-light_500"
      type="text"
      {...props}
    />
  );
}
