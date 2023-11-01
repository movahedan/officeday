import { twMerge } from "tailwind-merge";

import { classNames } from "@/utilities";

import type { CSSProperties, ReactNode } from "react";

type TextProps = {
  as?: keyof HTMLElementTagNameMap;
  htmlFor?: string;
  inline?: boolean;
  dataTestId?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export const Text = ({
  as: As = "p",
  htmlFor = "string",
  inline = false,
  dataTestId,
  style,
  className,
  children,
}: TextProps) => (
  <As
    htmlFor={htmlFor}
    data-testid={dataTestId}
    style={style}
    className={classNames(
      twMerge([
        "prose",
        inline ? "inline-flex items-center" : "flex items-center",
        className || "",
      ]),
    )}
  >
    {children}
  </As>
);
