import * as React from "react";

interface Props extends React.ComponentProps<"div"> {
  count?: number;
}

export function IconReceipt({ count, ...props }: Props) {
  return (
    <div {...props}>
      <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.96 13a1 1 0 011-1h13a1 1 0 110 2h-13a1 1 0 01-1-1zM8.96 17a1 1 0 011-1h13a1 1 0 110 2h-13a1 1 0 01-1-1z"
          fill="#fff"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.047 5.586A2 2 0 015.46 5h22a2 2 0 012 2v19a1 1 0 01-1.447.894l-3.553-1.776-3.553 1.776a1 1 0 01-.894 0l-3.553-1.776-3.553 1.776a1 1 0 01-.894 0L8.46 25.118l-3.553 1.776A1 1 0 013.461 26V7a2 2 0 01.586-1.414zM27.46 7h-22v17.382l2.553-1.276a1 1 0 01.894 0l3.553 1.776 3.553-1.776a1 1 0 01.894 0l3.553 1.776 3.553-1.776a1 1 0 01.894 0l2.553 1.276V7z"
          fill="#fff"
        />
      </svg>
      {count && (
        <div className="absolute -right-3 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full  bg-tomato_100">
          <span className="text-sm font-medium">{count}</span>
        </div>
      )}
    </div>
  );
}
