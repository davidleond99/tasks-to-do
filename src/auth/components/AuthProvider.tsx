"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children, ...rest }: Readonly<Props>) {
  return <SessionProvider>{children}</SessionProvider>;
}
