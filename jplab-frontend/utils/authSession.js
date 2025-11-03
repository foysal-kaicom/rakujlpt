// utils/authSession.ts
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/useAuthStore";

export const useAuthSession = () => {
  const { data: session, status } = useSession();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      login(
        {
          id: session.user.id,
          first_name: session.user.name || "",
          email: session.user.email || "",
          is_email_verified: 1,
          is_phone_verified: 0,
          phone_number: "",
          photo: session.user.image || "",
        },
        session.accessToken || ""
      );
    }
  }, [status, session, login]);
};
