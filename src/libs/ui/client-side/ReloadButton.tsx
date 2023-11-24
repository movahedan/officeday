import { useState } from "react";

import { classNames } from "@/libs/utilities/string";

import { Button } from "./Button";
import { IconLoading, IconRefresh } from "../icons";

export type ReloadButtonProps = {
  isLoading?: boolean;
  onReload: () => Promise<unknown | void>;
  className?: string;
};

export const ReloadButton = ({
  isLoading,
  onReload,
  className,
}: ReloadButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleReload = () => {
    setIsPending(true);
    onReload().finally(() => {
      setIsPending(false);
    });
  };

  return (
    <Button
      variant="white"
      onClick={handleReload}
      className={classNames(["px-8 py-4 border", className])}
    >
      {isLoading || isPending ? (
        <IconLoading width={16} height={16} />
      ) : (
        <IconRefresh
          width={16}
          height={16}
          className={classNames([
            "transition-all duration-300",
            !(isLoading || isPending) ? "-rotate-180" : "rotate-180",
          ])}
        />
      )}
    </Button>
  );
};
