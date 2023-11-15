import { NextIntlClientProvider } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { notFound, locales } from "@/libs/router";

import { WebVitals } from "../WebVitals";

import type { Locales } from "@/libs/router";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: Locales };
};

export default async function LocaleLayout({
  params: { locale },
  children,
}: LocaleLayoutProps) {
  unstable_setRequestLocale(locale);

  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../../public/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <WebVitals />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "document" });
  const websiteName = t("title");
  const websiteDescription = t("description");
  const websiteUrl = new URL("https://www.officeday.dev");

  return {
    title: websiteName,
    description: websiteDescription,
    metadataBase: websiteUrl,
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
      images: "/icons/favicon.ico",
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      title: websiteName,
      statusBarStyle: "black-translucent",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: [
      { rel: "shortcut icon", url: "/icons/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", url: "/icons/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/icons/calendar-android-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "72x72",
        url: "/icons/calendar-android-72x72.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/icons/calendar-web-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/icons/calendar-web-16x16.png",
      },
    ],
  };
}
