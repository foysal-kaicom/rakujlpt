// components/header/HeaderWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/header/header";
import AuthSync from "../Authsynx";

export default function HeaderWrapper() {
  return (
    <SessionProvider>
      <Header />
      <AuthSync/>
    </SessionProvider>
  );
}
