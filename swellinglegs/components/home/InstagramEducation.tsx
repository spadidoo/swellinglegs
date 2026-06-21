'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'

// ════════════════════════════════════════════════════════════════════════
//  ADD YOUR VIDEOS HERE — this is the only place you need to edit
//
//  How to get an Instagram URL:
//    1. Open the post or reel on instagram.com (desktop)
//    2. Copy the URL from the address bar
//       e.g. https://www.instagram.com/reel/AbCdEfGhIjK/
//
//  Videos show one at a time. Use ← → arrows or swipe to navigate.
//  Add as many as you like — the carousel loops automatically.
// ════════════════════════════════════════════════════════════════════════

const VIDEOS = [
  {
    url: 'https://www.instagram.com/p/REPLACE_ME_1/',
    title: 'What is the lymphatic system?',
    summary: 'A short introduction to how the lymphatic system works, why it matters and what it does for your body every single day.',
    tags: ['education', 'lymphatics'],
  },
  {
    url: 'https://www.instagram.com/p/REPLACE_ME_2/',
    title: 'Understanding lymphedema',
    summary: 'An overview of what lymphedema is, how it develops, and the earliest signs that something may be wrong with your lymphatic system.',
    tags: ['lymphedema', 'swelling'],
  },
  {
    url: 'https://www.instagram.com/p/REPLACE_ME_3/',
    title: 'Lipedema — not just weight gain',
    summary: 'Lipedema affects millions of women and is consistently misdiagnosed as obesity. This video explains what makes it different.',
    tags: ['lipedema', 'awareness'],
  },
  {
    url: 'https://www.instagram.com/p/REPLACE_ME_4/',
    title: 'Manual lymph drainage explained',
    summary: 'A demonstration of how MLD therapy works and why gentle pressure — not deep massage — is the correct approach for lymphedema treatment.',
    tags: ['treatment', 'MLD'],
  },
]

// ════════════════════════════════════════════════════════════════════════

function isPlaceholder(url: string) {
  return url.includes('REPLACE_ME')
}

function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null)

  // Re-process embed when this specific card mounts
  const onMount = (node: HTMLDivElement | null) => {
    if (!node) return
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).instgrm) {
        ;(window as any).instgrm.Embeds.process()
      }
    }, 150)
  }

  if (isPlaceholder(url)) {
    return (
      <div className="w-full aspect-[9/16] sm:aspect-[4/5] max-w-sm mx-auto rounded-2xl border-2 border-dashed border-brand-border bg-brand-bg flex flex-col items-center justify-center gap-3 text-center p-6">
        <div className="w-14 h-14 bg-brand-pale-mint rounded-full flex items-center justify-center">
          <i className="ti ti-brand-instagram text-2xl text-brand-deep-mint" />
        </div>
        <p className="text-brand-forest font-medium text-sm">Video placeholder</p>
        <p className="text-brand-fern text-xs leading-relaxed max-w-[180px]">
          Paste a real Instagram URL into <code className="bg-brand-pale-mint px-1 rounded">InstagramEducation.tsx</code>
        </p>
      </div>
    )
  }

  return (
    <div ref={onMount} className="w-full max-w-sm mx-auto">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ maxWidth: '100%', width: '100%', margin: 0 }}
      />
    </div>
  )
}

export default function InstagramEducation() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => {
    const clamped = (next + VIDEOS.length) % VIDEOS.length
    setDirection(clamped > index || (index === VIDEOS.length - 1 && clamped === 0) ? 1 : -1)
    setIndex(clamped)
  }

  const video = VIDEOS[index]

  // Swipe handling
  const dragStart = useRef(0)
  const onDragStart = (_: any, info: any) => { dragStart.current = info.point.x }
  const onDragEnd   = (_: any, info: any) => {
    const delta = info.point.x - dragStart.current
    if (delta < -40) go(index + 1)
    if (delta >  40) go(index - 1)
  }

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <div className="py-20 px-5 bg-white border-y border-brand-border overflow-hidden">
      <Script src="https://www.instagram.com/embeds.js" strategy="lazyOnload" />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <i className="ti ti-brand-instagram text-sm" />
            @vasculardxb on Instagram
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest mb-2">Watch and learn</h2>
          <p className="text-brand-fern text-sm">Short educational videos. Swipe or use arrows to browse.</p>
        </motion.div>

        {/* Main layout: video left, info right */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center justify-items-center">

          {/* Video carousel */}
          <div className="w-full max-w-sm relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                style={{ touchAction: 'pan-y' }}
              >
                <InstagramEmbed url={video.url} />
              </motion.div>
            </AnimatePresence>

            {/* Swipe hint on mobile */}
            <p className="text-center text-brand-fern text-xs mt-3 sm:hidden opacity-60">
              ← swipe to browse →
            </p>
          </div>

          {/* Info panel */}
          <div className="w-full max-w-md">

            {/* Counter */}
            <p className="text-brand-fern text-xs font-medium mb-4 uppercase tracking-widest">
              {index + 1} / {VIDEOS.length}
            </p>

            {/* Title + summary with transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-brand-forest mb-3 leading-snug">
                  {video.title}
                </h3>
                <p className="text-brand-fern leading-relaxed text-sm sm:text-base mb-5">
                  {video.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {video.tags.map(tag => (
                    <span key={tag} className="bg-brand-pale-mint text-brand-deep-mint text-xs font-semibold px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4">

              {/* Prev arrow */}
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous video"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border text-brand-fern hover:border-brand-deep-mint hover:text-brand-forest transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="11 4 6 9 11 14" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5">
                {VIDEOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to video ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      i === index ? 20 : 6,
                      height:     6,
                      background: i === index ? '#3DB489' : '#C8DDD8',
                    }}
                  />
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={() => go(index + 1)}
                aria-label="Next video"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border text-brand-fern hover:border-brand-deep-mint hover:text-brand-forest transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 4 12 9 7 14" />
                </svg>
              </button>
            </div>

            {/* View on Instagram link */}
            {!isPlaceholder(video.url) && (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs text-brand-fern hover:text-brand-forest transition-colors"
              >
                <i className="ti ti-brand-instagram text-sm" />
                Open on Instagram
                <i className="ti ti-arrow-right text-xs" />
              </a>
            )}
          </div>
        </div>

        {/* Follow link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/vasculardxb/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-fern hover:text-brand-forest transition-colors border border-brand-border rounded-full px-5 py-2.5 hover:border-brand-deep-mint"
          >
            <i className="ti ti-brand-instagram" />
            See all posts at @vasculardxb
            <i className="ti ti-arrow-right text-xs" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}