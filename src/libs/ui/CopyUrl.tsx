import { useState } from "react";
import { useCopyToClipboard, useTimeoutFn } from "react-use";
import { twMerge } from "tailwind-merge";

import { classNames } from "../utilities/string";

export type CopyUrlProps = {
  url: string;
  className?: string;
};

export const CopyUrl = ({ url, className }: CopyUrlProps) => {
  const [copyState, copy] = useCopyToClipboard();
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [, , reset] = useTimeoutFn(() => {
    setCopyButtonDisabled((prev) => (prev ? !prev : prev));
  }, 2000);

  return (
    <div
      className={classNames(["flex flex-col w-full md:flex-row", className])}
    >
      <p
        className={classNames([
          "flex-1 px-24 py-8 break-words bg-gray-100 ",
          "border border-gray-400 border-dotted border-b-0 rounded-b-none rounded-t-md",
          "md:border-b md:border-r-0 md:rounded-r-none md:rounded-l-md",
        ])}
      >
        {url}
      </p>

      <button
        onClick={() => {
          copy(url);
          setCopyButtonDisabled(true);
          reset();
        }}
        disabled={copyButtonDisabled}
        className={twMerge(
          classNames([
            "w-full md:w-128",
            "px-40 py-6 border outline-0",
            "hover:bg-slate-100 hover:shadow-sm",
            "rounded-l-md rounded-b-md rounded-t-none md:rounded-md md:rounded-l-none",
            copyState.error && "bg-red-500 border-red-500 text-white",
            copyButtonDisabled &&
              "bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-white",
          ]),
        )}
      >
        {copyState.error ? "Error!" : copyButtonDisabled ? "Copied" : "Copy"}
      </button>
    </div>
  );
};
