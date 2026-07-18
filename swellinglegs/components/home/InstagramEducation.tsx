'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'

// ── Add your Instagram post URLs here ─────────────────────────────
const VIDEOS = [
  {
    url: 'https://www.instagram.com/p/DZiD4k4tfa0/',
    title: 'Lipedema Awareness Month: Understanding Lymphatic Massage',
    summary: 'Nurse Nielsen explains how manual lymphatic drainage can help manage symptoms of lipedema, including swelling, pain, and heaviness.',
    tags: ['lipedema', 'lymphatic-drainage', 'awareness'],
  },
  {
    url: 'https://www.instagram.com/p/DWjaVAtDWSB/',
    title: 'Do Varicose Veins Always Come Back?',
    summary: 'Dr. Ibrahim Riza discusses how modern ultrasound-guided treatments have significantly improved long-term outcomes and reduced recurrence rates.',
    tags: ['varicose-veins', 'vascular-health', 'treatment'],
  },
  {
    url: 'https://www.instagram.com/p/DUVZJCBDc4t/',
    title: 'Frequently Asked Questions About Lymphatic Drainage',
    summary: 'Nurse Nielsen answers common questions about lymphatic drainage therapy, including how it helps with lymphedema and lipedema.',
    tags: ['lymphatic-drainage', 'lymphedema', 'lipedema'],
  },
  {
    url: 'https://www.instagram.com/p/DZFL5YqtMxa/',
    title: 'What Can a Vascular Screening Detect?',
    summary: 'Dr. Ibrahim Riza explains the importance of vascular screening and the conditions it can help identify early.',
    tags: ['vascular-screening', 'vascular-health', 'prevention'],
  },
]

// ── Process Instagram embeds ───────────────────────────────────────
function processEmbeds() {
  if (typeof window !== 'undefined' && (window as any).instgrm?.Embeds) {
    ;(window as any).instgrm.Embeds.process()
  }
}

function InstagramEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Try processing immediately, then retry a few times
    // to handle cases where script loads after component mounts
    processEmbeds()
    const t1 = setTimeout(processEmbeds, 800)
    const t2 = setTimeout(processEmbeds, 2000)
    const t3 = setTimeout(processEmbeds, 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [url])

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto">
      {/* Official Instagram embed — blockquote is required, do not change to iframe */}
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ maxWidth: '100%', width: '100%', margin: 0, border: 'none' }}
      />
    </div>
  )
}

export default function InstagramEducation() {
  const [index,     setIndex]     = useState(0)
  const [direction, setDirection] = useState(1)
  const video = VIDEOS[index]

  const go = (next: number) => {
    const clamped = (next + VIDEOS.length) % VIDEOS.length
    setDirection(clamped > index ? 1 : -1)
    setIndex(clamped)
  }

  const dragStart = useRef(0)

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <div className="py-20 px-5 bg-white border-y border-brand-border overflow-hidden">

      {/* Load Instagram embed script once — processes all blockquotes on page */}
      <Script
        src="https://www.instagram.com/embeds.js"
        strategy="afterInteractive"
        onLoad={processEmbeds}
      />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @vasculardxb on Instagram
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest mb-2">Watch and learn</h2>
          <p className="text-brand-fern text-sm">Short educational videos. Swipe or use arrows to browse.</p>
        </motion.div>

        {/* Carousel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start justify-items-center">

          {/* Embed carousel */}
          <div className="w-full max-w-sm relative min-h-[500px]">
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
                onDragStart={(_: any, info: any) => { dragStart.current = info.point.x }}
                onDragEnd={(_: any, info: any) => {
                  const delta = info.point.x - dragStart.current
                  if (delta < -40) go(index + 1)
                  if (delta >  40) go(index - 1)
                }}
                style={{ touchAction: 'pan-y' }}
              >
                <InstagramEmbed url={video.url} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info panel */}
          <div className="w-full max-w-md">

            <p className="text-brand-fern text-xs font-medium mb-4 uppercase tracking-widest">
              {index + 1} / {VIDEOS.length}
            </p>

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

            {/* Navigation arrows + dots */}
            <div className="flex items-center gap-4">
              <button onClick={() => go(index - 1)} aria-label="Previous"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border text-brand-fern hover:border-brand-deep-mint hover:text-brand-forest transition-all">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="11 4 6 9 11 14"/>
                </svg>
              </button>

              <div className="flex items-center gap-1.5">
                {VIDEOS.map((_, i) => (
                  <button key={i} onClick={() => go(i)} aria-label={`Video ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{ width: i === index ? 20 : 6, height: 6, background: i === index ? '#3DB489' : '#C8DDD8' }}
                  />
                ))}
              </div>

              <button onClick={() => go(index + 1)} aria-label="Next"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-brand-border text-brand-fern hover:border-brand-deep-mint hover:text-brand-forest transition-all">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 4 12 9 7 14"/>
                </svg>
              </button>
            </div>

            {/* Open on Instagram link */}
            <a href={video.url} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-brand-fern hover:text-brand-forest transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Open on Instagram
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 9L9 1M9 1H3M9 1V7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Follow link */}
        <div className="text-center mt-12">
          <a href="https://www.instagram.com/vasculardxb/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-fern hover:text-brand-forest transition-colors border border-brand-border rounded-full px-5 py-2.5 hover:border-brand-deep-mint">
            See all posts at @vasculardxb
          </a>
        </div>
      </div>
    </div>
  )
}