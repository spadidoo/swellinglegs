import { supabase, type Testimonial } from '@/lib/supabase'
import { events, clinicVideos, tiktokVideos, TIKTOK_USERNAME, galleryPhotos } from '@/data/community'
import CommunityHero from '@/components/community/CommunityHero'
import EventsTimeline from '@/components/community/EventsTimeline'
import VideoPlayer from '@/components/community/VideoPlayer'
import PhotoGallery from '@/components/community/PhotoGallery'
import TestimonialsSection from '@/components/community/TestimonialsSection'

// Social links — edit here if handles or URLs change
const socials = [
  { platform: 'Instagram', handle: '@vasculardxb',     url: 'https://www.instagram.com/vasculardxb/',     icon: 'ti-brand-instagram', bg: 'bg-[#FFF0F5]', text: 'text-[#C13584]' },
  { platform: 'Instagram', handle: '@renuhealthclinic', url: 'https://www.instagram.com/renuhealthclinic/', icon: 'ti-brand-instagram', bg: 'bg-[#FFF0F5]', text: 'text-[#C13584]' },
  { platform: 'TikTok',    handle: '@vasculardxb',     url: 'https://www.tiktok.com/@vasculardxb',         icon: 'ti-brand-tiktok',    bg: 'bg-[#F0FFFD]', text: 'text-[#010101]' },
  { platform: 'WhatsApp',  handle: '050 791 0902',     url: 'https://wa.me/971507910902',                  icon: 'ti-brand-whatsapp',  bg: 'bg-[#F0FFF5]', text: 'text-[#25D366]' },
  { platform: 'Phone',     handle: '050 791 0902',     url: 'tel:+971507910902',                           icon: 'ti-phone',           bg: 'bg-brand-pale-mint', text: 'text-brand-deep-mint' },
]

export default async function CommunityPage() {
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

      {/* Self-hosted autoplay videos + social media links */}
      <section className="py-20 px-5 bg-brand-bg">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-brand-deep-mint text-xs font-semibold uppercase tracking-widest mb-2">Videos</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-forest">From the clinic</h2>
            <p className="text-brand-fern mt-2 text-sm max-w-md">Videos play automatically as you scroll — tap to pause, or tap the speaker icon to unmute.</p>
          </div>

          {/* Clinic videos — grid grows automatically as you add more */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {clinicVideos.map((v, i) => (
              <VideoPlayer key={`${v.src}-${i}`} {...v} />
            ))}
          </div>

          {/* Social video channels */}
          <h3 className="text-sm font-semibold text-brand-fern uppercase tracking-wide mb-4">Also on social</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { handle: 'vasculardxb',     label: 'Vascular DXB',    sub: 'Treatments, tips and education', icon: 'ti-brand-tiktok',    platform: 'TikTok',    url: `https://www.tiktok.com/@${TIKTOK_USERNAME}`,           iconBg: 'bg-[#010101]' },
              { handle: 'vasculardxb',     label: 'Vascular DXB',    sub: 'Reels, stories and highlights',  icon: 'ti-brand-instagram', platform: 'Instagram', url: 'https://www.instagram.com/vasculardxb/',               iconBg: 'bg-gradient-to-br from-[#FD5949] via-[#D6249F] to-[#285AEB]' },
              { handle: 'renuhealthclinic', label: 'Renu Health',    sub: 'Wellness tips and patient journeys', icon: 'ti-brand-instagram', platform: 'Instagram', url: 'https://www.instagram.com/renuhealthclinic/', iconBg: 'bg-gradient-to-br from-[#FD5949] via-[#D6249F] to-[#285AEB]' },
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
                <i className="ti ti-arrow-right text-brand-border group-hover:text-brand-deep-mint transition-colors" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* YouTube placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-brand-border p-8 text-center">
            <i className="ti ti-brand-youtube text-4xl text-brand-border" aria-hidden="true" />
            <p className="text-brand-forest font-medium mt-3 mb-1">YouTube — coming soon</p>
            <p className="text-brand-fern text-sm">The clinic YouTube channel is being set up. Videos will appear here.</p>
          </div>
        </div>
      </section>

      {/* Photo gallery — grid auto-adjusts as you add more photos */}
      <PhotoGallery photos={galleryPhotos} />

      {/* Patient stories + submit form */}
      <TestimonialsSection initialTestimonials={testimonials} />

      {/* Connect with us */}
      <section className="py-20 px-5" style={{ background: 'linear-gradient(135deg, #1C3A34 0%, #2A9D8F 60%, #3DB489 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Connect with us</h2>
            <p className="text-white/70 text-sm">Follow our accounts or reach out directly.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {socials.map((s, i) => (
              <a key={`${s.platform}-${s.handle}-${i}`} href={s.url}
                target={s.platform === 'Phone' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`${s.bg} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all text-center`}>
                <i className={`ti ${s.icon} text-2xl ${s.text}`} aria-hidden="true" />
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