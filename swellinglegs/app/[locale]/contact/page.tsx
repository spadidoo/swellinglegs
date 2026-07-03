'use client'

import { motion, type Variants } from "framer-motion";
import { useTranslations } from 'next-intl'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

const WHATSAPP_URL = 'https://wa.me/971507910902?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation.'
const PHONE        = '+971 50 791 0902'
const EMAIL        = 'info@swellinglegs.ae'
const HOURS        = 'Monday – Friday, 8:00 AM – 5:00 PM'
const HOURS_AR     = 'الاثنين – الجمعة، 8:00 ص – 5:00 م'
const LOCATION     = 'Genesis Healthcare, Dubai Science Park · HealthHub Festival City, Dubai'
const LOCATION_AR  = 'جينيسيس هيلثكير، دبي للعلوم · هيلث هاب مهرجان سيتي، دبي'

export default function ContactPage() {
  const t = useTranslations('contact')

  // Locale-aware data
  const hours    = t('hoursLabel') === 'ساعات العيادة' ? HOURS_AR : HOURS
  const location = t('locationLabel') === 'المواقع'     ? LOCATION_AR : LOCATION

  return (
    <main>

      {/* ── Hero ── */}
      <section
        className="relative py-28 sm:py-36 px-5 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}
      >
        {[240, 400, 560].map((s, i) => (
          <motion.div
            key={s}
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{ width: s, height: s, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl mx-auto"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/30 uppercase tracking-widest"
          >
            {t('badge')}
          </motion.span>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {t('title')}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
            {t('subtitle')}
          </motion.p>

          {/* Primary WhatsApp CTA */}
          <motion.a
            variants={fadeUp}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-lg px-10 py-5 rounded-full transition-colors shadow-[0_8px_32px_rgba(37,211,102,0.35)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t('ctaBtn')}
          </motion.a>

          <motion.p variants={fadeUp} className="text-white/50 text-sm mt-4">
            {t('ctaHint')}
          </motion.p>
        </motion.div>
      </section>

      {/* ── Contact details ── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {/* WhatsApp */}
            <motion.a
              variants={fadeUp}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-brand-bg border border-brand-border rounded-2xl p-6 hover:border-[#25D366] hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 bg-[#F0FFF5] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-brand-forest font-semibold text-sm mb-0.5">{t('whatsappLabel')}</p>
                <p className="text-brand-fern text-sm">{PHONE}</p>
                <p className="text-[#25D366] text-xs font-medium mt-1.5 group-hover:underline">{t('whatsappAction')}</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              variants={fadeUp}
              href={`tel:${PHONE.replace(/\s/g,'')}`}
              className="flex items-start gap-4 bg-brand-bg border border-brand-border rounded-2xl p-6 hover:border-brand-deep-mint hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 bg-brand-pale-mint rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3DB489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.69A2 2 0 0 1 2.18 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.09a16 16 0 0 0 6 6l.62-.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-brand-forest font-semibold text-sm mb-0.5">{t('phoneLabel')}</p>
                <p className="text-brand-fern text-sm">{PHONE}</p>
                <p className="text-brand-deep-mint text-xs font-medium mt-1.5 group-hover:underline">{t('phoneAction')}</p>
              </div>
            </motion.a>

            {/* Hours */}
            <motion.div
              variants={fadeUp}
              className="flex items-start gap-4 bg-brand-bg border border-brand-border rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-brand-pale-mint rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3DB489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-brand-forest font-semibold text-sm mb-0.5">{t('hoursLabel')}</p>
                <p className="text-brand-fern text-sm leading-relaxed">{hours}</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.a
              variants={fadeUp}
              href="https://maps.google.com/?q=Genesis+Healthcare+Dubai+Science+Park"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 bg-brand-bg border border-brand-border rounded-2xl p-6 hover:border-brand-deep-mint hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 bg-brand-pale-mint rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3DB489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-brand-forest font-semibold text-sm mb-0.5">{t('locationLabel')}</p>
                <p className="text-brand-fern text-sm leading-relaxed">{location}</p>
                <p className="text-brand-deep-mint text-xs font-medium mt-1.5 group-hover:underline">{t('mapsAction')}</p>
              </div>
            </motion.a>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-brand-pale-mint rounded-3xl p-8 border border-brand-light-mint"
          >
            <h3 className="text-brand-forest font-bold text-base mb-5">{t('howTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {([
                { title: t('step1Title'), desc: t('step1') },
                { title: t('step2Title'), desc: t('step2') },
                { title: t('step3Title'), desc: t('step3') },
              ]).map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-deep-mint text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-brand-forest font-semibold text-sm mb-1">{s.title}</p>
                    <p className="text-brand-fern text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand-deep-mint hover:bg-brand-teal text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('finalCta')}
            </a>
            <p className="text-brand-fern text-xs mt-3">
              {t('moreInfoPre')}{' '}
              <a href="https://dubaivascular.ae" target="_blank" rel="noopener noreferrer" className="text-brand-deep-mint hover:underline">
                dubaivascular.ae
              </a>{' '}
              {t('moreInfoPost')}
            </p>
          </motion.div>

        </div>
      </section>

    </main>
  )
}