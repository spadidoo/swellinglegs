'use client'

// Set to true, click anywhere on the image to find exact dot coordinates, then set back to false
const CAL_MODE = true

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import InstagramEducation from '@/components/home/InstagramEducation'
import MLDAnimation from '@/components/home/MLDAnimation'

// ─── Update these filenames to match what you put in public/images/ ───────────
const IMG_CAPILLARIES = '/images/lymphatic_capillaries.jpg'
const IMG_ANATOMY     = '/images/lymphatic_anatomy.png'   // your second anatomy image

// ─── Interactive hotspots on the capillaries diagram ─────────────────────────
// x/y are percentage positions on the image — adjust if your image crops differently
type Hotspot = {
  id: string; label: string
  x: number; y: number
  description: string
  color: string
}

const CAPILLARY_SPOTS: Hotspot[] = [
  { id: 'subclavian', label: 'Subclavian Vein',        x: 26, y: 14, color: '#7DCFB0',
    description: 'The final destination for lymph. The thoracic duct empties cleaned lymph fluid back into the bloodstream here — completing the entire lymphatic circuit.' },
  { id: 'thoracic',   label: 'Thoracic Duct',          x: 24, y: 30, color: '#7DCFB0',
    description: 'The body\'s largest lymphatic vessel. It collects lymph from the lower body and left upper body, then carries it up to the subclavian vein in the chest.' },
  { id: 'heart',      label: 'Heart',                  x: 63, y: 33, color: '#E76F51',
    description: 'Unlike blood, lymph has no heart to pump it. Instead, it moves through breathing, muscle contractions and a network of one-way valves — a passive but highly effective system.' },
  { id: 'lymphnode',  label: 'Lymph Node',             x: 21, y: 48, color: '#3DB489',
    description: 'Bean-shaped immune stations distributed throughout the body. They filter lymph, trapping pathogens, damaged cells and cancer cells — and are where immune responses are coordinated.' },
  { id: 'duct',       label: 'Lymphatic Duct',         x: 21, y: 58, color: '#3DB489',
    description: 'Larger collecting vessels that gather lymph from multiple lymphatic vessels and transport it toward the major lymph nodes and eventually the subclavian vein.' },
  { id: 'vessel',     label: 'Lymphatic Vessel',       x: 21, y: 67, color: '#2A9D8F',
    description: 'Thin-walled tubes — similar to veins — that carry lymph fluid from the capillaries toward the lymph nodes. They contain valves to keep fluid moving in one direction only.' },
  { id: 'capillary',  label: 'Lymphatic Capillary',   x: 18, y: 76, color: '#B8EEDD',
    description: 'The starting point of the lymphatic journey. These microscopic vessels absorb excess fluid, proteins, and cellular waste from between tissue cells — forming lymph fluid.' },
]

const ANATOMY_SPOTS: Hotspot[] = [
  { id: 'head',       label: 'Head & Neck Nodes',      x: 48, y: 12, color: '#7DCFB0',
    description: 'Clusters of lymph nodes around the jaw, neck and ears drain lymph from the face and scalp. Swollen nodes here are often the first sign of infection.' },
  { id: 'axilla',     label: 'Axillary Nodes (Armpit)', x: 22, y: 38, color: '#3DB489',
    description: 'A major lymph node cluster in each armpit. Critically important in breast cancer — cancer cells often spread here first, which is why surgeons remove or test them during procedures.' },
  { id: 'spleen',     label: 'Spleen',                 x: 38, y: 50, color: '#2A9D8F',
    description: 'The largest lymphatic organ. It filters blood (not lymph), destroys old red blood cells, and stores immune cells. Think of it as the lymphatic system\'s quality control centre.' },
  { id: 'groin',      label: 'Inguinal Nodes (Groin)', x: 42, y: 70, color: '#3DB489',
    description: 'Lymph nodes in the groin drain the lower body including the legs and pelvis. Blockage or damage here is one of the most common causes of lower-limb lymphedema.' },
  { id: 'legs',       label: 'Lower Limb Lymphatics',  x: 35, y: 84, color: '#7DCFB0',
    description: 'The legs have an extensive network of superficial and deep lymphatic vessels. When these are damaged or overwhelmed, fluid builds up — producing the characteristic swelling of lymphedema.' },
]

