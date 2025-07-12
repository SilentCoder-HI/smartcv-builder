import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/lib/db";
import User from "@/model/user";
import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
    
      let existingUser = await User.findOne({ email: user.email });
    
      if (!existingUser) {
        const newUser = new User({
          userId: crypto.randomUUID(),
          name: user.name,
          email: user.email,
          username: user.name?.toLowerCase().replace(/\s+/g, "_") || "",
          profilePic: user.image || "",
          provider: account?.provider || "credentials", // Fixed line
          password: "", // Only keep if your schema allows empty or optional
        });
    
        try {
          existingUser = await newUser.save();
          console.log("✅ New user saved successfully.");
        } catch (error) {
          console.error("❌ Error saving new user:", error);
          return false;
        }
      }
    
      return true;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
