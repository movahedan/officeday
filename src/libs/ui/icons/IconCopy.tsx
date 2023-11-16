import { twMerge } from "tailwind-merge";

import { classNames } from "@/libs/utilities/string";

export type IconCopyProps = {
  className?: string;
};

export const IconCopy = ({ className }: IconCopyProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={twMerge(classNames(["transition-all duration-300", className]))}
  >
    <g clip-path="url(#clip0_429_11155)">
      <path
        d="M16 3H4V16"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 7H20V19C20 20.1046 19.1046 21 18 21H10C8.89543 21 8 20.1046 8 19V7Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_429_11155">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
