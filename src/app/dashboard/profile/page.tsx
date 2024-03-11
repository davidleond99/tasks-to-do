"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h3>Page Profile</h3>
      <hr />

      <div className="flex flex-col gap-2 mt-2">
        <span>{session?.user?.name ?? "No Name"}</span>
        <span>{session?.user?.email ?? "No Email"}</span>
        <span>{session?.user?.image ?? "No Image"}</span>
        <span>{session?.user?.id ?? "No uuid"}</span>
        <span>{session?.user?.roles ?? "No roles"}</span>
      </div>
    </div>
  );
}
