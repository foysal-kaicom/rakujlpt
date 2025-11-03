"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/useAuthStore";
import type { Session } from "next-auth";

type ExtendedSession = Session & {
  backendUser?: any;
  backendToken?: string;
};

export default function AuthSync() {
  // Cast the entire useSession() result
  const sessionData = useSession() as {
    data: ExtendedSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };

  const { data: session, status } = sessionData;
  const { login, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated" && session?.backendUser && session?.backendToken) {
      if (!isAuthenticated) {
        login(session.backendUser, session.backendToken);
        console.log("✅ Zustand login synced from NextAuth");
      }
    }

    if (status === "unauthenticated" && isAuthenticated) {
      logout();
      console.log("🚪 Zustand logout due to session end");
    }
  }, [session, status, login, logout, isAuthenticated]);

  return null;
}
