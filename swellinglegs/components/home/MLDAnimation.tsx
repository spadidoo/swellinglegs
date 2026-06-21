'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoPlayer from '@/components/community/VideoPlayer'

// ── MLD techniques — expandable accordion ────────────────────────
const TECHNIQUES = [
  {
    id: 'stationary',
    name: 'Stationary Circles',
    icon: 'ti-circles',
    color: '#3DB489',
    area: 'Neck, armpit, groin',
    desc: 'Performed directly over lymph nodes. The therapist uses their fingertips to make slow, gentle circular motions that stretch the skin and stimulate the underlying node before drainage begins.',
  },
  {
    id: 'pump',
    name: 'Pump Technique',
    icon: 'ti-wave-square',
    color: '#7DCFB0',
    area: 'Arms and legs',
    desc: 'An oval-shaped stroke used on curved surfaces like the arm or leg. The palm rotates in an oval motion — pushing lymph along the vessel toward the next node. Each stroke is about 1–2 seconds.',
  },
  {
    id: 'scoop',
    name: 'Scoop Technique',
    icon: 'ti-hand-stop',
    color: '#2A9D8F',
    area: 'Inner arm, inner leg',
    desc: 'Used on the inner surface of the arm and leg. The hand rotates as if gently scooping water — collecting and directing lymph upward toward the lymph nodes with each sweep.',
  },
  {
    id: 'rotary',
    name: 'Rotary Technique',
    icon: 'ti-rotate',
    color: '#1C3A34',
    area: 'Back, abdomen, chest',
    desc: 'Used on broad, flat areas. An elliptical motion of the whole hand stretches the skin in multiple directions — maximising the uptake of lymph from the surrounding tissue.',
  },
  {
    id: 'effleurage',
    name: 'Effleurage',
    icon: 'ti-arrows-right',
    color: '#B8EEDD',
    area: 'Full limb',
    desc: 'Long, light, gliding strokes from the extremity toward the node cluster. Used to open the lymphatic vessels and prepare the limb before targeted drainage begins.',
  },
]

export default function MLDAnimation() {
  const [open, setOpen] = useState<string | null>('stationary')
  const toggle = (id: string) => setOpen(o => o === id ? null : id)

  return (
    <div className="py-20 px-5 bg-brand-bg border-b border-brand-border">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">Treatment</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
            Manual Lymph Drainage — how it works
          </h2>
          <p className="text-brand-fern text-sm max-w-xl mx-auto">
            MLD is a specialised massage that uses precise, gentle strokes to redirect lymph fluid toward functioning lymph nodes. Developed in 1932 by Emil and Estrid Vodder, it remains the gold-standard first-line treatment for lymphedema.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: technique accordion ── */}
          <div>
            <p className="text-brand-forest font-semibold text-sm mb-4">
              Tap a technique to learn more
            </p>
            <div className="space-y-2">
              {TECHNIQUES.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: 'spring', damping: 22 }}
                >
                  <button
                    onClick={() => toggle(t.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                      open === t.id
                        ? 'bg-white border-transparent shadow-sm'
                        : 'bg-white/60 border-brand-border hover:border-brand-deep-mint'
                    }`}
                    style={open === t.id ? { borderColor: t.color } : {}}
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: open === t.id ? t.color : t.color + '33' }}
                    >
                      <i className={`ti ${t.icon} text-xl`} style={{ color: open === t.id ? 'white' : t.color }} />
                    </div>

                    {/* Title row */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-brand-forest font-semibold text-sm">{t.name}</span>
                        <motion.i
                          animate={{ rotate: open === t.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ti ti-chevron-down text-brand-fern flex-shrink-0 text-sm"
                        />
                      </div>
                      <span className="text-brand-fern text-xs">{t.area}</span>
                    </div>
                  </button>

                  {/* Expanded description */}
                  <AnimatePresence>
                    {open === t.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mx-2 mb-2 px-5 py-4 rounded-b-2xl text-sm text-brand-fern leading-relaxed border-x border-b"
                          style={{ borderColor: t.color + '55', background: t.color + '0A' }}
                        >
                          {t.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Key principle callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 flex items-start gap-3 bg-brand-pale-mint rounded-2xl p-4 border border-brand-light-mint"
            >
              <i className="ti ti-info-circle text-brand-deep-mint text-xl flex-shrink-0 mt-0.5" />
              <p className="text-brand-fern text-xs leading-relaxed">
                <strong className="text-brand-forest">Key principle:</strong> MLD always uses extremely light pressure — lighter than a standard massage. The skin is gently stretched, never pressed deeply. Incorrect pressure can worsen lymphedema.
              </p>
            </motion.div>
          </div>

          {/* ── Right: demo video slot ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            

            {/*
              To show a video here:
              1. Save your video as /public/videos/mld-demo.mp4
              2. Import VideoPlayer: import VideoPlayer from '@/components/community/VideoPlayer'
              3. Replace the placeholder below with:
                 <VideoPlayer
                   src="/videos/mld-demo.mp4"
                   title="Manual Lymph Drainage demonstration"
                   description="Watch how a specialist performs MLD on a patient."
                 />
            */}
            <div className="w-full">
              <VideoPlayer
                src="/videos/mld-demo.mp4"
                title="Lymphatic Drainage"
                description="Massage therapists use lymphatic drainage to help improve lymphatic circulation, decrease swelling and reduce delayed onset muscle soreness."
                credit="Physio.co.uk"
                creditUrl="https://www.youtube.com/watch?v=hT6RfGrR2DA"
              />
            </div>

            {/* MLD quick facts */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: 'ti-clock',       label: '45–90 min', sub: 'Typical session length' },
                { icon: 'ti-calendar',    label: '2–3×/week', sub: 'Intensive phase' },
                { icon: 'ti-certificate', label: 'Since 1932', sub: 'Vodder technique' },
                { icon: 'ti-heart',       label: 'Painless', sub: 'Gentle touch only' },
              ].map(f => (
                <div key={f.label} className="bg-white rounded-xl border border-brand-border p-3 text-center">
                  <i className={`ti ${f.icon} text-brand-deep-mint text-lg mb-1 block`} />
                  <p className="text-brand-forest font-bold text-sm">{f.label}</p>
                  <p className="text-brand-fern text-xs">{f.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}