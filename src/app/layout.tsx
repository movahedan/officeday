import "./globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { cookieNames } from "@/libs/utilities/cookie";

import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies();
  const darkMode =
    cookieStore.get(cookieNames.NEXT_DARK_MODE)?.value === "true";

  return (
    <html lang="en">
      <body
        className={`flex min-h-screen ${inter.className} ${darkMode && "dark"}`}
      >
        <div className="flex flex-col items-center justify-between flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}

export function generateViewport() {
  return {
    themeColor: "#444444",
    viewport:
      "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes,viewport-fit=cover",
  };
}
