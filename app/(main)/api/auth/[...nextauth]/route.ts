import connectDB from '@/lib/db';
import NextAuth, {
  type NextAuthOptions,
  type Session,
  type User as NextAuthUser,
  type Account,
  type Profile
} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import User from '@/model/user';
import mongoose from 'mongoose';

// ✅ Helper to get environment variables safely
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// ✅ Generate a random user ID in the format user-{24letters}
function generateRandomUserId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 24; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `user-${randomPart}`;
}

// ✅ Ensure the generated userId is unique in MongoDB, improved version
async function generateUniqueUserId(): Promise<string> {
  let userId: string;
  let exists: any;
  do {
    userId = generateRandomUserId();
    // Use findOne for efficiency, and check for existence
    exists = await User.findOne({ userId }).lean().exec();
  } while (exists);
  return userId;
}

const authOptions: NextAuthOptions = {
  secret: getEnvVar('NEXTAUTH_SECRET'),
  providers: [
    GithubProvider({
      clientId: getEnvVar('GITHUB_ID'),
      clientSecret: getEnvVar('GITHUB_SECRET')
    }),
  ],
  callbacks: {
    async signIn({ user, account }: {
      user: NextAuthUser;
      account: Account | null;
      profile?: Profile;
    }) {
      if (!user?.email) return false;

      await connectDB();

      // Only search by email
      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // ✅ Generate unique MongoDB-safe userId
        const userId = await generateUniqueUserId();

        const username = user.name
          ? user.name.replace(/\s+/g, '').toLowerCase()
          : user.email.split('@')[0];

        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          userId, // ✅ assigned here
          name: user.name || '',
          username,
          email: user.email,
          password:
            Math.random().toString(36).substring(2, 17) +
            Math.random().toString(36).substring(2, 17), // random string for required field
          profilePic: user.image || '',
          coverPic: '',
          provider: account?.provider || 'github',
          plan: "Free"
        });

        try {
          existingUser = await newUser.save();
        } catch (error) {
          console.error("❌ Error saving new user:", error);
          return false;
        }
      }

      return true;
    },

    async session({ session }: {
      session: Session;
      token: any;
      user?: NextAuthUser;
    }) {
      if (session.user && session.user.email) {
        await connectDB();

        // Only use email to fetch user
        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          (session.user as any).id = dbUser.userId;
          session.user.name = dbUser.name;
          session.user.image = dbUser.profilePic;
          (session.user as any).provider = dbUser.provider;
          (session.user as any).plan = dbUser.plan;
        }
      }
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
