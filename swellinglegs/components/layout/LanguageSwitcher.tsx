'use client'

import { useEffect, useState } from 'react'

export default function LanguageSwitcher() {
  const [isArabic, setIsArabic] = useState(false)

  // Detect current language from Google Translate cookie on load
  useEffect(() => {
    setIsArabic(document.cookie.includes('googtrans=/en/ar'))
  }, [])

  const switchTo = (lang: 'ar' | 'en') => {
    if (lang === 'ar') {
      document.cookie = 'googtrans=/en/ar; path=/'
    } else {
      // Delete the cookie to restore English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    }
    window.location.reload()
  }

  return (
    <div
      className="flex items-center rounded-full overflow-hidden border border-brand-border bg-white shadow-sm flex-shrink-0"
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchTo('en')}
        className={`px-3 py-1.5 text-xs font-semibold transition-all ${
          !isArabic
            ? 'bg-brand-deep-mint text-white'
            : 'text-brand-fern hover:bg-brand-bg hover:text-brand-forest'
        }`}
      >
        EN
      </button>
      <div className="w-px h-4 bg-brand-border flex-shrink-0" />
      <button
        onClick={() => switchTo('ar')}
        lang="ar"
        className={`px-3 py-1.5 text-xs font-semibold transition-all ${
          isArabic
            ? 'bg-brand-deep-mint text-white'
            : 'text-brand-fern hover:bg-brand-bg hover:text-brand-forest'
        }`}
      >
        &#x639;&#x631;&#x628;&#x64A;
      </button>
    </div>
  )
}