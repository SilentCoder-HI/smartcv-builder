export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/dashboard", "/cv/:path*", "/api/auth/:path*"],
}
