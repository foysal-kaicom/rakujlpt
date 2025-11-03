import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;

      try {
        // Send to your backend for login/registration
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            token: token.accessToken,
          }),
        });

        if (!res.ok) throw new Error("Backend login failed");
        const backendRes = await res.json();

        // Attach backend data to session
        session.backendUser = backendRes.data;
        session.backendToken = backendRes.token;
      } catch (err) {
        console.error("Error sending user to backend:", err);
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
