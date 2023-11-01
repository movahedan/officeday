import { twMerge } from "tailwind-merge";

import { classNames } from "@/utilities";

import { Text } from "../Text";

import type { CSSProperties, InputHTMLAttributes } from "react";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  error?: string | boolean;
  style?: CSSProperties;
  className?: string;
};

export const TextInput = ({
  name,
  type = "text",
  label,
  placeholder,
  defaultValue,
  error,
  onChange,
  value,
  style,
  className,
}: TextInputProps) => {
  return (
    <div
      style={style}
      className={classNames(["flex flex-col max-w-xs", className])}
    >
      {!!label && (
        <Text as="label" htmlFor={`${name}-input`}>
          {label}:
        </Text>
      )}
      <input
        id={`${name}-input`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={twMerge(
          classNames([
            "px-6 py-4 border border-gray-700 focus:border-transparent rounded-md",
            error && "border-red-600",
          ]),
        )}
      />
      <Text as="span" className="inline-block mt-2 text-red-600">
        {error}
      </Text>
    </div>
  );
};
