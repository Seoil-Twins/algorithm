import NextAuth, { NextAuthOptions } from "next-auth";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import CredentialsProvider from "next-auth/providers/credentials";

import { axiosInstance } from "@/api";
import { User } from "@/interfaces/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        userPw: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axiosInstance.post("/login", {
            email: credentials?.email,
            userPw: credentials?.userPw,
          });
          const apiCookies = response.headers["set-cookie"];

          if (response.status === 200 && apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              const parsedCookie = parse(cookie);
              const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
              const httpOnly = cookie.includes("HttpOnly");

              cookies().set(cookieName, cookieValue, {
                httpOnly,
                maxAge: parseInt(parsedCookie["Max-Age"]),
                path: parsedCookie.path,
                sameSite: parsedCookie.samesite ? true : false,
                expires: new Date(parsedCookie.expires),
                // secure: true
              });
            });

            const user = (await axiosInstance.get("/user/me")).data;
            return user;
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.user = user;
      }

      if (trigger === "update" && session?.user) {
        console.log(session.user);

        for (const key in session.user) {
          (token.user as any)[key] = session.user[key];
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/signup",
  },
  session: {
    maxAge: 1800,
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, authOptions);
};

export { handler as GET, handler as POST };
