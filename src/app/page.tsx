import Link from "next/link";

import { routes } from "@/libs/constants";

export default function Home() {
  return <Link href={routes.groupEvent.create()}>Start</Link>;
}
