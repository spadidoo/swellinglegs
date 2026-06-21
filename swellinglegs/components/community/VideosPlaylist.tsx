'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIDEOS = [
  {
    id: 'early-detection',
    src: '/videos/clinic-intro.mp4',
    poster: undefined as string | undefined,
    title: 'Early Detection of Lymphedema & Lipedema',
    description: 'Nurse Nielsen Diaz explains the early warning signs of lymphedema and lipedema, and why identifying them early makes a significant difference to treatment outcomes and quality of life.',
    speaker: 'Nurse Nielsen Diaz',
    tag: 'Education',
    tagColor: '#3DB489',
  },
  {
    id: 'lipedema',
    src: '/videos/lipedema.mp4',
    poster: undefined as string | undefined,
    title: 'Understanding Lipedema',
    description: 'An overview of lipedema — what it is, how it differs from lymphedema and obesity, and why it is so frequently misdiagnosed despite affecting a significant number of women worldwide.',
    speaker: 'Dr. Ibrahim Riza',
    tag: 'Lipedema',
    tagColor: '#2A9D8F',
  },
  {
    id: 'dvt',
    src: '/videos/dvt-prevention.mp4',
    poster: undefined as string | undefined,
    title: 'DVT Prevention Device',
    description: 'A demonstration of the DVT prevention device and how it helps reduce the risk of deep vein thrombosis, particularly for patients with limited mobility or those recovering from surgery.',
    speaker: undefined as string | undefined,
    tag: 'Treatment',
    tagColor: '#E76F51',
  },
  {
    id: 'compression',
    src: '/videos/compression-stockings.mp4',
    poster: undefined as string | undefined,
    title: 'Compression Stockings — How They Help',
    description: 'Learn how compression stockings work, how to wear and fit them correctly, and why they are a key daily component of managing lymphedema, lipedema, and venous conditions.',
    speaker: 'Dr. Ibrahim Riza',
    tag: 'Treatment',
    tagColor: '#E76F51',
  },
  {
    id: 'mld',
    src: '/videos/manual-lymphatic-drainage.mp4',
    poster: undefined as string | undefined,
    title: 'Manual Lymphatic Drainage',
    description: 'A hands-on demonstration of manual lymphatic drainage technique, showing the precise, gentle strokes used to guide lymph fluid from the limbs toward functioning lymph nodes.',
    speaker: 'Dr. Ibrahim Riza',
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
  const [playing,   setPlaying]   = useState(false)
  const [muted,     setMuted]     = useState(true)
  const [progress,  setProgress]  = useState(0)
  const [failed,    setFailed]    = useState<Record<string, boolean>>({})
  const videoRef = useRef<HTMLVideoElement>(null)
  const active = VIDEOS[activeIdx]

  useEffect(() => {
    setPlaying(false)
    setProgress(0)
    videoRef.current?.load()
  }, [activeIdx])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(m => !m)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-2">Videos</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">From the clinic</h2>
        <p className="text-brand-fern text-sm mt-2">Select a video to watch. All content is from our clinical team.</p>
      </div>

      {/* ── Layout: player left, sidebar right ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Player — grows to fill available space */}
        <div className="w-full min-w-0 lg:flex-1">
          <div className="bg-white rounded-2xl border border-brand-border overflow-hidden">

            {/* Video area */}
            <div
              className="relative bg-brand-forest group w-full"
              style={{ aspectRatio: '9 / 16', maxHeight: '70vh' }}
            >
              {failed[active.id] ? (
                /* ── File not found ── */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-bg">
                  <div className="w-14 h-14 rounded-full bg-brand-pale-mint flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3DB489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <div className="text-center px-6">
                    <p className="text-brand-forest text-sm font-medium mb-1">Video not found</p>
                    <p className="text-brand-fern text-xs">
                      Add <code className="bg-brand-pale-mint px-1 rounded">{active.src}</code> to your{' '}
                      <code className="bg-brand-pale-mint px-1 rounded">public/</code> folder.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Video element */}
                  <video
                    ref={videoRef}
                    src={active.src}
                    poster={active.poster}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-contain bg-transparent"
                    onError={() => setFailed(f => ({ ...f, [active.id]: true }))}
                    onTimeUpdate={() => {
                      const v = videoRef.current
                      if (v?.duration) setProgress((v.currentTime / v.duration) * 100)
                    }}
                    onEnded={() => {
                      setPlaying(false)
                      if (activeIdx < VIDEOS.length - 1) {
                        setTimeout(() => setActiveIdx(i => i + 1), 800)
                      }
                    }}
                  />

                  {/* Play / pause overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                    }`}
                    style={{ background: 'rgba(28,58,52,0.38)' }}
                  >
                    <button
                      onClick={togglePlay}
                      aria-label={playing ? 'Pause' : 'Play'}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {playing ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                          <rect x="6" y="4" width="4" height="16" rx="1"/>
                          <rect x="14" y="4" width="4" height="16" rx="1"/>
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Mute toggle */}
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    className="absolute bottom-4 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                  >
                    {muted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    )}
                  </button>

                  {/* Playing badge */}
                  {playing && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-brand-coral/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-white"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      Playing
                    </div>
                  )}

                  {/* Progress bar */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-1 bg-white/20 cursor-pointer"
                    onClick={seek}
                  >
                    <motion.div
                      className="h-full bg-brand-deep-mint origin-left"
                      style={{ scaleX: progress / 100 }}
                    />
                  </div>
                </>
              )}
            </div>
            {/* END video area */}

            {/* Video info panel */}
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
                    {active.tag}
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
                  <span className="text-xs text-brand-fern ml-auto">{activeIdx + 1} / {VIDEOS.length}</span>
                </div>
                <h3 className="text-brand-forest font-bold text-base mb-1">{active.title}</h3>
                <p className="text-brand-fern text-sm leading-relaxed">{active.description}</p>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
        {/* END player */}

        {/* Sidebar playlist — fixed width, never shrinks */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 flex flex-col gap-2 lg:max-h-[520px] lg:overflow-y-auto">
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
                {/* Thumbnail */}
                <div
                  className="w-16 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: v.tagColor + '22' }}
                >
                  {isActive && playing ? (
                    <EqBars color={v.tagColor} />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isActive ? v.tagColor : '#C8DDD8'}>
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  )}
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: v.tagColor }}>
                    {v.tag}
                  </span>
                  <p className={`text-xs font-medium leading-snug mt-0.5 line-clamp-2 ${isActive ? 'text-brand-forest' : 'text-brand-fern'}`}>
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
        {/* END sidebar */}

      </div>
    </div>
  )
}