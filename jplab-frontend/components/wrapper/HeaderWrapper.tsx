// components/header/HeaderWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/header/header";

export default function HeaderWrapper() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}
