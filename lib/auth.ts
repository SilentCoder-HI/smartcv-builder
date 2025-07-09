import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import getMongoClient from '@/lib/mongodb'; // ✅ should be a default export
import { NextAuthOptions } from 'next-auth';

export const getAuthOptions = async (): Promise<NextAuthOptions> => {
  const client = getMongoClient(); // ✅ CALL the function to get MongoClient

  return {
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: MongoDBAdapter(client), // ✅ now this is correct
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (session.user && token.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
  };
};
