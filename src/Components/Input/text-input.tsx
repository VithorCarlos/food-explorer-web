import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean | null;
  isValid?: boolean;
  errorMessage?: string;
}

const TextInputForwardRef: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = ({ isValid, hasError = false, errorMessage, ...rest }, ref) => {
  return (
    <>
      <textarea
        className={twMerge(
          "h-full w-full overflow-hidden bg-transparent px-3.5 py-3.5 placeholder:text-light_500 focus:outline-none",
          "max-h-56 min-h-20 w-full",
          isValid && "focus:outline-lightborder-light_200 border-light_200",
          hasError && "!border-tomato_400 focus:border-tomato_200",
        )}
        {...{ ref, ...rest }}
      />
      {hasError && (
        <span className="-mb-2.5 mt-1 text-red-600 dark:text-red-400">
          {errorMessage}
        </span>
      )}
    </>
  );
};

export const TextInput = forwardRef(TextInputForwardRef);
