'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Testimonial } from '@/lib/supabase'
import { staticStories, type StoryItem } from '@/data/community'

// Stories come from data/community.ts — edit them there
const STATIC_STORIES = staticStories


// ── Helpers ───────────────────────────────────────────────────────
const conditionLabel = (c: string) =>
  c === 'lymphedema' ? 'Lymphedema' : c === 'lipedema' ? 'Lipedema' : 'Other'

const conditionColor = (c: string) =>
  c === 'lymphedema' ? 'bg-brand-pale-mint text-brand-deep-mint' :
  c === 'lipedema'   ? 'bg-[#E8F4FF] text-[#2A7A9F]' :
                       'bg-[#F5F0FF] text-[#6A4FA0]'

function getInitial(name: string | null, isAnon: boolean) {
  if (isAnon || !name) return '?'
  return name.trim().charAt(0).toUpperCase()
}

function getDisplayName(name: string | null, isAnon: boolean) {
  if (isAnon || !name) return 'Anonymous patient'
  return name.trim()
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────────────────────────
interface Props { initialTestimonials: Testimonial[] }

export default function TestimonialsSection({ initialTestimonials }: Props) {
  // Merge static + dynamic stories, newest first
  const allStories: StoryItem[] = [
    ...STATIC_STORIES,
    ...initialTestimonials.map(t => ({ ...t, photo: undefined })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const toggle = (id: string) =>
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  // Form
  const [name,      setName]      = useState('')
  const [isAnon,    setIsAnon]    = useState(false)
  const [condition, setCondition] = useState<'lymphedema'|'lipedema'|'other'|''>('')
  const [story,     setStory]     = useState('')
  const [consented, setConsented] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!condition)              { setError('Please choose a condition.'); return }
    if (story.trim().length < 30){ setError('Please write at least 30 characters.'); return }
    if (!consented)              { setError('Please tick the consent box.'); return }
    setLoading(true); setError('')
    const { error: dbErr } = await supabase.from('testimonials').insert({
      name:         isAnon ? null : (name.trim() || null),
      is_anonymous: isAnon,
      condition,
      story:        story.trim(),
    })
    setLoading(false)
    if (dbErr) { setError('Something went wrong — please try again.'); return }
    setSubmitted(true)
  }

  const [featured, ...rest] = allStories

  return (
    <section className="py-20 px-5 bg-brand-bg">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-3">From our patients</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">Patient stories</h2>
          <p className="text-brand-fern mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Real experiences, shared with permission. Helping others feel less alone.
          </p>
        </motion.div>

        {/* ── Featured story ── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl overflow-hidden mb-6 sm:flex"
            style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}
          >
            {/* Photo side — if available */}
            {featured.photo && (
              <div className="sm:w-64 sm:flex-shrink-0 h-48 sm:h-auto relative">
                <img
                  src={featured.photo}
                  alt={getDisplayName(featured.name, featured.is_anonymous)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#1C3A34]/60 to-transparent" />
              </div>
            )}

            {/* Text */}
            <div className="relative p-7 sm:p-10 flex-1">
              <span
                className="absolute top-4 right-6 text-white/10 font-serif pointer-events-none select-none hidden sm:block"
                style={{ fontSize: '120px', lineHeight: 1 }}
                aria-hidden
              >
                &ldquo;
              </span>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border border-white/30 bg-white/20 text-white/90 mb-5`}>
                {conditionLabel(featured.condition)}
              </span>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 relative z-10">
                {featured.story}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden">
                  {featured.photo
                    ? <img src={featured.photo} alt="" className="w-full h-full object-cover" aria-hidden />
                    : getInitial(featured.name, featured.is_anonymous)
                  }
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{getDisplayName(featured.name, featured.is_anonymous)}</div>
                  <div className="text-white/55 text-xs">
                    {new Date(featured.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Story grid ── */}
        {rest.length > 0 && (
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6"
          >
            {rest.map(t => {
              const isExpanded = expanded.has(t.id)
              const long = t.story.length > 200
              return (
                <motion.div
                  key={t.id}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-brand-border hover:shadow-md transition-all flex flex-col overflow-hidden"
                >
                  {/* Story photo banner (if story has a photo) */}
                  {t.photo && (
                    <div className="h-32 relative">
                      <img src={t.photo} alt="" className="w-full h-full object-cover" aria-hidden />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Decorative quote */}
                    <span className="text-brand-light-mint font-serif select-none" style={{ fontSize: '52px', lineHeight: '36px' }} aria-hidden>&ldquo;</span>

                    {/* Story text */}
                    <p className={`text-brand-fern text-sm leading-relaxed mt-2 flex-1 ${!isExpanded && long ? 'line-clamp-4' : ''}`}>
                      {t.story}
                    </p>
                    {long && (
                      <button
                        onClick={() => toggle(t.id)}
                        className="text-brand-deep-mint text-xs font-medium mt-2 text-left hover:underline"
                      >
                        {isExpanded ? 'Show less' : 'Read full story'}
                      </button>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-brand-border pt-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-brand-pale-mint flex items-center justify-center text-brand-deep-mint font-bold text-xs flex-shrink-0 overflow-hidden">
                          {t.photo
                            ? <img src={t.photo} alt="" className="w-full h-full object-cover" aria-hidden />
                            : getInitial(t.name, t.is_anonymous)
                          }
                        </div>
                        <div>
                          <div className="text-brand-forest text-sm font-medium">{getDisplayName(t.name, t.is_anonymous)}</div>
                          <div className="text-brand-fern text-xs">{new Date(t.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</div>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${conditionColor(t.condition)}`}>
                        {conditionLabel(t.condition)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* ── Submit form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-3xl border border-brand-border overflow-hidden"
        >
          <div className="bg-brand-pale-mint px-6 sm:px-8 py-6 border-b border-brand-border">
            <h3 className="text-xl font-bold text-brand-forest mb-1">Share your experience</h3>
            <p className="text-brand-fern text-sm">Your story can help others feel less alone. All submissions are reviewed before publishing.</p>
          </div>

          <div className="px-6 sm:px-8 py-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="w-16 h-16 bg-brand-pale-mint rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#3DB489" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="5 14 11 20 23 8" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-brand-forest mb-2">Thank you for sharing!</h4>
                  <p className="text-brand-fern text-sm max-w-sm mx-auto">Your story has been submitted and will appear here once reviewed — usually within 1–2 business days.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Anonymous toggle */}
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${isAnon ? 'bg-brand-deep-mint' : 'bg-brand-border'}`} onClick={() => setIsAnon(v => !v)}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isAnon ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                    <span className="text-sm text-brand-fern group-hover:text-brand-forest transition-colors">
                      Keep me <span className="font-medium text-brand-forest">anonymous</span>
                    </span>
                  </label>

                  {!isAnon && (
                    <div>
                      <label className="block text-sm font-medium text-brand-forest mb-1.5">Your name <span className="text-brand-fern font-normal">(optional)</span></label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border focus:outline-none focus:border-brand-deep-mint text-sm text-brand-forest bg-brand-bg placeholder:text-brand-fern/50 transition-colors" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-brand-forest mb-2">My condition</label>
                    <div className="flex gap-2 flex-wrap">
                      {(['lymphedema','lipedema','other'] as const).map(c => (
                        <button key={c} type="button" onClick={() => setCondition(c)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${condition === c ? 'bg-brand-deep-mint text-white border-brand-deep-mint' : 'bg-white text-brand-fern border-brand-border hover:border-brand-deep-mint'}`}>
                          {conditionLabel(c)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-forest mb-1.5">Your story</label>
                    <textarea value={story} onChange={e => setStory(e.target.value)} rows={6} placeholder="Share what your journey has been like..."
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:outline-none focus:border-brand-deep-mint text-sm text-brand-forest bg-brand-bg placeholder:text-brand-fern/50 resize-none transition-colors" />
                    <p className="text-xs text-brand-fern mt-1 text-right">{story.trim().length} characters{story.trim().length < 30 ? ' (minimum 30)' : ''}</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-brand-border accent-brand-deep-mint flex-shrink-0" />
                    <span className="text-sm text-brand-fern leading-relaxed">
                      I consent to this story being reviewed and published on the website with my chosen name or anonymously.
                    </span>
                  </label>

                  {error && <p className="text-sm text-brand-coral bg-[#FFF3F0] px-4 py-2.5 rounded-xl">{error}</p>}

                  <button type="submit" disabled={loading}
                    className="w-full sm:w-auto bg-brand-coral text-white font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2">
                    {loading && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                    )}
                    {loading ? 'Submitting...' : 'Submit your story'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}