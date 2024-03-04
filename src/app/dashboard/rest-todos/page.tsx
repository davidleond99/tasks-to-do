import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/modules/todos";

export const metadata = {
  title: "Lista de TODOS",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <div className="w-full px-3 mx-5 m-5 ">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
