export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/action/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/modules/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Lista de TODOS",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const userSession = await getUserSessionServer();

  if (!userSession) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: userSession.id },
    orderBy: { description: "asc" },
  });

  return (
    <div>
      <div className="w-full px-3 mx-5 m-5 ">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