// ─── How the lymphatic system works — step flow ───────────────────────────────
const FLOW_STEPS = [
  { icon: 'ti-droplet-filled', color: '#B8EEDD', label: 'Fluid accumulates', desc: 'Cells produce excess interstitial fluid and protein waste in the spaces between tissues — about 3 litres per day.' },
  { icon: 'ti-vacuum',         color: '#7DCFB0', label: 'Capillaries absorb', desc: 'Tiny lymphatic capillaries draw in this excess fluid, forming lymph.' },
  { icon: 'ti-filter',         color: '#3DB489', label: 'Nodes filter it',   desc: 'Lymph passes through nodes where immune cells remove bacteria, viruses and debris.' },
  { icon: 'ti-route-2',        color: '#2A9D8F', label: 'Fluid travels up',  desc: 'Cleaned lymph moves through larger vessels toward the chest, pushed by muscle movement and breathing.' },
  { icon: 'ti-heart-rate',     color: '#1C3A34', label: 'Returns to blood',  desc: 'The thoracic duct deposits lymph back into the bloodstream — the circuit is complete.' },
]

// ─── Key history milestones ───────────────────────────────────────────────────
const HISTORY = [
  { year: '1622', name: 'Gasparo Aselli',        event: 'Discovered lymphatic vessels ("lacteals") in the intestine of a dog — the first recorded observation of the lymphatic system.' },
  { year: '1653', name: 'Thomas Bartholin',       event: 'Named and described the complete human lymphatic system, establishing it as a body-wide network distinct from the blood.' },
  { year: '1932', name: 'Emil & Estrid Vodder',  event: 'Developed Manual Lymph Drainage (MLD) in France — a gentle massage technique still used today as the gold-standard lymphedema treatment.' },
  { year: '1940', name: 'Allen & Hines',          event: 'First formally described lipedema at the Mayo Clinic — a condition that would remain largely unrecognised for another 80 years.' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function HotspotDot({ spot, active, onClick }: { spot: Hotspot; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Learn about ${spot.label}`}
      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      {/* Pulse ring */}
      {!active && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: spot.color }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      )}
      {/* Dot */}
      <motion.span
        animate={{ scale: active ? 1.4 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative block w-4 h-4 rounded-full border-2 border-white shadow-md"
        style={{ background: spot.color, boxShadow: active ? `0 0 16px ${spot.color}` : undefined }}
      />
      {/* Label tooltip — desktop hover */}
      <span className="absolute left-1/2 -translate-x-1/2 -top-8 hidden group-hover:block text-white text-[10px] font-semibold whitespace-nowrap bg-brand-forest/90 rounded-full px-2 py-0.5 pointer-events-none">
        {spot.label}
      </span>
    </button>
  )
}

function DiagramPanel({
  image, spots, title, subtitle
}: { image: string; spots: Hotspot[]; title: string; subtitle: string }) {
  const [active, setActive] = useState<Hotspot | null>(null)
  const toggle = (s: Hotspot) => setActive(prev => prev?.id === s.id ? null : s)

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-1">{subtitle}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-brand-forest">{title}</h3>
        <p className="text-brand-fern text-sm mt-2 flex items-center justify-center gap-1.5">
          <i className="ti ti-hand-finger text-brand-deep-mint" />
          Tap the circles to explore
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5 items-start">

        {/* Image + hotspots */}
        <div className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-bg">
          <img
            src={image}
            alt={title}
            className="w-full h-auto block"
            draggable={false}
          />
          {spots.map(s => (
            <HotspotDot
              key={s.id}
              spot={s}
              active={active?.id === s.id}
              onClick={() => toggle(s)}
            />
          ))}
        </div>

        {/* Info panel */}
        <div className="md:sticky md:top-24 min-h-[220px]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border p-6 shadow-sm"
                style={{ borderColor: active.color }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: active.color + '33' }}
                >
                  <span className="w-3 h-3 rounded-full block" style={{ background: active.color }} />
                </div>
                <h4 className="text-brand-forest font-bold text-lg mb-3">{active.label}</h4>
                <p className="text-brand-fern text-sm leading-relaxed">{active.description}</p>
                <button
                  onClick={() => setActive(null)}
                  className="mt-4 text-xs text-brand-fern hover:text-brand-deep-mint transition-colors"
                >
                  ✕ Close
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-brand-bg rounded-2xl border border-dashed border-brand-border p-6 flex flex-col items-center justify-center min-h-[220px] text-center"
              >
                <div className="w-12 h-12 bg-brand-pale-mint rounded-full flex items-center justify-center mb-3">
                  <i className="ti ti-hand-finger text-2xl text-brand-deep-mint" />
                </div>
                <p className="text-brand-fern text-sm font-medium mb-1">Select a structure</p>
                <p className="text-brand-fern text-xs leading-relaxed max-w-[200px]">
                  Tap any glowing circle on the diagram to learn what it does.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend strip */}
          <div className="mt-4 flex flex-wrap gap-2">
            {spots.map(s => (
              <button
                key={s.id}
                onClick={() => toggle(s)}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all ${
                  active?.id === s.id
                    ? 'text-brand-forest font-semibold border-transparent'
                    : 'text-brand-fern border-brand-border hover:border-brand-deep-mint'
                }`}
                style={active?.id === s.id ? { borderColor: s.color, background: s.color + '22' } : {}}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FlowStep({ step, index, total }: { step: typeof FLOW_STEPS[0]; index: number; total: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      {/* Connector line (not on last step) */}
      <div className="w-full flex items-center">
        <motion.button
          ref={ref as any}
          onClick={() => setOpen(v => !v)}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all"
          style={{ background: step.color }}
          aria-label={step.label}
        >
          <i className={`ti ${step.icon} text-2xl text-white`} />
        </motion.button>
        {index < total - 1 && (
          <div className="flex-1 relative h-0.5 mx-1 overflow-hidden">
            <div className="absolute inset-0 bg-brand-border" />
            <motion.div
              className="absolute inset-0 origin-left"
              style={{ background: step.color }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
            />
          </div>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.15 + 0.2 }}
        className="text-xs font-semibold text-brand-forest mt-2 text-center leading-tight px-1"
      >
        {step.label}
      </motion.p>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-brand-fern text-center leading-relaxed mt-1 px-2 overflow-hidden"
          >
            {step.desc}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function LymphaticEducation() {
  const [diagram, setDiagram] = useState<'capillaries' | 'anatomy'>('capillaries')

  const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }
  const stagger = { visible: { transition: { staggerChildren: 0.12 } } }
  const vp = { once: true, margin: '-50px' }

  return (
    <section className="bg-white">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div
        className="py-20 px-5"
        style={{ background: 'linear-gradient(to bottom, #F5FBF8 0%, #FFFFFF 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">
              Before we talk about what goes wrong
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-brand-forest mb-4">
              The Lymphatic System
            </motion.h2>
            <motion.p variants={fadeUp} className="text-brand-fern text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A silent network running through your entire body — draining fluid, fighting infection, and keeping tissues healthy. When it fails, the results are visible. Understanding how it works is the first step to understanding lymphedema and lipedema.
            </motion.p>
          </motion.div>

          {/* ── Diagram tab switcher ─────────────────────────────── */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-brand-bg rounded-2xl p-1 border border-brand-border gap-1">
              {([
                { id: 'capillaries', label: 'Lymphatic Capillaries' },
                { id: 'anatomy',     label: 'Full System Anatomy'   },
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDiagram(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    diagram === tab.id
                      ? 'bg-white text-brand-forest shadow-sm'
                      : 'text-brand-fern hover:text-brand-forest'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Diagrams ─────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {diagram === 'capillaries' ? (
              <motion.div
                key="cap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <DiagramPanel
                  image={IMG_CAPILLARIES}
                  spots={CAPILLARY_SPOTS}
                  title="Lymphatic Capillaries — up close"
                  subtitle="Explore the diagram"
                />
              </motion.div>
            ) : (
              <motion.div
                key="anat"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <DiagramPanel
                  image={IMG_ANATOMY}
                  spots={ANATOMY_SPOTS}
                  title="The Lymphatic System — full body"
                  subtitle="Explore the diagram"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── How it flows ─────────────────────────────────────────── */}
      <div className="py-20 px-5 bg-brand-bg border-y border-brand-border">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">The circuit</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">How lymph flows through the body</motion.h2>
            <motion.p variants={fadeUp} className="text-brand-fern text-sm mt-2">Tap each step to expand</motion.p>
          </motion.div>

          {/* Desktop: horizontal flow */}
          <div className="hidden sm:flex items-start gap-0">
            {FLOW_STEPS.map((step, i) => (
              <FlowStep key={step.label} step={step} index={i} total={FLOW_STEPS.length} />
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="sm:hidden flex flex-col gap-4">
            {FLOW_STEPS.map((step, i) => {
              const [open, setOpen] = useState(false)
              return (
                <motion.button
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', damping: 22 }}
                  onClick={() => setOpen(v => !v)}
                  className="flex items-start gap-4 text-left bg-white rounded-2xl p-4 border border-brand-border w-full"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: step.color }}
                  >
                    <i className={`ti ${step.icon} text-xl text-white`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-brand-forest font-semibold text-sm">{step.label}</p>
                    <AnimatePresence>
                      {open && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-brand-fern text-xs mt-1 leading-relaxed overflow-hidden"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <i className={`ti ti-chevron-${open ? 'up' : 'down'} text-brand-fern flex-shrink-0 mt-0.5`} />
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── History ──────────────────────────────────────────────── */}
      <div className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">History</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">Four centuries of discovery</motion.h2>
            <motion.p variants={fadeUp} className="text-brand-fern text-sm mt-2 max-w-lg mx-auto">
              The lymphatic system was one of the last major body systems to be identified — and conditions like lipedema are still being recognised today.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HISTORY.map((h, i) => (
              <motion.div
                key={h.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', damping: 22 }}
                className="bg-brand-bg rounded-2xl border border-brand-border p-6 hover:border-brand-deep-mint hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: '#3DB489' }}
                  >
                    {h.year}
                  </span>
                  <div className="h-px flex-1 bg-brand-border" />
                </div>
                <p className="text-brand-forest font-semibold text-sm mb-1">{h.name}</p>
                <p className="text-brand-fern text-sm leading-relaxed">{h.event}</p>
              </motion.div>
            ))}
          </div>

          {/* Bridge to the conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 bg-brand-pale-mint rounded-3xl p-8 text-center border border-brand-light-mint"
          >
            <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-2">What happens when it goes wrong</p>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-forest mb-3">
              Two conditions — both affecting this system
            </h3>
            <p className="text-brand-fern text-sm max-w-xl mx-auto leading-relaxed">
              Lymphedema occurs when the lymphatic vessels are damaged or blocked, causing fluid to build up in tissues. Lipedema is a fat disorder that is often misdiagnosed and frequently occurs alongside lymphedema. Scroll down to explore both.
            </p>
            <div className="mt-5 flex justify-center">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="text-brand-deep-mint"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    {/* ── MLD animation + 3D flip card ── */}
    <MLDAnimation />

    {/* ── Organized Instagram videos ── */}
    <InstagramEducation />

    </section>
  )
}