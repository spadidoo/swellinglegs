'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Replace these with real clinic photos ─────────────────────────
// Put your images in public/images/ and update the src values below
export const galleryPhotos = [
  { src: 'https://images.unsplash.com/photo-1631217868264-e6274c3a1ced?auto=format&fit=crop&w=800&q=80', alt: 'Clinic consultation room', caption: 'Our consultation suite' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', alt: 'Doctor consulting patient', caption: 'Expert care for every patient' },
  { src: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?auto=format&fit=crop&w=800&q=80', alt: 'Medical team at work', caption: 'Our dedicated team' },
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', alt: 'Medical equipment and care', caption: 'State-of-the-art equipment' },
  { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', alt: 'Healthcare professionals', caption: 'Our specialist team' },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80', alt: 'Patient care session', caption: 'Personalised treatment sessions' },
]

type Photo = typeof galleryPhotos[0]

interface Props { photos?: Photo[] }

export default function PhotoGallery({ photos = galleryPhotos }: Props) {
  const [open, setOpen]   = useState<number | null>(null)

  // Keyboard navigation
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

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = open !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">Photos</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">From the clinic</h2>
          <p className="text-brand-fern mt-3 text-sm sm:text-base max-w-md mx-auto">
            A look inside our clinic and the care we provide.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
              onClick={() => setOpen(i)}
              className={`relative overflow-hidden rounded-2xl bg-brand-bg group cursor-pointer ${i === 0 ? 'row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? '4/3' : '1/1' }}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Caption overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-end">
                <p className="text-white text-xs font-medium px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {open !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-[99] bg-black/85"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              />

              {/* Photo */}
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
                    <p className="text-white/80 text-sm text-center mt-3">{photos[open].caption}</p>
                  )}
                </motion.div>

                {/* Close */}
                <button
                  onClick={() => setOpen(null)}
                  className="fixed top-5 right-5 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors pointer-events-auto"
                  aria-label="Close photo"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
                  </svg>
                </button>

                {/* Prev / Next */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setOpen(i => i === null ? 0 : (i - 1 + photos.length) % photos.length)}
                      className="fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors pointer-events-auto"
                      aria-label="Previous photo"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="11 4 6 9 11 14" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setOpen(i => i === null ? 0 : (i + 1) % photos.length)}
                      className="fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors pointer-events-auto"
                      aria-label="Next photo"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 4 12 9 7 14" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                <div className="fixed bottom-5 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
                  {photos.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === open ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />
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