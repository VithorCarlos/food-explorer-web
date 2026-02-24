import { ComponentProps } from "react";

// Esse é o esqueleto de UM único prato (Card)
export function CardFoodSkeleton() {
  return (
    <div className="relative flex min-w-[320px] shrink-0 flex-col items-center justify-center gap-3 rounded border border-dark_300 bg-dark_200 p-6">
      <div className="shimmer-effect absolute right-4 top-4 h-6 w-6 rounded" />

      <div className="shimmer-effect h-24 w-24 rounded-full lg:h-44 lg:w-44" />

      <div className="shimmer-effect mt-2 h-7 w-3/4 rounded" />

      <div className="shimmer-effect h-4 w-full rounded" />
      <div className="shimmer-effect h-4 w-5/6 rounded" />

      <div className="shimmer-effect mt-2 h-8 w-24 rounded" />

      {/* Botões */}
      <div className="mt-4 flex w-full gap-2">
        <div className="shimmer-effect h-12 w-full rounded" />
      </div>
    </div>
  );
}

// Esse é o esqueleto da Seção inteira
export function SectionFoodSkeleton({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={`mb-6 px-4 ${className}`} {...props}>
      <div className="shimmer-effect mb-6 h-8 w-48 rounded lg:h-10 lg:w-64" />

      <div className="flex w-full flex-nowrap gap-4 overflow-hidden">
        <CardFoodSkeleton />
        <CardFoodSkeleton />
        <CardFoodSkeleton />
        <CardFoodSkeleton />
      </div>
    </section>
  );
}
