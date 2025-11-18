"use client";

import { signIn, getSession } from "next-auth/react";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

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
    const result = await signIn("google", { redirect: false });

    if (result?.error) {
      return null;
    }
    const session = (await getSession()) as MySession;

    if (!session?.user) {
      return null;
    }

    const googleUser = session.user;

    const { login } = useAuthStore.getState();

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
        // is_phone_verified: data.is_phone_verified,
        // is_email_verified: data.is_email_verified,
        phone_number: data.phone_number,
        photo: data.photo,
        is_subscribed: data.is_subscribed,
        current_package_id: data.current_package_id,
        current_package_name: data.current_package_name,
        user_subscriptions_id: data.user_subscriptions_id,
      };
      login(user, token);

      toast.success(response?.data?.message || "Login successful");
      window.location.href = "/dashboard";
      return { user, token };
    }
    return null;
  } catch (error: any) {
    return null;
  }
};
