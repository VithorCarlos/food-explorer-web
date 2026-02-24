"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ComponentProps, forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputInputProps extends ComponentProps<"input"> {
  isValid?: boolean;
  hasError?: boolean | null;
}

const InputForwardRef: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputInputProps
> = ({ isValid, hasError, className, ...props }, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentUrlSearch = searchParams.get("search") || "";

      if (searchTerm === currentUrlSearch) return;

      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm && searchTerm !== searchParams.get("search")) {
        params.set("search", searchTerm);
        router.replace(`${pathname}?${params.toString()}`);
      } else if (!searchTerm && searchParams.has("search")) {
        params.delete("search");
        router.replace(`${pathname}?${params.toString()}`);
      }

      router.push(`/?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  return (
    <>
      <input
        ref={ref}
        className={twMerge(
          "h-full w-full overflow-hidden rounded border border-transparent bg-transparent px-3.5 py-3.5",
          "placeholder:text-light_500 focus:outline-1 focus:outline-dark_950",
          isValid && "focus:outline-lightborder-light_200 border-light_200",
          hasError && " !border-tomato_400 focus:border-tomato_200",
          className,
        )}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        {...props}
      />
    </>
  );
};

export const Input = forwardRef(InputForwardRef);
