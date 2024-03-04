"use client";

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as api from "../..";
import { useRouter } from "next/navigation";
import { deleteCompleted } from "../..";

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    const createdTodo = await api.createTodo(description);
    console.log({ createdTodo });
    setDescription("");
    router.refresh();
  };

  const onDelete = async () => {
    await deleteCompleted();
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={onDelete}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-500 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar completados</span>
      </button>
    </form>
  );
};
