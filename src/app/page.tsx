import Link from "next/link";

import { routes } from "@/libs/constants";

import { Button } from "@/libs/ui/client-side";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-cover bg-[url(/images/home-bg-large.webp)] bg-[50%_50%] xl:bg-[50%_70%]">
      <main className="inline-flex flex-col items-center justify-center mt-[-32px]">
        <p className="mb-40 text-4xl font-bold leading-tight text-center text-gray-900 md:text-5xl max-w-400 md:max-w-764">
          Harmonizing Schedules!
        </p>
        <p className="mb-24 text-xl text-center text-gray-900 md:text-2xl leading-6 md:leading-8 md:max-w-764 max-w-400">
          Quick, Easy Group Scheduling. Vote on dates and times effortlessly,
          making every meet-up a breeze!
        </p>
        <Link href={routes.groupEvent.create()}>
          <Button
            variant="green"
            className="px-32 py-12 rounded-full md:text-lg md:px-40 md:py-16"
          >
            Get started
          </Button>
        </Link>
      </main>
    </div>
  );
}
