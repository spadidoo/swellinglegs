'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const VIDEOS = [
  {
    id: 'early-detection',
    youtubeId: '4gvrr56exRc',
    title: 'Early Detection of Lymphedema & Lipedema',
    description: 'Nurse Nielsen Diaz explains the early warning signs of lymphedema and lipedema, and why identifying them early makes a significant difference to treatment outcomes and quality of life.',
    speaker: 'Nurse Nielsen Diaz',
    tag: 'Education',
    tagColor: '#3DB489',
  },
  {
    id: 'lipedema',
    youtubeId: 'iivnK5J_FXY',
    title: 'Understanding Lipedema',
    description: 'An overview of lipedema — what it is, how it differs from lymphedema and obesity, and why it is so frequently misdiagnosed despite affecting a significant number of women worldwide.',
    speaker: undefined as string | undefined,
    tag: 'Lipedema',
    tagColor: '#2A9D8F',
  },
  {
    id: 'dvt',
    youtubeId: 'PApNG5DoUYg',
    title: 'DVT Prevention Device',
    description: 'A demonstration of the DVT prevention device and how it helps reduce the risk of deep vein thrombosis, particularly for patients with limited mobility or those recovering from surgery.',
    speaker: undefined as string | undefined,
    tag: 'Treatment',
    tagColor: '#E76F51',
  },
  {
    id: 'compression',
    youtubeId: 'jIYdcArBPt8',
    title: 'Compression Stockings — How They Help',
    description: 'Learn how compression stockings work, how to wear and fit them correctly, and why they are a key daily component of managing lymphedema, lipedema, and venous conditions.',
    speaker: undefined as string | undefined,
    tag: 'Treatment',
    tagColor: '#E76F51',
  },
  {
    id: 'mld',
    youtubeId: 'y15lA9klK9k',
    title: 'Manual Lymphatic Drainage',
    description: 'A hands-on demonstration of manual lymphatic drainage technique, showing the precise, gentle strokes used to guide lymph fluid from the limbs toward functioning lymph nodes.',
    speaker: undefined as string | undefined,
    tag: 'Treatment',
    tagColor: '#E76F51',
  },
]

function EqBars({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[0.6, 1, 0.75, 0.9, 0.5].map((h, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: color }}
          animate={{ scaleY: [h, 1, h * 0.6, 1, h] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function VideosPlaylist() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = VIDEOS[activeIdx]
  const t = useTranslations('community')

  const tagLabel = (tag: string) => {
    if (tag === 'Education') return t('tagEducation')
    if (tag === 'Lipedema')  return t('tagLipedema')
    if (tag === 'Treatment') return t('tagTreatment')
    return tag
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-2">
          {t('videosLabel')}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">
          {t('videosTitle')}
        </h2>
        <p className="text-brand-fern text-sm mt-2">
          {t('videosSelectPrompt')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Player */}
        <div className="w-full min-w-0 lg:flex-1">
          <div className="bg-white rounded-2xl border border-brand-border overflow-hidden">

            {/* YouTube embed — 9:16 ratio for Shorts */}
            <div
              className="relative w-full bg-black"
              style={{ aspectRatio: '9 / 16', maxHeight: '70vh' }}
            >
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={active.youtubeId}
                  src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={active.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            {/* Video info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="p-5"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: active.tagColor }}
                  >
                    {tagLabel(active.tag)}
                  </span>
                  {active.speaker && (
                    <span className="text-xs text-brand-fern flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {active.speaker}
                    </span>
                  )}
                  <span className="text-xs text-brand-fern ml-auto">
                    {activeIdx + 1} / {VIDEOS.length}
                  </span>
                </div>
                <h3 className="text-brand-forest font-bold text-base mb-1">{active.title}</h3>
                <p className="text-brand-fern text-sm leading-relaxed">{active.description}</p>

                {/* Open on YouTube link */}
                <a
                  href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-brand-fern hover:text-brand-forest transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="#FF0000" width="14" height="14">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Open on YouTube
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar playlist */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 flex flex-col gap-2 lg:max-h-[600px] lg:overflow-y-auto">
          {VIDEOS.map((v, i) => {
            const isActive = i === activeIdx
            return (
              <motion.button
                key={v.id}
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, type: 'spring', damping: 22 }}
                className={`flex items-start gap-3 p-3 rounded-xl text-left w-full transition-all border ${
                  isActive
                    ? 'bg-white shadow-sm border-brand-deep-mint'
                    : 'bg-white/60 border-brand-border hover:border-brand-deep-mint hover:bg-white'
                }`}
              >
                {/* YouTube thumbnail */}
                <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-black relative">
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-brand-deep-mint/60 flex items-center justify-center">
                      <EqBars color="white" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: v.tagColor }}
                  >
                    {tagLabel(v.tag)}
                  </span>
                  <p className={`text-xs font-medium leading-snug mt-0.5 line-clamp-2 ${
                    isActive ? 'text-brand-forest' : 'text-brand-fern'
                  }`}>
                    {v.title}
                  </p>
                  {v.speaker && (
                    <p className="text-[10px] text-brand-fern/70 mt-0.5">{v.speaker}</p>
                  )}
                </div>

                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-brand-deep-mint flex-shrink-0 mt-1" />
                )}
              </motion.button>
            )
          })}
        </div>

      </div>
    </div>
  )
}