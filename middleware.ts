export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/dashboar", "/cv/:path*", "/api/auth/:path*"],
}
