"use client";
import React, { useState } from "react";
import { useCopyToClipboard, useTimeoutFn } from "react-use";

import { classNames } from "@/libs/utilities/string";

import {
  IconTelegram,
  IconWhatsApp,
  IconEmail,
  IconSMS,
  IconCopy,
  IconShare,
} from "../icons";

export type ShareButtonsProps = {
  url: string;
  title: string;
  text: string;
  className?: string;
};

export const ShareButtons = ({
  url,
  title,
  text,
  className,
}: ShareButtonsProps) => {
  const links = getShareLinks(title, text, url);

  const [, copy] = useCopyToClipboard();
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [, , reset] = useTimeoutFn(() => {
    setCopyButtonDisabled((prev) => (prev ? !prev : prev));
  }, 2000);

  return (
    <div
      className={classNames([
        "flex items-center justify-center gap-8",
        className,
      ])}
    >
      <button
        onClick={() => {
          copy(url);
          setCopyButtonDisabled(true);
          reset();
        }}
        disabled={copyButtonDisabled}
      >
        <IconCopy className="w-32 h-32 hover:scale-125" />
      </button>
      {Object.entries(links).map(([linkName, link]) => {
        const Icon = Icons[linkName as keyof typeof links];

        return (
          <a
            href={link}
            key={linkName}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-32 h-32 cursor-pointer"
          >
            <Icon className="hover:scale-125" />
          </a>
        );
      })}
      {!!isShareSupported() && (
        <button
          onClick={() => shareContent(title, text, url)}
          className="inline-block w-32 h-32 cursor-pointer"
        >
          <IconShare className="hover:scale-125" />
        </button>
      )}
    </div>
  );
};

const Icons = {
  whatsApp: IconWhatsApp,
  telegram: IconTelegram,
  email: IconEmail,
  sms: IconSMS,
};

const getShareLinks = (title: string, text: string, url: string) => ({
  whatsApp: `https://wa.me/?text=${encodeURIComponent(
    `${title} - ${text}: ${url}`,
  )}`,
  telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}${
    title ? `&text=${encodeURIComponent(`${title} - ${text}`)}` : ""
  }`,
  email: `mailto:?subject=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(url)}`,
  sms: `sms:?body=${encodeURIComponent(`${title} - ${text}: ${url}`)}`,
});

const isShareSupported = () => global.navigator && global.navigator.share;
const shareContent = async (title: string, text: string, url: string) => {
  if (isShareSupported()) {
    try {
      await navigator.share({ title, text, url });
      console.log("Content shared successfully");
    } catch (error) {
      console.error("Error sharing content", error);
    }
  } else {
    console.error("Web Share API is not supported in this browser");
  }
};
