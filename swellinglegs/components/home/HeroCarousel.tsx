'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Replace these with your real clinic photos
const slides = [
  { src: '/images/hero1.jpg', alt: 'Lymphatic Massage Sample' },
  { src: '/images/hero2.jpg', alt: 'Team Pic' },
  { src: '/images/hero3.jpg', alt: 'Session' },
  { src: '/images/hero4.jpg', alt: 'Edema' },
  { src: '/images/hero5.jpg', alt: 'Dubai' },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Crossfading photos */}
      <AnimatePresence>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/*
        Gradient overlay — two layers:
        1. Top green fade  (brand colour → teal → transparent) for the navbar area
        2. Bottom dark fade (transparent → dark) for text + button readability

        Adjust the stop percentages here if you want the green zone taller/shorter
        or the text area lighter/darker.
      */}

      {/* Top: brand green fading down */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(28, 58, 52, 0.95)  0%,
            rgba(28, 58, 52, 0.78) 10%,
            rgba(42, 157, 143, 0.40) 24%,
            rgba(0,  0,   0,  0.18) 40%,
            rgba(0,  0,   0,  0.52) 62%,
            rgba(0,  0,   0,  0.74) 100%
          )`
        }}
      />

      {/* Subtle radial darkening behind where the hero text sits */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 70%, rgba(0,0,0,0.30) 0%, transparent 100%)'
        }}
      />

      {/* Vertical slide indicators */}
      <div className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'h-8 bg-white' : 'h-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}