"use client";

import { signIn, getSession } from "next-auth/react";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

/**
 * Handle Google login and send user info to backend.
 * Saves backend response in Zustand.
 */

type MySession = {
  accessToken?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export const googleLoginUtils = async () => {
  try {
    // Trigger Google login (account chooser popup will show)
    const result = await signIn("google", { redirect: false });

    if (result?.error) {
      console.error("Google login error:", result.error);
      return null;
    }

    // Get session after login
    const session = (await getSession()) as MySession;
    if (!session?.user || !session.accessToken) return null;

    const googleUser = session.user;

    // Access Zustand store without hooks
    const { login } = useAuthStore.getState();

    // Send user info to Laravel backend
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/google-login`,
        {
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.image,
          token: session.accessToken,
        }
      );

      if (response.status === 200) {
        const { token, data } = response.data;

        const user = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          is_phone_verified: data.is_phone_verified,
          is_email_verified: data.is_email_verified,
          phone_number: data.phone_number,
          photo: data.photo,
        };

        // Save user and token in Zustand
        login(user, token);

        toast.success(response?.data?.message || "Login successful");
      }

      return response.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.errors?.password ||
          error?.response?.data?.message ||
          "Login failed"
      );
      return null;
    }
  } catch (error) {
    console.error("Google login failed:", error);
    return null;
  }
};
