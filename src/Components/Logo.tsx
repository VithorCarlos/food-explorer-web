import * as React from "react";

type LogoProps = React.ComponentProps<"span"> & {
  svgClassName?: React.ComponentProps<"svg">["className"];
};

export function Logo({ svgClassName, ...props }: LogoProps) {
  return (
    <strong className="flex  items-center gap-2.5">
      <svg
        width={43}
        height={43}
        viewBox="0 0 43 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgClassName}
      >
        <path
          d="M21.57.217l21.404 11.875v23.75L21.57 47.719.168 35.843V12.092L21.57.217z"
          fill={"#065E7C"}
          className={props.className}
        />
      </svg>
      <span {...props}>food explorer</span>
    </strong>
  );
}
