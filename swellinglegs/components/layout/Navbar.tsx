'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

const BG     = 'rgba(255,255,255,0.60)'
const SHADOW = '0 4px 28px rgba(0,0,0,0.10),inset 0 1.5px 0 rgba(255,255,255,0.80)'
const GLOW   = '0 0 32px rgba(61,180,137,0.32),0 4px 24px rgba(0,0,0,0.10),inset 0 1.5px 0 rgba(255,255,255,0.90)'
const PILL_W = 252

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const t        = useTranslations('nav')
  const locale   = useLocale()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', y => setScrolled(y > 80))
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // ── Locale-aware link builder ──────────────────────────────────
  // This is what was missing — nav links MUST include the /ar prefix
  // when the user is in Arabic mode, otherwise every click resets to English
  const lhref = (path: string) =>
    locale === 'ar' ? (path === '/' ? '/ar' : `/ar${path}`) : path

  // Compare clean paths (strip /ar prefix) for active detection
  const cleanPath = pathname.startsWith('/ar') ? (pathname.slice(3) || '/') : pathname
  const isActive  = (path: string) =>
    path === '/' ? cleanPath === '/' : cleanPath.startsWith(path)

  const navLinks = [
    { path: '/',          label: t('home')      },
    { path: '/community', label: t('community') },
    { path: '/about',     label: t('about')     },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 p-4">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start justify-between w-full">

        {/* Logo — morphs to circle on scroll */}
        <Link href={lhref('/')} aria-label="Herald Medical — home">
          <motion.div
            animate={scrolled ? 'ball' : 'pill'}
            variants={{
              pill: { width: PILL_W, borderRadius: 16 },
              ball: { width: 52,     borderRadius: 26 },
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            whileHover={{ boxShadow: GLOW, scale: 1.05, background: 'rgba(255,255,255,0.72)', transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
            className="relative flex items-center justify-center overflow-hidden backdrop-blur-2xl cursor-pointer"
            style={{ height: 52, background: BG, boxShadow: SHADOW }}
          >
            {/* Pill content */}
            <motion.div
              className="absolute inset-0 flex items-center gap-3 px-4"
              animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? -10 : 0 }}
              transition={{ duration: 0.18 }}
              style={{ pointerEvents: scrolled ? 'none' : 'auto', whiteSpace: 'nowrap' }}
            >
              <img src="/images/herald-logo-horizontal.png" alt="Herald Medical" className="h-8 w-auto flex-shrink-0" />
              <div className="w-px self-stretch bg-brand-deep-mint/40 flex-shrink-0" />
              <span className="text-brand-forest text-[11px] font-semibold leading-tight flex-shrink-0">
                Dr. Ibrahim<br />Riza
              </span>
            </motion.div>

            {/* Ball content */}
            <AnimatePresence>
              {scrolled && (
                <motion.img
                  key="badge"
                  src="/images/herald-logo-badge.png"
                  alt="Herald Medical"
                  className="absolute w-8 h-8 object-contain"
                  initial={{ opacity: 0, rotate: -300, scale: 0.3 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 300, scale: 0.3 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </Link>

        {/* Nav pill */}
        <motion.div
          className="flex items-center gap-5 backdrop-blur-2xl rounded-2xl px-6"
          style={{
            height: 52,
            background: scrolled ? 'rgba(255,255,255,0.95)' : BG,
            boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.10),0 1px 0 rgba(200,221,216,0.5)' : SHADOW,
          }}
          whileHover={{ boxShadow: GLOW, transition: { duration: 0.2 } }}
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={lhref(link.path)}
              className={`text-sm font-medium transition-all rounded-full ${
                isActive(link.path)
                  ? 'bg-brand-coral text-white px-3 py-1 font-semibold'
                  : 'text-brand-forest hover:text-brand-deep-mint'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <LanguageSwitcher />

          <Link
            href={lhref('/contact')}
            className="bg-brand-coral text-white text-sm font-medium px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            {t('book')}
          </Link>
        </motion.div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <div
          className="flex items-center justify-between px-4 backdrop-blur-2xl rounded-2xl"
          style={{
            height: 56,
            background: scrolled ? 'rgba(255,255,255,0.95)' : BG,
            boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.10)' : SHADOW,
          }}
        >
          <Link href={lhref('/')} className="flex items-center gap-2.5">
            <motion.img
              src="/images/herald-logo-badge.png"
              alt="Herald Medical"
              className="h-8 w-auto"
              whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 8px rgba(61,180,137,0.55))' }}
              whileTap={{ scale: 0.91 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            />
            <span className="text-brand-forest font-semibold text-sm leading-tight">
              Herald Medical
              <span className="block text-brand-fern text-xs font-normal">Dr. Ibrahim Riza</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 text-brand-forest"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-2 px-4 py-2 backdrop-blur-2xl rounded-2xl" style={{ background: 'rgba(255,255,255,0.92)', boxShadow: SHADOW }}>
            <nav className="flex flex-col">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  href={lhref(link.path)}
                  className={`py-3.5 text-sm font-medium border-b border-brand-border last:border-0 flex items-center justify-between ${
                    isActive(link.path) ? 'text-brand-forest font-semibold' : 'text-brand-forest/70'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && <span className="w-2 h-2 rounded-full bg-brand-coral flex-shrink-0" />}
                </Link>
              ))}
            </nav>
            <Link
              href={lhref('/contact')}
              className="mt-3 mb-1 block bg-brand-coral text-white text-sm font-medium px-5 py-3.5 rounded-full text-center"
            >
              {t('bookFull')}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}