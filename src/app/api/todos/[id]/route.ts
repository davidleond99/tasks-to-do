import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET({ params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo)
    return NextResponse.json(
      { message: `Todo con id '${id}' no existe` },
      { status: 404 }
    );

  return NextResponse.json(todo);
}

const postSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});
export async function PUT(request: Request, { params }: Segments) {
  try {
    const { id } = params;
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo)
      return NextResponse.json(
        { message: `Todo con id '${id}' no existe` },
        { status: 404 }
      );

    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

// export async function DELETE({ params }: Segments) {
//   const { id } = params;
//   const todo = await prisma.todo.findFirst({ where: { id } });

//   if (!todo)
//     return NextResponse.json(
//       { message: `Todo con id '${id}' no existe` },
//       { status: 404 }
//     );

//   const deletedTodo = await prisma.todo.delete({ where: { id } });
//   return NextResponse.json({ message: "deleted", deletedTodo });
// }
