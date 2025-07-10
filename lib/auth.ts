import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import getMongoClient from '@/lib/mongodb';
import { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const getAuthOptions = async (): Promise<NextAuthOptions> => {
  const client = getMongoClient();

  return {
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: MongoDBAdapter(client),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
        profile(profile) {
          return {
            id: profile.id?.toString(),
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
          };
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = typeof user.id === 'string' ? user.id : String(user.id);
          token.name = user.name ?? undefined;
          token.picture = user.image ?? undefined;
        }
        return token as JWT;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = typeof token.id === 'string' ? token.id : '';
          session.user.name = token.name || session.user.name;
          session.user.image = token.picture || session.user.image;
        }
        return session;
      },
    },
  };
};
