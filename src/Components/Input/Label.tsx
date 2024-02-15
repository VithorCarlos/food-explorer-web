import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  title: string;
};

export function Label({ title, id, ...props }: LabelProps) {
  return (
    <label className="text-light_400" {...props}>
      {title}
    </label>
  );
}