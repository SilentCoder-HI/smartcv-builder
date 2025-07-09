import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/auth";

const handler = async (req: Request) => {
  const authOptions = await getAuthOptions();
  // ✅ Forward req and get the Response
  return NextAuth(authOptions)(req); // ✅ This returns a Response
};

export { handler as GET, handler as POST };
