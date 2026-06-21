'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Condition content data ────────────────────────────────────────
// Replace videoId with a real YouTube video ID when available
// e.g. videoId: 'dQw4w9WgXcQ'  →  youtube.com/watch?v=dQw4w9WgXcQ
const conditionData = {
  lymphedema: {
    title: 'Lymphedema',
    tagline: 'Swelling caused by the lymphatic system',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Lymphedema is a long-term condition where fluid builds up in body tissues, causing swelling — most often in the arms or legs. It develops when the lymphatic system is damaged or blocked, commonly following cancer treatment, surgery, or infection.',
    cards: [
      {
        num: '01', title: 'Causes',
        items: ['Cancer treatment (surgery or radiation)', 'Lymph node removal or damage', 'Infections (e.g. filariasis)', 'Injury or chronic inflammation'],
      },
      {
        num: '02', title: 'Symptoms',
        items: ['Swelling in one or both limbs', 'Feeling of heaviness or tightness', 'Restricted range of motion', 'Skin thickening or hardening'],
      },
      {
        num: '03', title: 'Complications',
        items: ['Recurring skin infections (cellulitis)', 'Wounds that will not heal', 'Fibrosis — tissue hardening', 'Reduced mobility over time'],
      },
      {
        num: '04', title: 'Treatment',
        items: ['Manual lymph drainage (MLD)', 'Compression garments', 'Therapeutic exercise', 'Specialist skin care routine'],
      },
    ],
    videoId: '', // ← Replace with YouTube video ID
    videoTitle: 'What is Lymphedema? — Educational overview',
  },
  lipedema: {
    title: 'Lipedema',
    tagline: 'A chronic fat disorder affecting legs and hips',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Lipedema is a chronic disorder where abnormal fat accumulates disproportionately in the legs, hips, and sometimes arms. It almost exclusively affects women, is frequently misdiagnosed as obesity, and does not respond to diet or exercise in the way typical fat does.',
    cards: [
      {
        num: '01', title: 'Causes',
        items: ['Hormonal triggers (puberty, pregnancy)', 'Genetic predisposition', 'Connective tissue changes', 'Not caused by diet or lifestyle'],
      },
      {
        num: '02', title: 'Symptoms',
        items: ['Disproportionate leg and hip size', 'Pain or tenderness on touch', 'Easy bruising', 'Feet unaffected — unlike lymphedema'],
      },
      {
        num: '03', title: 'Diagnosis',
        items: ['Clinical evaluation by specialist', 'Exclusion of other conditions', 'Frequently misdiagnosed as obesity', 'No single definitive test exists'],
      },
      {
        num: '04', title: 'Treatment',
        items: ['Compression therapy', 'Low-impact aerobic exercise', 'Manual lymph drainage (MLD)', 'Liposuction in advanced cases'],
      },
    ],
    videoId: '', // ← Replace with YouTube video ID
    videoTitle: 'What is Lipedema? — Educational overview',
  },
}

export type ModalType = 'lymphedema' | 'lipedema' | 'compare' | null

interface Props {
  type: ModalType
  onClose: () => void
}

