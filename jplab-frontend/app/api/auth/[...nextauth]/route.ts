// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// ---------------------
// Custom types
// ---------------------
type MyUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type MyJWT = {
  [key: string]: any; // allow extra fields
  accessToken?: string;
  user?: MyUser;
};

type MySession = DefaultSession & {
  accessToken?: string;
  user?: MyUser;
};

// ---------------------
// NextAuth options
// ---------------------
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const t = token as MyJWT;
      if (account) t.accessToken = account.access_token;
      if (user) t.user = { name: user.name, email: user.email, image: user.image };
      return t;
    },
    async session({ session, token }) {
      const s = session as MySession;
      const t = token as MyJWT;
      s.user = t.user;
      s.accessToken = t.accessToken;
      return s;
    },
  },
};

// ---------------------
// App Router handlers
// ---------------------
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
