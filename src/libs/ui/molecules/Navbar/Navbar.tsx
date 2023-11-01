import Link from "next/link";

import { routes } from "@/constants";
import { classNames } from "@/utilities";

import type { CSSProperties } from "react";

export type NavbarProps = {
  className?: string;
  style?: CSSProperties;
};

export const Navbar = ({ className, style }: NavbarProps) => {
  return (
    <nav
      style={style}
      className={classNames([
        "navbar",
        "max-w-764 flex justify-center items-center w-full mx-auto",
        className,
      ])}
    >
      <ul className="flex w-full space-x-32">
        <li>
          <Link href={routes.frontend.index()} className="inline-block p-16">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};
