'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  src: string           // e.g. '/videos/clinic-tour.mp4'
  poster?: string       // e.g. '/images/clinic-thumb.jpg'
  title: string
  description?: string
}

export default function VideoPlayer({ src, poster, title, description }: Props) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted,   setMuted]   = useState(true)
  const [failed,  setFailed]  = useState(false)

  // Autoplay when ≥ 45% of the video is in the viewport, pause when it leaves
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          video.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.45 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { video.play(); setPlaying(true) }
    else               { video.pause(); setPlaying(false) }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(v => !v)
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
      className="bg-white rounded-2xl overflow-hidden border border-brand-border hover:shadow-md transition-shadow"
    >
      {/* Video */}
      <div className="relative aspect-video bg-brand-forest group">
        {failed ? (
          /* Placeholder shown if file doesn't exist yet */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-bg">
            <div className="w-14 h-14 rounded-full bg-brand-pale-mint flex items-center justify-center">
              <i className="ti ti-video text-2xl text-brand-deep-mint" aria-hidden="true" />
            </div>
            <div className="text-center px-6">
              <p className="text-brand-forest text-sm font-medium mb-1">Video file not found</p>
              <p className="text-brand-fern text-xs">
                Add <code className="bg-brand-pale-mint px-1 rounded">{src}</code> to your <code className="bg-brand-pale-mint px-1 rounded">public/</code> folder.
              </p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              className="w-full h-full object-cover"
            />

            {/* Play / Pause overlay — visible on hover or when paused */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
              style={{ background: 'rgba(28, 58, 52, 0.4)' }}
            >
              <button
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {playing
                  ? <i className="ti ti-player-pause text-white text-2xl" aria-hidden="true" />
                  : <i className="ti ti-player-play text-white text-2xl" aria-hidden="true" />
                }
              </button>
            </div>

            {/* Mute toggle — bottom right */}
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            >
              {muted
                ? <i className="ti ti-volume-off text-sm" aria-hidden="true" />
                : <i className="ti ti-volume text-sm" aria-hidden="true" />
              }
            </button>

            {/* Live indicator when playing */}
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
          </>
        )}
      </div>

      {/* Caption */}
      {(title || description) && (
        <div className="px-5 py-4">
          {title && <p className="font-semibold text-brand-forest text-sm">{title}</p>}
          {description && <p className="text-brand-fern text-xs mt-1 leading-relaxed">{description}</p>}
        </div>
      )}
    </motion.div>
  )
}