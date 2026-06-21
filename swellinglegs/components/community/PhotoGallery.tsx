'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Photo = { src: string; alt: string; caption: string }

interface Props { photos?: Photo[] }

export default function PhotoGallery({ photos = [] }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     setOpen(null)
      if (e.key === 'ArrowRight') setOpen(i => i === null ? 0 : (i + 1) % photos.length)
      if (e.key === 'ArrowLeft')  setOpen(i => i === null ? 0 : (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, photos.length])

  useEffect(() => {
    document.body.style.overflow = open !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!photos.length) return null

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">Photos</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">From the clinic</h2>
          <p className="text-brand-fern mt-3 text-sm max-w-md mx-auto">
            A look inside our clinic and the care we provide.
          </p>
        </div>

        {/*
          CSS columns masonry — each photo keeps its natural aspect ratio.
          No blank spaces regardless of portrait, landscape or square images.
          Just add more photos to data/community.ts and the grid adjusts itself.
        */}
        <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="break-inside-avoid mb-3 sm:mb-4 w-full block relative overflow-hidden rounded-2xl group cursor-pointer"
              aria-label={`Open photo: ${photo.alt}`}
            >
              {/* Image — full width, natural height, no cropping */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block rounded-2xl transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Caption overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-xs font-medium px-3 py-3 leading-snug">
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {open !== null && (
            <>
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-[99] bg-black/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              />

              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  key={open}
                  className="relative max-w-3xl w-full pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={photos[open].src}
                    alt={photos[open].alt}
                    className="w-full max-h-[80vh] object-contain rounded-2xl"
                  />
                  {photos[open].caption && (
                    <p className="text-white/70 text-sm text-center mt-3">{photos[open].caption}</p>
                  )}
                </motion.div>

                {/* Close */}
                <button
                  onClick={() => setOpen(null)}
                  className="fixed top-5 right-5 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors pointer-events-auto"
                  aria-label="Close photo"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/>
                  </svg>
                </button>

                {/* Prev */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setOpen(i => i === null ? 0 : (i - 1 + photos.length) % photos.length)}
                      className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors pointer-events-auto"
                      aria-label="Previous photo"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="11 4 6 9 11 14"/>
                      </svg>
                    </button>

                    {/* Next */}
                    <button
                      onClick={() => setOpen(i => i === null ? 0 : (i + 1) % photos.length)}
                      className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors pointer-events-auto"
                      aria-label="Next photo"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 4 12 9 7 14"/>
                      </svg>
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                <div className="fixed bottom-5 inset-x-0 flex justify-center gap-1.5 pointer-events-none flex-wrap px-4">
                  {photos.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${i === open ? 'w-5 bg-white' : 'w-1.5 bg-white/35'}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}