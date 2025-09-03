export { default } from 'next-auth/middleware'

// Protect /dashboard and any nested routes
export const config = {
  matcher: ['/dashboard/:path*']
}
