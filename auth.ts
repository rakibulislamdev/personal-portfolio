import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const inputEmail = credentials?.email as string;
        const inputPassword = credentials?.password as string;

        if (!inputEmail || !inputPassword) return null;

        // Check if input credentials match ADMIN ENV credentials
        if (adminEmail && adminPassword && inputEmail === adminEmail && inputPassword === adminPassword) {
          let user = await prisma.user.findUnique({
            where: { email: adminEmail },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                name: "Rakibul Islam",
                email: adminEmail,
                password: adminPassword,
                role: "ADMIN",
              },
            });
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || "ADMIN",
          };
        }

        // If credentials don't match ENV, check DB user directly
        const user = await prisma.user.findUnique({
          where: { email: inputEmail },
        });

        if (user && user.password === inputPassword) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET || "your_nextauth_secret_key_here_32_chars",
});
