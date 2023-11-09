import { twMerge } from "tailwind-merge";

import { classNames } from "@/libs/utilities/string";

import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "green" | "blue" | "red" | "white" | "transparent";
};

export const Button = ({
  variant = "transparent",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={twMerge(
        classNames([
          "flex items-center justify-center",
          "px-4 py-2 rounded focus:outline-none focus:ring",
          variant === "transparent" && "text-gray-800",
          variant === "green" &&
            "text-white bg-green-500 hover:bg-green-700 focus:border-green-500",
          variant === "blue" &&
            "text-white bg-blue-500 hover:bg-blue-700 focus:border-blue-500",
          variant === "red" &&
            "text-white bg-red-500 hover:bg-red-700 focus:border-red-500",
          variant === "white" &&
            "text-gray-800 bg-slate-50 hover:bg-slate-100 focus:border-slate-100",
          className,
        ]),
      )}
    >
      {children}
    </button>
  );
};
