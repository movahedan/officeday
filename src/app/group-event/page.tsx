"use client";

import { GroupEventCreateForm } from "@/libs/ui/forms/GroupEventCreateForm";

export default function GroupEventCreatePage() {
  return (
    <main className="flex flex-col items-center justify-between h-full p-24">
      <div className="m-auto max-w-400">
        <h1 className="text-xl text-center">Create a new office day</h1>
        <GroupEventCreateForm />
      </div>
    </main>
  );
}
