import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',

  // ← THE KEY FIX
  // Without this, the middleware reads the browser's Accept-Language header
  // and auto-redirects back to /ar even when you click EN.
  // With localeDetection: false, only the URL decides the language.
  localeDetection: false,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}