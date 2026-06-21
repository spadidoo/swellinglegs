'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const locale   = useLocale()
  const pathname = usePathname()

  // Build the path without any locale prefix
  // next-intl 'as-needed': English = /page, Arabic = /ar/page
  let bare = pathname
  if (locale === 'ar') {
    if (pathname.startsWith('/ar/')) {
      bare = pathname.slice(3)   // '/ar/community' → '/community'
    } else {
      bare = '/'                 // '/ar' → '/'
    }
  }

  const enHref = bare
  const arHref = bare === '/' ? '/ar' : '/ar' + bare

  return (
    <div
      className="flex items-center rounded-full border border-white/30 overflow-hidden flex-shrink-0"
      style={{ background: 'rgba(255,255,255,0.15)' }}
      role="group"
      aria-label="Language switcher"
    >
      <a
        href={enHref}
        aria-current={locale === 'en' ? 'true' : undefined}
        className={`px-3 py-1.5 text-xs font-semibold transition-all ${
          locale === 'en'
            ? 'bg-white text-brand-forest'
            : 'text-brand-fern hover:text-brand-forest'
        }`}
      >
        EN
      </a>
      <a
        href={arHref}
        aria-current={locale === 'ar' ? 'true' : undefined}
        lang="ar"
        dir="rtl"
        className={`px-3 py-1.5 text-xs font-semibold transition-all ${
          locale === 'ar'
            ? 'bg-white text-brand-forest'
            : 'text-brand-fern hover:text-brand-forest'
        }`}
      >
        &#x639;&#x631;&#x628;&#x64A;
      </a>
    </div>
  )
}