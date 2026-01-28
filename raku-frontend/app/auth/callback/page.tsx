"use client";

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export default function GoogleCallback() {
  const router = useRouter();
  const { login } = useAuthStore.getState();

  useEffect(() => {
    const loginUser = async () => {
      const session = await getSession();
      if (!session?.user) {
        toast.error("Google login failed");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/google-login`,
          {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
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
            phone_number: data.phone_number,
            photo: data.photo,
            is_subscribed: data.is_subscribed,
            current_package_id: data.current_package_id,
            current_package_name: data.current_package_name,
            user_subscriptions_id: data.user_subscriptions_id,
            is_free: data.is_free,
            candidate_code: data.candidate_code,
          };
          login(user, token);
          toast.success("Login successful");
          router.push("/dashboard");
        } else {
          toast.error("Login failed");
        }
      } catch (err) {
        console.log(err);
        toast.error("Login failed");
      }
    };

    loginUser();
  }, [login, router]);

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="p-6 bg-white rounded shadow-md flex flex-col items-center gap-4">
        {/* Google Logo Spinner */}
        <div className="">
          <svg
            className="w-12 h-12"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-18.9-1.5-37.1-4.3-54.7H272v103.7h147.1c-6.3 34.1-25.2 62.9-53.7 82.1v68.2h86.7c50.9-46.9 80.4-115.8 80.4-199.3z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c72.6 0 133.5-24 178-65.1l-86.7-68.2c-24.2 16.2-55.1 25.7-91.3 25.7-70.2 0-129.7-47.4-151-111.1H32.6v69.7c44.6 88.5 135.3 149 239.4 149z"
              fill="#34a853"
            />
            <path
              d="M120.7 317.4c-10.9-32.6-10.9-67.8 0-100.4V147.3H32.6c-40.3 79-40.3 172.2 0 251.2l88.1-81.1z"
              fill="#fbbc05"
            />
            <path
              d="M272 107.6c37.2-.6 72.7 13.6 99.8 39.6l74.8-74.8C404.9 24 344 0 272 0 167.9 0 77.2 60.5 32.6 149l88.1 69c21.3-63.7 80.8-111.4 151.3-110.4z"
              fill="#ea4335"
            />
          </svg>
        </div>

        <p className="text-center font-medium">Logging you in...</p>
      </div>
    </div>
  );
}
