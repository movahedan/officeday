import { Footer } from "@/libs/ui/server-side";

import type { ReactNode } from "react";

export type GroupEventLayoutProps = {
  children: ReactNode;
};

export default function GroupEventLayout({ children }: GroupEventLayoutProps) {
  return (
    <>
      <main className="flex flex-col items-center justify-between flex-1 w-full p-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
