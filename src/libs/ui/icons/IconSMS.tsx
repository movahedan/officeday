import { twMerge } from "tailwind-merge";

import { classNames } from "@/libs/utilities/string";

export type IconSMSProps = {
  className?: string;
};

export const IconSMS = ({ className }: IconSMSProps) => (
  <svg
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    className={twMerge(classNames(["transition-all duration-300", className]))}
  >
    <circle
      fill="none"
      stroke="currentColor"
      strokeWidth="30px"
      cx="260"
      cy="260"
      r="240"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="30px"
      d="M391.4,130.8h-266c-9,0-16.3,7.3-16.3,16.3v176.6c0,9,7.3,16.3,16.3,16.3h8.7v34.1l44-34.1h213.3
	c9,0,16.3-7.3,16.3-16.3V147.1C407.7,138.1,400.4,130.8,391.4,130.8z"
    />
    <g>
      <circle fill="currentColor" cx="178.5" cy="235.4" r="23.6" />
      <circle fill="currentColor" cx="258.4" cy="235.4" r="23.6" />
      <circle fill="currentColor" cx="338.3" cy="235.4" r="23.6" />
    </g>
  </svg>
);
