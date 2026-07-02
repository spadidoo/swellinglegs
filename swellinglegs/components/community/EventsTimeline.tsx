'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import type { EventItem } from '@/data/community'

const typeStyles: Record<string, { pill: string; dot: string; badge: string }> = {
  'Workshop':        { pill: 'bg-brand-pale-mint text-brand-deep-mint', dot: 'bg-brand-deep-mint', badge: 'bg-brand-deep-mint' },
  'Support group':   { pill: 'bg-[#E8F4FF] text-[#2A7A9F]',            dot: 'bg-[#2A7A9F]',       badge: 'bg-[#2A7A9F]' },
  'Community event': { pill: 'bg-[#FFF3E8] text-[#A05A00]',            dot: 'bg-[#E76F51]',       badge: 'bg-[#E76F51]' },
  'Webinar':         { pill: 'bg-[#F3F0FF] text-[#6A4FA0]',            dot: 'bg-[#6A4FA0]',       badge: 'bg-[#6A4FA0]' },
}

function EventCard({ ev, fromLeft }: { ev: EventItem; fromLeft: boolean }) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ts    = typeStyles[ev.type] ?? typeStyles['Workshop']
  const t     = useTranslations('community')

  // Countdown
  const diff = Math.ceil((ev.date.getTime() - Date.now()) / 86400000)
  const countdown = diff === 0 ? t('today') : diff === 1 ? t('tomorrow') : diff > 0 ? t('inDays', { count: diff }) : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -56 : 56 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: 'spring', damping: 22, stiffness: 110 }}
      className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-md transition-shadow"
    >
      {ev.image && (
        <div className="h-36 overflow-hidden">
          <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ts.pill}`}>{ev.type}</span>
          {countdown && (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-xs font-bold px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral border border-brand-coral/20"
            >
              {countdown}
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className={`${ts.badge} text-white rounded-2xl px-3 py-2.5 text-center min-w-[52px] flex-shrink-0`}>
            <div className="text-2xl font-bold leading-none">{ev.date.getDate()}</div>
            <div className="text-xs font-medium uppercase opacity-80 mt-0.5">{ev.date.toLocaleString('en', { month: 'short' })}</div>
            <div className="text-xs opacity-70">{ev.date.getFullYear()}</div>
          </div>
          <h3 className="font-bold text-brand-forest text-base leading-snug">{ev.title}</h3>
        </div>
        <p className="text-brand-fern text-sm leading-relaxed mb-4">{ev.description}</p>
        <div className="space-y-1.5 text-xs text-brand-fern mb-4">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3DB489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {ev.time}
          </div>
          <div className="flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3DB489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {ev.location}
          </div>
        </div>
        {ev.link && (
          <a href={ev.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-brand-deep-mint px-4 py-2 rounded-full hover:bg-brand-teal transition-colors">
            {t('registerBtn')}
          </a>
        )}
      </div>
    </motion.div>
  )
}

interface Props { events: EventItem[] }

export default function EventsTimeline({ events }: Props) {
  const lineRef     = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(lineRef, { once: true, margin: '-60px' })
  const t           = useTranslations('community')

  const today    = new Date()
  const upcoming = events.filter(e => e.date >= today)
  const past     = events.filter(e => e.date < today)

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
          <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-2">{t('eventsLabel')}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">{t('eventsTitle')}</h2>
          <p className="text-brand-fern mt-2 text-sm max-w-md">{t('eventsSubtitle')}</p>
        </motion.div>

        {upcoming.length === 0 ? (
          <p className="text-brand-fern text-sm">{t('noEvents')}</p>
        ) : (
          <div className="relative" ref={lineRef}>
            <motion.div
              className="absolute left-[9px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-brand-light-mint origin-top"
              initial={{ scaleY: 0 }}
              animate={sectionInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            <div className="flex flex-col gap-12">
              {upcoming.map((ev, i) => {
                const fromLeft = i % 2 === 0
                const ts = typeStyles[ev.type] ?? typeStyles['Workshop']
                return (
                  <div key={ev.id} className="relative flex items-start">
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-5 z-10">
                      <motion.div
                        className={`w-[18px] h-[18px] rounded-full ${ts.dot} border-[3px] border-white shadow-md`}
                        initial={{ scale: 0 }}
                        animate={sectionInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 200 }}
                      />
                      <motion.div
                        className={`absolute inset-0 rounded-full ${ts.dot} opacity-25`}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.25, 0, 0.25] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </div>
                    <div className="ml-8 sm:hidden w-full"><EventCard ev={ev} fromLeft={false} /></div>
                    <div className={`hidden sm:block ${fromLeft ? 'w-[calc(50%-2rem)] mr-[calc(50%+2rem)]' : 'w-[calc(50%-2rem)] ml-[calc(50%+2rem)]'}`}>
                      <EventCard ev={ev} fromLeft={fromLeft} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-fern mb-4">{t('pastEvents')}</p>
            <div className="flex flex-wrap gap-3">
              {past.map(ev => (
                <div key={ev.id} className="flex items-center gap-2.5 bg-brand-bg rounded-full px-4 py-2 border border-brand-border opacity-60">
                  <span className="text-brand-fern text-xs">{ev.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="text-brand-fern text-xs">·</span>
                  <span className="text-brand-forest text-xs font-medium">{ev.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}