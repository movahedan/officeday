import "./globals.css";
import { Inter } from "next/font/google";

import {
  websiteBaseUrl,
  websiteDescription,
  websiteName,
} from "@/libs/constants";
import { classNames } from "@/libs/utilities/string";

import { Footer } from "@/libs/ui/server-side";

import { WebVitals } from "./WebVitals";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
      </head>
      <body
        className={classNames(["flex flex-col min-h-screen", inter.className])}
      >
        <main className="flex flex-col items-center justify-between flex-1 p-24">
          {children}
        </main>
        <Footer />
        <WebVitals />
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

export const metadata: Metadata = {
  title: websiteName,
  description: websiteDescription,
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL(websiteBaseUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: websiteName,
    images: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: websiteName,
    statusBarStyle: "black-translucent",
  },
  icons: [
    { rel: "shortcut icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/calendar-android-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "72x72",
      url: "/calendar-android-72x72.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/calendar-web-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/calendar-web-16x16.png",
    },
  ],
};
