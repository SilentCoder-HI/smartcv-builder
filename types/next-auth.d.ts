// types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// ✅ Extend Session interface
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// ✅ Extend JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    picture?: string;
  }
}
