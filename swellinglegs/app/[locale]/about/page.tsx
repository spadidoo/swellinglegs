'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, type Variants, useInView, AnimatePresence } from 'framer-motion'

// ── Helpers ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const vp = { once: true, margin: '-60px' }

// Count-up hook for stats
function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = 60
    const timer = setInterval(() => {
      frame++
      setCount(Math.floor((frame / total) * target))
      if (frame >= total) { setCount(target); clearInterval(timer) }
    }, 20)
    return () => clearInterval(timer)
  }, [inView, target])
  return count
}

// Photo reveal with clip-path curtain effect
function PhotoReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full h-full"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
      </motion.div>
    </div>
  )
}

// Stat card with count-up
function StatCard({ value, suffix = '', label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const count = useCountUp(value, inView)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'herald' | 'vascular'>('herald')

  const credentials = ['FRCS (General Surgery)', 'FRCS (Vascular)', 'CCST-UK', 'MBBS']

  const timeline = [
    { year: '1994', title: 'Medical Degree', desc: 'Graduated from Mangalore University with MBBS qualification' },
    { year: '2000s', title: 'UK Specialty Training', desc: 'Vascular surgical training at Royal Liverpool University Hospital and South Manchester University Hospital' },
    { year: '~2010', title: 'NHS Clinical Director', desc: 'Clinical Director of Vascular Services, Pennine Acute Hospital NHS Trust, Greater Manchester — led merger of Greater Manchester vascular services and commissioned a state-of-the-art Hybrid OR' },
    { year: '2015', title: 'Moved to Dubai', desc: 'Joined Mediclinic Hospitals Group Dubai as Consultant Vascular & Endovascular Surgeon' },
    { year: 'Present', title: 'Dubai Vascular & Emirates Vascular Society', desc: 'Now seeing patients at Genesis Healthcare (Dubai Science Park) and HealthHub Festival City. Elected Chairman, Scientific Committee of the Emirates Vascular Society' },
  ]

  const specializations = [
    { icon: 'ti-heart-rate',  label: 'Aortic Aneurysm Repair'        },
    { icon: 'ti-brain',       label: 'Carotid Artery Disease'         },
    { icon: 'ti-activity',    label: 'Deep Vein Thrombosis (DVT)'     },
    { icon: 'ti-run',         label: 'Peripheral Arterial Disease'    },
    { icon: 'ti-chart-line',  label: 'Varicose Veins'                 },
    { icon: 'ti-body-scan',   label: 'Thoracic Outlet Syndrome'       },
    { icon: 'ti-droplet',     label: 'Lymphedema Treatment'           },
    { icon: 'ti-bandage',     label: 'Chronic Wound & Ulcer Care'     },
  ]

  const values = [
    { icon: 'ti-award',       title: '22+ Years Experience',         desc: 'Over two decades of specialist vascular and endovascular expertise across the UK and UAE.' },
    { icon: 'ti-certificate', title: 'UK-Trained Excellence',        desc: 'Surgical fellowship with the Royal College of Surgeons; trained at world-leading centres.' },
    { icon: 'ti-heart',       title: 'Patient-First Approach',       desc: 'Compassionate care that keeps patients informed, calm, and confident at every step.' },
    { icon: 'ti-world',       title: 'Internationally Recognised',   desc: 'Published outcomes in the UK National Vascular Registry; Chairman, Emirates Vascular Society.' },
  ]

  return (
    <main>

      {/* ══ PAGE HEADER ════════════════════════════════════════════ */}
      <section
        className="relative py-24 sm:py-32 px-5 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 55%, #3DB489 100%)' }}
      >
        {/* Background rings */}
        {[260, 420, 580].map((s, i) => (
          <motion.div
            key={s}
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{ width: s, height: s, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
          />
        ))}

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl mx-auto"
        >
          <motion.span variants={fadeUp} className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/30 uppercase tracking-widest">
            Herald Medical × Dubai Vascular
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About Us
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/70 text-sm sm:text-base leading-relaxed">
            A partnership between Herald Medical and General Trading and Dubai Vascular — bringing world-class vascular, lymphedema, and lipedema care to the UAE.
          </motion.p>
        </motion.div>
      </section>

      {/* ══ OUR STORY ══════════════════════════════════════════════ */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">Our story</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">Two names, one mission</motion.h2>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-brand-bg rounded-2xl p-1 border border-brand-border">
              {(['herald', 'vascular'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab ? 'bg-white text-brand-forest shadow-sm' : 'text-brand-fern'
                  }`}
                >
                  {tab === 'herald' ? 'Herald Medical' : 'Dubai Vascular'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'herald' ? (
              <motion.div
                key="herald"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="h-16 w-auto mb-6 flex items-center">
                    <img
                      src="/images/herald-logo-icon.png"
                      alt="Herald Medical and General Trading"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-forest mb-4">Herald Medical and General Trading</h3>
                  <p className="text-brand-fern leading-relaxed mb-4">
                    Herald Medical and General Trading is the clinical home behind swellinglegs.ae — a UAE-based medical trading and services company committed to specialist healthcare. Herald brings together expert practitioners, modern facilities, and patient-centred values to address conditions that are often overlooked or misdiagnosed.
                  </p>
                  <p className="text-brand-fern leading-relaxed">
                    Through its partnership with Dubai Vascular, Herald is at the forefront of lymphedema and lipedema care in the region, providing diagnosis, treatment, education, and ongoing patient support.
                  </p>
                </div>
                <div className="bg-brand-bg rounded-3xl p-8 border border-brand-border">
                  <div className="space-y-4">
                    {[
                      { label: 'Based in', value: 'UAE', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                      { label: 'Focus', value: 'Lymphedema & Lipedema care', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                      { label: 'Mission', value: 'Patient-first specialist care', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                      { label: 'WhatsApp', value: '050 791 0902', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.69A2 2 0 0 1 2.18 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.09a16 16 0 0 0 6 6l.62-.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-pale-mint rounded-xl flex items-center justify-center flex-shrink-0 text-brand-deep-mint">
                          {item.svg}
                        </div>
                        <div>
                          <div className="text-xs text-brand-fern">{item.label}</div>
                          <div className="text-brand-forest text-sm font-medium">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vascular"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="h-14 w-auto mb-6 flex items-center">
                    <img
                      src="https://dubaivascular.ae/wp-content/uploads/dr-ibrahim-riza-logo-web.png"
                      alt="Dubai Vascular"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-forest mb-4">Dubai Vascular</h3>
                  <p className="text-brand-fern leading-relaxed mb-4">
                    Dubai Vascular is the specialist practice of Dr. Ibrahim Riza — one of Dubai's most experienced vascular and endovascular surgeons. With over 22 years of international practice and 5,000+ procedures performed, Dubai Vascular stands for technical excellence and internationally recognised outcomes.
                  </p>
                  <p className="text-brand-fern leading-relaxed">
                    The practice focuses on endovascular aortic procedures, carotid interventions, deep vein thrombosis, varicose veins, and vascular complications. Its outcomes in endovascular aortic aneurysm repair are published in the UK National Vascular Registry.
                  </p>
                  <a
                    href="https://dubaivascular.ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-brand-deep-mint text-sm font-medium hover:underline"
                  >
                    Visit dubaivascular.ae
                    <i className="ti ti-arrow-right text-xs" />
                  </a>
                </div>
                <div className="bg-brand-bg rounded-3xl p-8 border border-brand-border">
                  <div className="space-y-4">
                    {[
                      { label: 'Experience', value: '22+ years', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                      { label: 'Procedures', value: '5,000+', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
                      { label: 'Locations', value: 'Genesis Healthcare & HealthHub Dubai', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                      { label: 'Twitter / X', value: '@vascular10', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-pale-mint rounded-xl flex items-center justify-center flex-shrink-0 text-brand-deep-mint">
                          {item.svg}
                        </div>
                        <div>
                          <div className="text-xs text-brand-fern">{item.label}</div>
                          <div className="text-brand-forest text-sm font-medium">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ DR. IBRAHIM RIZA — SPOTLIGHT ═══════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2820 0%, #1C3A34 50%, #1A4040 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-5 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-start">

            {/* ── Left: content ── */}
            <div className="lg:pr-16 pt-0 lg:pt-8">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-brand-coral text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6"
              >
                Lead Consultant
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight"
              >
                Dr. Ibrahim Riza
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-brand-mint text-base sm:text-lg mb-8 font-medium"
              >
                Consultant Vascular & Endovascular Surgeon
              </motion.p>

              {/* Credential badges */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {credentials.map((c, i) => (
                  <motion.span
                    key={c}
                    variants={{
                      hidden:  { opacity: 0, scale: 0.6 },
                      visible: { opacity: 1, scale: 1, transition: { delay: i * 0.1, type: 'spring', stiffness: 200 } },
                    }}
                    className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/25"
                  >
                    {c}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-white/70 leading-relaxed text-sm sm:text-base mb-8"
              >
                Dr. Riza completed his surgical and vascular training at the Royal Liverpool University Hospital and South Manchester University Hospital — two of the UK's leading vascular centres. He holds Fellowship with the Royal College of Surgeons and a Certificate of Completion of Specialist Training (CCST-UK). Before moving to Dubai, he served as Clinical Director of Vascular Services at Pennine Acute Hospitals NHS Trust in Greater Manchester, where he led the development of vascular services and the commissioning of a state-of-the-art Hybrid OR.
              </motion.p>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="border-l-2 border-brand-deep-mint pl-4 mb-8"
              >
                <p className="text-white/80 italic text-sm leading-relaxed">
                  "Once you've met Dr. Riza, there's no looking back. His professionalism, compassion, and expertise are evident from the very first visit."
                </p>
                <p className="text-brand-mint text-xs mt-2">— S. Fernandes, patient</p>
              </motion.blockquote>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 flex-wrap"
              >
                <a href="https://dubaivascular.ae" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2 rounded-full border border-white/20 transition-colors">
                  <i className="ti ti-globe text-sm" />
                  dubaivascular.ae
                </a>
                <a href="https://twitter.com/vascular10" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2 rounded-full border border-white/20 transition-colors">
                  <i className="ti ti-brand-x text-sm" />
                  @vascular10
                </a>
                <a href="https://www.instagram.com/vasculardxb/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2 rounded-full border border-white/20 transition-colors">
                  <i className="ti ti-brand-instagram text-sm" />
                  @vasculardxb
                </a>
                <a href="https://wa.me/971507910902" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-brand-deep-mint hover:bg-brand-teal text-white text-xs font-medium px-4 py-2 rounded-full transition-colors">
                  <i className="ti ti-brand-whatsapp text-sm" />
                  Book via WhatsApp
                </a>
              </motion.div>
            </div>

            {/* ── Right: photo ── */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Glow behind photo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(61,180,137,0.25) 0%, transparent 70%)' }}
              />

              <PhotoReveal
                src="https://dubaivascular.ae/wp-content/uploads/dr-riza-pose-no-logo-2.png"
                alt="Dr. Ibrahim Riza — Consultant Vascular & Endovascular Surgeon"
                className="relative z-10 w-72 sm:w-80 lg:w-96 rounded-3xl overflow-hidden"
              />

              {/* Floating achievement badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 160 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-8 bg-white rounded-2xl px-4 py-3 shadow-xl z-20"
              >
                <div className="text-xs text-brand-fern">Chairman</div>
                <div className="text-brand-forest font-bold text-sm">Emirates Vascular Society</div>
                <div className="text-xs text-brand-fern">Scientific Committee</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════════════ */}
      <div
        className="py-12 px-5"
        style={{ background: 'linear-gradient(90deg, #2A9D8F 0%, #3DB489 100%)' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          <StatCard value={22} suffix="+" label="Years as Consultant" delay={0} />
          <StatCard value={5000} suffix="+" label="Procedures performed" delay={0.1} />
          <StatCard value={10} suffix="+" label="Years in UAE" delay={0.2} />
          <StatCard value={175} suffix="+" label="Insurance plans accepted" delay={0.3} />
        </div>
      </div>

      {/* ══ CAREER TIMELINE ════════════════════════════════════════ */}
      <section className="py-20 px-5 bg-brand-bg">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">Career journey</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">How Dr. Riza got here</motion.h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-[28px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-brand-light-mint origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />

            {timeline.map((item, i) => {
              const isRight = i % 2 !== 0
              return (
                <div key={item.year} className="relative flex items-start mb-10 last:mb-0">
                  {/* Dot */}
                  <div className="absolute left-[20px] sm:left-1/2 sm:-translate-x-1/2 top-3 z-10">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-brand-deep-mint border-[3px] border-white shadow-md"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                    />
                  </div>

                  {/* Mobile card */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', damping: 22 }}
                    className="ml-12 sm:hidden bg-white rounded-2xl p-5 border border-brand-border w-full"
                  >
                    <span className="text-brand-coral text-xs font-bold uppercase tracking-widest">{item.year}</span>
                    <h3 className="text-brand-forest font-semibold mt-1 mb-1">{item.title}</h3>
                    <p className="text-brand-fern text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>

                  {/* Desktop card */}
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', damping: 22 }}
                    className={`hidden sm:block bg-white rounded-2xl p-5 border border-brand-border ${
                      isRight
                        ? 'w-[calc(50%-2rem)] ml-[calc(50%+2rem)]'
                        : 'w-[calc(50%-2rem)] mr-[calc(50%+2rem)]'
                    }`}
                  >
                    <span className="text-brand-coral text-xs font-bold uppercase tracking-widest">{item.year}</span>
                    <h3 className="text-brand-forest font-semibold mt-1 mb-1">{item.title}</h3>
                    <p className="text-brand-fern text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ SPECIALIZATIONS ════════════════════════════════════════ */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">What we treat</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">Areas of specialisation</motion.h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {specializations.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                whileHover={{ scale: 1.04, y: -4 }}
                className="bg-brand-bg border border-brand-border rounded-2xl p-5 text-center hover:border-brand-deep-mint hover:shadow-md transition-all cursor-default"
              >
                <i className={`ti ${s.icon} text-3xl text-brand-deep-mint mb-3 block`} />
                <p className="text-brand-forest text-xs font-semibold leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ NURSE NIELSEN DIAZ ═════════════════════════════════════ */}
      <section className="py-20 px-5 bg-brand-bg">
        <div className="max-w-5xl mx-auto">

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">The team</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">Meet our specialist nurse</motion.h2>
          </motion.div>

          <div className="bg-white rounded-3xl border border-brand-border overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr]">

              {/* Photo */}
              <div className="bg-brand-pale-mint flex items-end justify-center pt-8 overflow-hidden" style={{ minHeight: '320px' }}>
                <PhotoReveal
                  src="/images/team/nielsen.jpg"
                  alt="Nurse Nielsen Diaz"
                  className="w-full h-72 sm:h-full"
                />
                {/* Replace this Unsplash placeholder with Nielsen's actual photo in public/images/team/ */}
              </div>

              {/* Content */}
              <div className="p-7 sm:p-10">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: 'spring', damping: 22 }}>

                  <span className="inline-block bg-brand-pale-mint text-brand-deep-mint text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                    Specialist Nurse
                  </span>

                  <h3 className="text-3xl font-bold text-brand-forest mb-2">Nielsen Diaz</h3>
                  <p className="text-brand-teal font-medium text-base mb-6">
                    Peripheral Vascular Lab (PVR) Specialist &amp; Lymphedema / Lipedema Specialist
                  </p>

                  <p className="text-brand-fern leading-relaxed mb-6 text-sm sm:text-base">
                    Nielsen is a cornerstone of the clinical team — a highly skilled specialist nurse whose expertise spans both the peripheral vascular lab and the diagnosis and management of lymphedema and lipedema. Patients consistently highlight her warmth, thoroughness, and ability to explain complex conditions clearly and compassionately.
                  </p>

                  <p className="text-brand-fern leading-relaxed mb-7 text-sm sm:text-base">
                    Her specialist knowledge in lymphedema and lipedema makes her uniquely positioned to support patients through assessment, compression therapy guidance, treatment education, and ongoing care — working hand-in-hand with Dr. Ibrahim Riza to deliver a truly integrated patient experience.
                  </p>

                  {/* Role tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {['Peripheral Vascular Lab', 'Lymphedema Assessment', 'Lipedema Specialist', 'Patient Education', 'Compression Therapy'].map(tag => (
                      <span key={tag} className="bg-brand-pale-mint text-brand-deep-mint text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Patient quote about Nielsen */}
                  <blockquote className="border-l-2 border-brand-deep-mint pl-4 mt-4">
                    <p className="text-brand-fern italic text-sm leading-relaxed">
                      "Doctor Ibrahim is very accommodating — he explains everything clearly. Nurse Nielsen is so helpful as well! Kudos for both of them."
                    </p>
                    <p className="text-brand-deep-mint text-xs mt-2">— J. Condez, patient</p>
                  </blockquote>

                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══════════════════════════════════════════ */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">Why us</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-brand-forest">What sets us apart</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="flex gap-5 bg-brand-bg border border-brand-border rounded-2xl p-6 hover:border-brand-deep-mint transition-all"
              >
                <div className="w-12 h-12 bg-brand-pale-mint rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className={`ti ${v.icon} text-2xl text-brand-deep-mint`} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-forest mb-2">{v.title}</h3>
                  <p className="text-brand-fern text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-5"
        style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}
      >
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="max-w-2xl mx-auto text-center">
          <motion.span variants={fadeUp} className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6 border border-white/30">
            Herald Medical and General Trading
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to meet the team?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/75 mb-8 text-base leading-relaxed">
            Dr. Ibrahim Riza and Nurse Nielsen are here to help. Book a consultation and take the first step toward a proper diagnosis and care plan.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="/contact"
            className="inline-block bg-white text-brand-teal font-semibold px-10 py-4 rounded-full hover:bg-brand-pale-mint transition-colors"
          >
            Book a Consultation
          </motion.a>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center text-white/60 text-sm">
            <a href="https://wa.me/971507910902" className="hover:text-white transition-colors">WhatsApp: 050 791 0902</a>
            <a href="https://dubaivascular.ae" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">dubaivascular.ae</a>
          </motion.div>
        </motion.div>
      </section>

    </main>
  )
}