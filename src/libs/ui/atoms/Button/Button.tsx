import { classNames } from "@/utilities";

import type { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: ReactNode;
  dataTestId?: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export const Button = ({
  type = "button",
  disabled = false,
  icon,
  dataTestId,
  onClick,
  style,
  className,
  children,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    data-testid={dataTestId}
    onClick={onClick}
    style={style}
    className={classNames([
      "prose prose-button py-16 px-40",
      "border rounded-md outline-0",
      "transition-all duration-300",
      className || "",
    ])}
  >
    {icon && <span className="mr-20">{icon}</span>}
    {children}
  </button>
);
