import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "database",
  },
  secret: process.env.AUTH_SECRET || "defaultsecret",
})