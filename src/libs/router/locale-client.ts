"use client";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useChangeLocale = (nextLocale: string) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return useCallback(
    () => router.push({ pathname, query }, asPath, { locale: nextLocale }),
    [asPath, nextLocale, pathname, query, router],
  );
};
