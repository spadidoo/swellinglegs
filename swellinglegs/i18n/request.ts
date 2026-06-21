import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// The two languages this site will support
export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the URL (e.g. "en" or "ar")
  const locale = await requestLocale

  // If someone visits an invalid locale, show a 404 page
  if (!locale || !locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    locale,
    // Load the right translation file (en.json or ar.json)
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})