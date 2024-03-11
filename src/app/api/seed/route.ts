import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bycript from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bycript.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          {
            description: "Piedra del alma",
            complete: true,
          },
          {
            description: "Piedra del poder",
          },
          {
            description: "Piedra del tiempo",
          },
          {
            description: "Piedra del espacio",
          },
          {
            description: "Piedra del realidad",
          },
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed Execute" });
}
