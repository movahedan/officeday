import Link from "next/link";

import { routes } from "@/libs/constants";

export default function Home() {
  return <Link href={routes.frontend.groupEvent.create()}>Start</Link>;
}
