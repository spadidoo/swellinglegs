'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const floatingPhotos = [
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=300&q=70', style: { top: '8%',  left: '2%',  width: '130px' }, rotate: -8,  delay: 0.0 },
  { src: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?auto=format&fit=crop&w=300&q=70', style: { top: '5%',  right: '2%', width: '120px' }, rotate: 7,   delay: 0.15 },
  { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=70', style: { bottom: '8%', left: '4%', width: '140px' }, rotate: 5,   delay: 0.3 },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=300&q=70', style: { bottom: '6%', right: '3%', width: '125px' }, rotate: -6,  delay: 0.45 },
]

export default function CommunityHero() {
  const t = useTranslations('community')

  return (
    <div
      className="relative py-20 sm:py-28 px-5 text-center overflow-hidden min-h-[320px] flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}
    >
      {floatingPhotos.map((p, i) => (
        <motion.div
          key={i}
          className="absolute hidden sm:block rounded-2xl overflow-hidden shadow-xl pointer-events-none"
          style={{ ...p.style, aspectRatio: '3/4' }}
          initial={{ opacity: 0, scale: 0.4, rotate: p.rotate - 25, y: 30 }}
          animate={{ opacity: 0.38, scale: 1, rotate: p.rotate, y: 0 }}
          transition={{ delay: p.delay, duration: 1.1, type: 'spring', stiffness: 55, damping: 14 }}
        >
          <img src={p.src} alt="" className="w-full h-full object-cover" aria-hidden />
        </motion.div>
      ))}

      {[200, 340, 480].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-white/10 hidden sm:block pointer-events-none"
          style={{ width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/30 uppercase tracking-widest"
        >
          {t('badge')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-white/70 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 8 10 13 15 8" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}