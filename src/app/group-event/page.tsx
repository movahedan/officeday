"use client";

import { GroupEventCreateForm } from "@/libs/ui/forms/GroupEventCreateForm";

export default function GroupEventCreatePage() {
  return (
    <main className="flex flex-col items-center justify-between h-full p-24">
      <GroupEventCreateForm />
    </main>
  );
}
