import { env } from "@/env";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const refreshAccessToken = async function (token: JWT) {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      credentials: "include",

      headers: {
        accept: "application/json",
      },
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const url = `${env.NEXT_PUBLIC_API_BASE_URL}/session`;

        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        const user = await response.json();

        return user;
      },
    }),
  ],
  pages: { signIn: "/login" },

  callbacks: {
    jwt: async ({ user, account, token }) => {
      console.log(user);
      if (user && account) {
        delete token.accessTokenExpires;

        const decodedAccessToken = jwtDecode(user.accessToken);

        return {
          ...token,
          accessToken: user.accessToken,
          accessTokenExpires: decodedAccessToken.exp * 1000,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken as any;
        session.error = token.error;
      }

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
