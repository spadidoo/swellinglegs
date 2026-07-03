'use client'

import { useState } from 'react'
import { motion, type Variants } from "framer-motion";
import { useTranslations } from 'next-intl'
import HeroCarousel from '@/components/home/HeroCarousel'
import LymphaticEducation from '@/components/home/LymphaticEducation'
import ConditionModal, { type ModalType } from '@/components/home/ConditionModal'
import AnatomyIllustration from '@/components/home/AnatomyIllustration'

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }
const vp = { once: true, margin: '-55px' }

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 108, behavior: 'smooth' })
}

export default function HomePage() {
  const [modal, setModal] = useState<ModalType>(null)
  const t = useTranslations('home')

  const cards = [
    {
      id: 'lymphedema-card', type: 'lymphedema' as ModalType,
      badge: t('lymphedema.badge'), title: t('lymphedema.title'),
      question: t('lymphedema.question'),
      symptoms: [t('lymphedema.s1'), t('lymphedema.s2'), t('lymphedema.s3'), t('lymphedema.s4')],
    },
    {
      id: 'lipedema-card', type: 'lipedema' as ModalType,
      badge: t('lipedema.badge'), title: t('lipedema.title'),
      question: t('lipedema.question'),
      symptoms: [t('lipedema.s1'), t('lipedema.s2'), t('lipedema.s3'), t('lipedema.s4')],
    },
  ]

  return (
    <>
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <HeroCarousel />
          <div className="relative z-10 text-center px-8 max-w-3xl mx-auto pt-32 pb-48 w-full">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 border border-white/30 uppercase tracking-widest">
              {t('heroBadge')}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }} 
              style={{ textShadow: '0 2px 32px rgba(0,0,0,0.75), 0 0 64px rgba(0,0,0,0.35)' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {t('heroTitle')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ textShadow: '0 1px 16px rgba(0,0,0,0.7)' }}  
              className="text-base sm:text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button onClick={() => scrollToId('lymphedema-card')}
                  className="w-full sm:w-auto bg-white text-brand-teal font-semibold px-8 py-4 rounded-full hover:bg-brand-pale-mint transition-colors text-center shadow-[0_4px_32px_rgba(0,0,0,0.4)]">
                  <span className="block">{t('heroBtn1')}</span>
                  <span className="block text-xs font-normal text-brand-teal/60 mt-0.5">{t('heroBtnHint')}</span>
                </button>
                <button onClick={() => scrollToId('lipedema-card')}
                  className="w-full sm:w-auto bg-white text-brand-teal font-semibold px-8 py-4 rounded-full hover:bg-brand-pale-mint transition-colors text-center shadow-[0_4px_32px_rgba(0,0,0,0.4)]">
                  <span className="block">{t('heroBtn2')}</span>
                  <span className="block text-xs font-normal text-brand-teal/60 mt-0.5">{t('heroBtnHint')}</span>
                </button>
            </motion.div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </section>

        {/* ── INTRO STRIP ── */}
        <section className="bg-white py-10 px-5 border-b border-brand-border">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
            className="text-center text-brand-fern text-sm max-w-2xl mx-auto">
            <span className="font-semibold text-brand-forest">{t('introText')}</span>{' '}
            <span className="font-semibold text-brand-deep-mint">{t('introHighlight')}</span>{' '}
            {t('introTextEnd')}
          </motion.p>
        </section>

        {/* ── LYMPHATIC EDUCATION ── */}
        <LymphaticEducation />

        {/* ── CONDITION CARDS ── */}
        <section className="bg-brand-bg py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-12">
              <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">
                {t('sectionLabel')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">
                {t('sectionTitle')}
              </motion.h2>
            </motion.div>

            <div className="space-y-6">
              {cards.map((card, idx) => (
                <motion.div key={card.id} id={card.id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl border border-brand-border overflow-hidden hover:border-brand-deep-mint hover:shadow-md transition-all">
                  <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
                    <div className="flex items-center justify-center p-8 bg-brand-bg sm:bg-white border-b sm:border-b-0 sm:border-r border-brand-border">
                      <AnatomyIllustration type={card.type as 'lymphedema' | 'lipedema'} />
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <span className="inline-block bg-brand-pale-mint text-brand-deep-mint text-xs font-semibold px-3 py-1 rounded-full mb-4">
                          {card.badge}
                        </span>
                        <h3 className="text-2xl font-bold text-brand-forest mb-2">{card.title}</h3>
                        <p className="text-brand-fern text-sm italic mb-5 leading-relaxed">{card.question}</p>
                        <ul className="space-y-2.5 mb-7">
                          {card.symptoms.map((s) => (
                            <li key={s} className="flex items-start gap-2.5 text-sm text-brand-fern">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-deep-mint mt-1.5 flex-shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button onClick={() => setModal(card.type)}
                        className="flex items-center gap-2 bg-brand-deep-mint text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-teal transition-colors self-start group">
                        {t('openGuide')}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                          <line x1="3" y1="8" x2="13" y2="8" /><polyline points="9 4 13 8 9 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ duration: 0.5 }} className="text-center pt-8">
              <button onClick={() => setModal('compare')}
                className="inline-flex items-center gap-2 text-brand-fern text-sm hover:text-brand-deep-mint transition-colors border border-brand-border px-5 py-2.5 rounded-full hover:border-brand-deep-mint bg-white">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="1" y="3" width="5.5" height="9" rx="1" /><rect x="8.5" y="3" width="5.5" height="9" rx="1" />
                </svg>
                {t('compareLink')}
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white py-16 border-y border-brand-border">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
            className="max-w-4xl mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 text-center divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
              {[
                { v: t('stat1v'), l: t('stat1l') },
                { v: t('stat2v'), l: t('stat2l') },
                { v: t('stat3v'), l: t('stat3l') },
              ].map((s) => (
                <motion.div key={s.l} variants={fadeUp} className="py-10 sm:py-0">
                  <div className="text-4xl font-bold text-brand-deep-mint mb-2">{s.v}</div>
                  <div className="text-brand-fern text-sm">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 sm:py-28 px-5" style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="max-w-2xl mx-auto text-center">
            <motion.span variants={fadeUp} className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6 border border-white/30">
              {t('ctaBadge')}
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              {t('ctaTitle')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/75 mb-10 text-base sm:text-lg leading-relaxed">
              {t('ctaSubtitle')}
            </motion.p>
            <motion.a variants={fadeUp} href="/contact"
              className="inline-block bg-white text-brand-teal font-semibold px-10 py-4 rounded-full hover:bg-brand-pale-mint transition-colors">
              {t('ctaButton')}
            </motion.a>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center text-white/60 text-sm">
              <span>{t('ctaPhone')}</span>
              <span>{t('ctaEmail')}</span>
              <span>{t('ctaHours')}</span>
            </motion.div>
          </motion.div>
        </section>

      </main>

      {modal && <ConditionModal type={modal} onClose={() => setModal(null)} />}
    </>
  )
}