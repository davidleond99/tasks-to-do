"use server";
import { Todo } from ".prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `Todo con id ${id} no encontrado`;

  const updatedtodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedtodo;
};

export const addTodo = async (description: string, userId: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description, userId } });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return { message: "Error creando todo" };
  }
};

export const deleteCompleted = async () => {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });
    revalidatePath("/dashboard/server-todos");
    return { message: "Borrados" };
  } catch (error) {
    return { message: "Error Borrando completados" };
  }
};
