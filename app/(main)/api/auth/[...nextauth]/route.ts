import NextAuth from "next-auth";
import { getAuthOptions } from "@/lib/auth";

const handler = async (req: Request, ctx: { params: any }) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req, ctx);
};

export { handler as GET, handler as POST };