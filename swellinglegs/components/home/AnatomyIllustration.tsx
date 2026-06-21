'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

// ── Colour constants ──────────────────────────────────────────────
const BODY_FILL   = '#F0FAF5'  // very light mint — normal body areas
const BODY_STROKE = '#7DCFB0'  // brand-mint — body outline
const AFF_FILL    = '#B8EEDD'  // brand-light-mint — affected fill
const AFF_STROKE  = '#2A9D8F'  // brand-teal — affected outline
const DOT_FILL    = '#3DB489'  // brand-deep-mint — indicator dots

interface Props { type: 'lymphedema' | 'lipedema' }

export default function AnatomyIllustration({ type }: Props) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  const bodyCtl = useAnimation()
  const affCtl  = useAnimation()

  // Two-phase: body fades in, then affected areas appear and pulse
  useEffect(() => {
    if (!inView) return
    const run = async () => {
      await bodyCtl.start({ opacity: 1, y: 0, transition: { duration: 0.6 } })
      await affCtl.start({
        opacity: [0, 0.85, 0.55, 0.85, 0.55],
        transition: {
          duration: 4,
          times: [0, 0.15, 0.5, 0.75, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        },
      })
    }
    run()
  }, [inView, bodyCtl, affCtl])

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 select-none">
      {/* SVG body diagram — viewBox 0 0 200 390 */}
      <svg
        viewBox="0 0 200 390"
        className="w-full max-w-[148px] sm:max-w-[168px] drop-shadow-sm"
        aria-label={
          type === 'lymphedema'
            ? 'Lymphedema diagram — one limb affected'
            : 'Lipedema diagram — both legs affected, feet clear'
        }
      >
        {/* ── Normal body ───────────────────────────────────────── */}
        <motion.g
          initial={{ opacity: 0, y: 12 }}
          animate={bodyCtl}
          fill={BODY_FILL}
          stroke={BODY_STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Head */}
          <circle cx="100" cy="26" r="22" />
          {/* Neck */}
          <rect x="91" y="48" width="18" height="14" rx="6" />
          {/* Torso */}
          <rect x="52" y="62" width="96" height="110" rx="10" />
          {/* Left arm */}
          <rect x="18" y="62" width="30" height="90" rx="12" />
          {/* Right arm — drawn first so affected overlay sits on top */}
          <rect x="152" y="62" width="30" height="90" rx="12" />
          {/* Hips / pelvis */}
          <rect x="46" y="170" width="108" height="30" rx="8" />
          {/* Left thigh */}
          <rect x="46" y="198" width="44" height="78" rx="8" />
          {/* Right thigh */}
          <rect x="110" y="198" width="44" height="78" rx="8" />
          {/* Left shin */}
          <rect x="50" y="273" width="36" height="78" rx="8" />
          {/* Right shin */}
          <rect x="114" y="273" width="36" height="78" rx="8" />
          {/* Left foot */}
          <ellipse cx="68" cy="356" rx="26" ry="10" />
          {/* Right foot */}
          <ellipse cx="132" cy="356" rx="26" ry="10" />
        </motion.g>

        {/* ── Affected areas — animated overlay ─────────────────── */}
        <motion.g animate={affCtl} initial={{ opacity: 0 }}>
          {type === 'lymphedema' ? (
            // ONE arm affected (asymmetric — hallmark of lymphedema)
            <>
              {/* Swollen right arm — slightly larger than the left */}
              <rect
                x="148" y="58" width="38" height="100" rx="12"
                fill={AFF_FILL} stroke={AFF_STROKE} strokeWidth="1.5"
              />
              {/* Blocked lymph node indicator at shoulder */}
              <circle cx="157" cy="70" r="6" fill={AFF_STROKE} stroke="none" />
              <text x="153" y="74" fill="white" fontSize="7" fontWeight="bold">✕</text>
            </>
          ) : (
            // BOTH legs from hips — feet are clear (key clinical sign)
            <>
              {/* Wider hips */}
              <rect x="40" y="170" width="120" height="30" rx="8"
                fill={AFF_FILL} stroke={AFF_STROKE} strokeWidth="1.5" />
              {/* Left thigh — wider */}
              <rect x="40" y="198" width="52" height="78" rx="8"
                fill={AFF_FILL} stroke={AFF_STROKE} strokeWidth="1.5" />
              {/* Right thigh — wider */}
              <rect x="108" y="198" width="52" height="78" rx="8"
                fill={AFF_FILL} stroke={AFF_STROKE} strokeWidth="1.5" />
              {/* Left shin */}
              <rect x="44" y="273" width="42" height="78" rx="8"
                fill={AFF_FILL} stroke={AFF_STROKE} strokeWidth="1.5" />
              {/* Right shin */}
              <rect x="114" y="273" width="42" height="78" rx="8"
                fill={AFF_FILL} stroke={AFF_STROKE} strokeWidth="1.5" />
              {/* Feet redrawn in normal colour on top — to show they are clear */}
              <ellipse cx="68" cy="356" rx="26" ry="10"
                fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="1.5" />
              <ellipse cx="132" cy="356" rx="26" ry="10"
                fill={BODY_FILL} stroke={BODY_STROKE} strokeWidth="1.5" />
            </>
          )}
        </motion.g>
      </svg>

      {/* Key below the illustration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex flex-col gap-1.5 items-start text-xs text-brand-fern"
      >
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: AFF_FILL, border: `1px solid ${AFF_STROKE}` }} />
          {type === 'lymphedema' ? 'Swollen limb (typically one side)' : 'Fat accumulation area'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: BODY_FILL, border: `1px solid ${BODY_STROKE}` }} />
          {type === 'lymphedema' ? 'Unaffected limbs' : 'Feet — unaffected'}
        </span>
        {type === 'lymphedema' && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center text-white" style={{ background: DOT_FILL, fontSize: '7px' }}>✕</span>
            Blocked lymph node
          </span>
        )}
      </motion.div>
    </div>
  )
}