import { twMerge } from "tailwind-merge";

import { classNames } from "@/libs/utilities/string";

import type { ReactNode } from "react";

export type ListProps<ItemType = unknown> = {
  as?: "ol" | "ul";
  items: ItemType[];
  keys: (item: ItemType) => string;
  className?: string;
  children?: (item: ItemType) => ReactNode;
};

export function List<ItemType = unknown>({
  as: As = "ul",
  items,
  keys,
  className,
  children,
}: ListProps<ItemType>) {
  return (
    <As
      className={twMerge(
        classNames([
          "w-full rounded-md overflow-hidden",
          "[&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-slate-100 ",
          className,
        ]),
      )}
    >
      {items.map((item, index) => (
        <li key={keys?.(item) ?? index} className="w-full p-8">
          {children?.(item) || (typeof item === "string" ? item : null)}
        </li>
      ))}
    </As>
  );
}