export default function ConditionModal({ type, onClose }: Props) {
  // Lock page scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!type) return null

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[99] bg-black/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal — bottom-sheet on mobile, centered popup on desktop */}
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 pointer-events-none">
        <motion.div
          key="modal"
          className="w-full sm:max-w-3xl max-h-[93vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-y-auto pointer-events-auto"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 27, stiffness: 300 }}
        >
          {type === 'compare' ? (
            <CompareContent onClose={onClose} />
          ) : (
            <ConditionContent type={type} onClose={onClose} />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// ── Condition detail content (Lymphedema or Lipedema) ─────────────
function ConditionContent({ type, onClose }: { type: 'lymphedema' | 'lipedema'; onClose: () => void }) {
  const d = conditionData[type]

  return (
    <>
      {/* Header image */}
      <div className="relative h-52 sm:h-64 flex-shrink-0">
        <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="13" y2="13" />
            <line x1="13" y1="2" x2="2" y2="13" />
          </svg>
        </button>

        {/* Title over image */}
        <div className="absolute bottom-4 left-5 right-14">
          <span className="text-white/70 text-xs uppercase tracking-widest font-medium">{d.tagline}</span>
          <h2 className="text-white text-2xl sm:text-3xl font-bold mt-0.5">{d.title}</h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-8">

        {/* Overview */}
        <p className="text-brand-fern leading-relaxed text-sm sm:text-base mb-8">{d.overview}</p>

        {/* 2×2 info cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
          {d.cards.map((card) => (
            <div key={card.num} className="bg-brand-bg rounded-2xl p-4 border border-brand-border">
              <div className="w-8 h-8 bg-brand-light-mint rounded-lg flex items-center justify-center mb-3">
                <span className="text-brand-teal text-xs font-bold">{card.num}</span>
              </div>
              <h3 className="font-semibold text-brand-forest text-sm mb-2">{card.title}</h3>
              <ul className="text-xs text-brand-fern space-y-1.5 leading-relaxed">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-1.5 items-start">
                    <span className="text-brand-deep-mint mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* YouTube video */}
        <div className="mb-8">
          <h3 className="font-semibold text-brand-forest text-sm mb-3">Educational Video</h3>
          {d.videoId ? (
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${d.videoId}`}
                title={d.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            // Placeholder shown until a real video ID is added
            <div className="aspect-video rounded-2xl bg-brand-pale-mint border border-brand-border flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-light-mint flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#3DB489" strokeWidth="1.5" />
                  <polygon points="10,8 17,12 10,16" fill="#3DB489" />
                </svg>
              </div>
              <div className="text-center px-6">
                <p className="text-brand-forest text-sm font-medium mb-1">Video coming soon</p>
                <p className="text-brand-fern text-xs">Add a YouTube video ID in <code className="bg-brand-light-mint px-1 rounded">ConditionModal.tsx</code> to display it here.</p>
              </div>
            </div>
          )}
        </div>

        {/* Consultation CTA */}
        <div className="bg-brand-pale-mint rounded-2xl p-5 text-center">
          <p className="text-brand-forest font-semibold mb-1">Ready to speak with a specialist?</p>
          <p className="text-brand-fern text-sm mb-4">Our clinic offers expert diagnosis and personalised treatment plans.</p>
          <a
            href="/contact"
            className="inline-block bg-brand-coral text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </>
  )
}

// ── Compare content ───────────────────────────────────────────────
function CompareContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-brand-pale-mint px-5 pt-6 pb-5 sm:px-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-border/60 flex items-center justify-center text-brand-fern hover:bg-brand-border transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="13" y2="13" />
            <line x1="13" y1="2" x2="2" y2="13" />
          </svg>
        </button>
        <span className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest">Key Differences</span>
        <h2 className="text-brand-forest text-2xl font-bold mt-1">Lymphedema vs. Lipedema</h2>
        <p className="text-brand-fern text-sm mt-2 max-w-lg">
          Both cause swelling and are often confused — but causes, symptoms, and treatments differ significantly.
        </p>
      </div>

      {/* Table */}
      <div className="p-5 sm:p-8">
        <div className="overflow-x-auto rounded-2xl border border-brand-border">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left py-3.5 px-4 text-brand-fern font-medium bg-brand-bg">Feature</th>
                <th className="py-3.5 px-4 text-brand-deep-mint font-semibold text-center bg-brand-pale-mint">Lymphedema</th>
                <th className="py-3.5 px-4 text-brand-teal font-semibold text-center bg-brand-light-mint/40">Lipedema</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Who it affects',    'Anyone — men and women',         'Almost exclusively women'        ],
                ['Affected area',     'Arms or legs (often one side)',   'Legs, hips, sometimes arms'      ],
                ['Do feet swell?',    'Yes — feet often swell',          'No — feet usually spared'        ],
                ['Is it painful?',    'Not usually painful',             'Often painful, tender to touch'  ],
                ['Main cause',        'Lymphatic system damage',         'Hormonal or genetic fat disorder' ],
                ['How is it tested?', 'Lymphoscintigraphy and clinical', 'Clinical — no single test'       ],
                ['Primary treatment', 'Compression and MLD',            'Compression, MLD and exercise'   ],
              ].map(([feature, lymph, lipo], i) => (
                <tr key={i} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-brand-bg'}`}>
                  <td className="py-3 px-4 text-brand-forest font-medium">{feature}</td>
                  <td className="py-3 px-4 text-brand-fern text-center">{lymph}</td>
                  <td className="py-3 px-4 text-brand-fern text-center">{lipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-brand-pale-mint rounded-2xl p-5 text-center">
          <p className="text-brand-forest font-semibold mb-1">Not sure which one applies to you?</p>
          <p className="text-brand-fern text-sm mb-4">A specialist can confirm your diagnosis and design the right care plan.</p>
          <a
            href="/contact"
            className="inline-block bg-brand-coral text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </>
  )
}
