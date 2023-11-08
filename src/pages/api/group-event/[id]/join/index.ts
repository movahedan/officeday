import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import type { Person } from "@/libs/prisma/types";
import type { NextRequest } from "next/server";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// This function could also be imported from another file if you prefer
async function createPerson(data: Person) {
  const person = await prisma.person.create({
    data,
  });

  return person;
}

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { person } = req.body as any;
      const newPerson = await createPerson(person);

      return new NextResponse(JSON.stringify(newPerson), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);

      return new NextResponse(
        JSON.stringify({
          error: "An error occurred while creating the person.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } else {
    // Handle any other HTTP methods as you wish
    return new NextResponse(null, { status: 405 });
  }
}
