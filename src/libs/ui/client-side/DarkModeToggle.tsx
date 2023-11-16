"use client";

import { classNames } from "@/libs/utilities/string";

import { IconMoon } from "../icons";

export type DarkModeToggleProps = {
  className?: string;
};

export const DarkModeToggle = ({ className }: DarkModeToggleProps) => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={classNames(["flex items-center", className])}
    >
      <IconMoon
        className={classNames([
          "rounded-full hover:scale-125 hover:cursor-pointer border border-transparent",
        ])}
      />
    </button>
  );
};
