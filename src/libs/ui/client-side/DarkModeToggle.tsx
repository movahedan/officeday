"use client";

import { useCallback } from "react";
import { useCookie } from "react-use";

import { cookieNames } from "@/libs/utilities/cookie";
import { classNames } from "@/libs/utilities/string";

import { IconMoon } from "../icons";

export type DarkModeToggleProps = {
  className?: string;
};

export const DarkModeToggle = ({ className }: DarkModeToggleProps) => {
  const [, setDarkMode] = useCookie(cookieNames.NEXT_DARK_MODE);

  const toggleDarkMode = useCallback(() => {
    const isCurrentlyDark = document.body.classList.contains("dark");
    setDarkMode(isCurrentlyDark ? "false" : "true");
    document.body.classList.toggle("dark");
  }, [setDarkMode]);

  return (
    <button
      onClick={() => toggleDarkMode()}
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
