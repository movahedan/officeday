import { useTranslations } from "next-intl";

import { classNames } from "@/libs/utilities/string";

import type { CSSProperties, ReactNode } from "react";

export type FooterProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export const Footer = ({ style, className, children }: FooterProps) => {
  const t = useTranslations("components");

  return (
    <footer
      style={style}
      className={classNames([
        "footer",
        "w-full flex justify-center p-16",
        className,
      ])}
    >
      <p>{t("footer")}</p>

      {children}
    </footer>
  );
};
