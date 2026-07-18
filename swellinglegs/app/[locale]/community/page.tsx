import { getTranslations } from 'next-intl/server'
import { supabase, type Testimonial } from '@/lib/supabase'
import { events, galleryPhotos, TIKTOK_USERNAME } from '@/data/community'
import CommunityHero from '@/components/community/CommunityHero'
import EventsTimeline from '@/components/community/EventsTimeline'
import VideosPlaylist from '@/components/community/VideosPlaylist'
import dynamic from 'next/dynamic'

// REPLACE all three dynamic imports with these:
const InstagramEducation  = dynamic(() => import('@/components/home/InstagramEducation'))
const PhotoGallery        = dynamic(() => import('@/components/community/PhotoGallery'))
const TestimonialsSection = dynamic(() => import('@/components/community/TestimonialsSection'))

const socials = [
  { platform: 'Instagram', handle: '@vasculardxb',      url: 'https://www.instagram.com/vasculardxb/',     bg: 'bg-[#FFF0F5]', text: 'text-[#C13584]' },
  { platform: 'Instagram', handle: '@renuhealthclinic', url: 'https://www.instagram.com/renuhealthclinic/', bg: 'bg-[#FFF0F5]', text: 'text-[#C13584]' },
  { platform: 'TikTok',    handle: '@vasculardxb',      url: 'https://www.tiktok.com/@vasculardxb',         bg: 'bg-[#F0FFFD]', text: 'text-[#010101]' },
  { platform: 'WhatsApp',  handle: '050 791 0902',      url: 'https://wa.me/971507910902',                  bg: 'bg-[#F0FFF5]', text: 'text-[#25D366]' },
  { platform: 'Phone',     handle: '050 791 0902',      url: 'tel:+971507910902',                           bg: 'bg-brand-pale-mint', text: 'text-brand-deep-mint' },
]

const SocialIcon = ({ platform }: { platform: string }) => {
  if (platform === 'Instagram') return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
  if (platform === 'TikTok') return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
  if (platform === 'WhatsApp') return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.69A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.62-.62a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}

export default async function CommunityPage() {
  const t = await getTranslations('community')

  let testimonials: Testimonial[] = []
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    try {
      const { data } = await supabase.from('testimonials').select('*').eq('approved', true).order('created_at', { ascending: false })
      testimonials = data ?? []
    } catch { /* Supabase not yet configured */ }
  }

  return (
    <main>
      <CommunityHero />
      <EventsTimeline events={events} />

      {/* Videos section */}
      <section className="py-20 px-5 bg-brand-bg">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <VideosPlaylist />
          </div>

          <h3 className="text-sm font-semibold text-brand-fern uppercase tracking-wide mb-4">{t('alsoOnSocial')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { handle: 'vasculardxb',      label: 'Vascular DXB',  sub: 'Treatments, tips and education',     icon: 'ti-brand-tiktok',    platform: 'TikTok',    url: `https://www.tiktok.com/@${TIKTOK_USERNAME}`,            iconBg: 'bg-[#010101]' },
              { handle: 'vasculardxb',      label: 'Vascular DXB',  sub: 'Reels, stories and highlights',      icon: 'ti-brand-instagram', platform: 'Instagram', url: 'https://www.instagram.com/vasculardxb/',                iconBg: 'bg-gradient-to-br from-[#FD5949] via-[#D6249F] to-[#285AEB]' },
              { handle: 'renuhealthclinic', label: 'Renu Health',   sub: 'Wellness tips and patient journeys', icon: 'ti-brand-instagram', platform: 'Instagram', url: 'https://www.instagram.com/renuhealthclinic/',            iconBg: 'bg-gradient-to-br from-[#FD5949] via-[#D6249F] to-[#285AEB]' },
            ].map((acc, i) => (
              <a key={`${acc.platform}-${acc.handle}-${i}`} href={acc.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl border border-brand-border p-5 hover:border-brand-deep-mint hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl ${acc.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <i className={`ti ${acc.icon} text-2xl text-white`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-brand-fern">{acc.platform}</div>
                  <div className="font-semibold text-brand-forest text-sm">@{acc.handle}</div>
                  <div className="text-brand-fern text-xs mt-0.5 truncate">{acc.sub}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-dashed border-brand-border p-8 text-center">
            <i className="ti ti-brand-youtube text-4xl text-brand-border" aria-hidden="true" />
            <p className="text-brand-forest font-medium mt-3 mb-1">{t('youtubeTitle')}</p>
            <p className="text-brand-fern text-sm">{t('youtubeSub')}</p>
          </div>
        </div>
      </section>

      {/* Instagram educational videos */}
      <InstagramEducation />

      {/* Photo gallery */}
      <PhotoGallery photos={galleryPhotos} />

      {/* Patient stories */}
      <TestimonialsSection initialTestimonials={testimonials} />

      {/* Connect with us */}
      <section className="py-20 px-5" style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('connectTitle')}</h2>
            <p className="text-white/70 text-sm">{t('connectSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {socials.map((s, i) => (
              <a key={`${s.platform}-${s.handle}-${i}`} href={s.url}
                target={s.platform === 'Phone' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`${s.bg} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all text-center`}>
                <div className={s.text}>
                  <SocialIcon platform={s.platform} />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${s.text}`}>{s.platform}</div>
                  <div className="text-brand-fern text-xs mt-0.5 break-all">{s.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}