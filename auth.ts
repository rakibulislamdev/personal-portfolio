import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Secure Password Hashing Helpers using Node.js native crypto
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === originalHash;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "rirakib03@gmail.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";

        const inputEmail = credentials?.email as string;
        const inputPassword = credentials?.password as string;

        if (!inputEmail || !inputPassword) return null;

        // Check if input credentials match ADMIN ENV credentials
        if (inputEmail === adminEmail && inputPassword === adminPassword) {
          let user = await prisma.user.findUnique({
            where: { email: adminEmail },
          });

          const hashedPassword = hashPassword(adminPassword);

          if (!user) {
            user = await prisma.user.create({
              data: {
                name: "Rakibul Islam",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
              },
            });
          } else if (!user.password) {
            // Update user with hashed password if not exists
            user = await prisma.user.update({
              where: { id: user.id },
              data: { password: hashedPassword },
            });
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || "ADMIN",
          };
        }

        // If credentials don't match ENV, check DB user with hashed password
        const user = await prisma.user.findUnique({
          where: { email: inputEmail },
        });

        if (user && user.password && verifyPassword(inputPassword, user.password)) {
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
