// ═══════════════════════════════════════════════════════════════════
//  YOUR COMMUNITY PAGE CONTENT — edit this file to update the site
//
//  This is the ONLY file you need to change for content updates.
//  No other files need to be touched. The page auto-formats itself
//  when you add or remove items.
//
//  File location: data/community.ts
// ═══════════════════════════════════════════════════════════════════


// ──────────────────────────────────────────────────────────────────
//  EVENTS
//  ──────
//  • To ADD a new event:  copy one block and paste it at the top.
//  • To EDIT an event:   change any field in the block.
//  • To REMOVE an event: delete the whole block.
//
//  When the date passes the event automatically moves to "Past events"
//  — you do not need to delete it.
//
//  TYPE options (controls the badge colour):
//    'Workshop'        → mint green
//    'Support group'   → blue
//    'Community event' → orange
//    'Webinar'         → purple
//
//  IMAGE (optional):
//    1. Put your photo in  public/images/events/
//    2. Set  image: '/images/events/your-photo.jpg'
//    3. Leave out the image line if you have no photo.
//
//  LINK (optional):
//    Set a URL for the "Learn more" button on the card.
//    Good options:
//      WhatsApp pre-filled:  'https://wa.me/971507910902?text=I want to register for [Event Name]'
//      External page:        'https://example.com/event'
//    Leave out the link line if you want no button.
// ──────────────────────────────────────────────────────────────────

export type EventItem = {
  id:          number
  title:       string
  date:        Date
  time:        string
  location:    string
  description: string
  type:        'Workshop' | 'Support group' | 'Community event' | 'Webinar'
  image?:      string          // optional event photo
  link?:       string          // optional "Learn more" URL
}

export const events: EventItem[] = [

  // ── Paste new events here (at the top) ──

  {
    id: 1,
    title: 'Lymphedema Awareness Workshop',
    date: new Date('2026-08-10'),
    time: '10:00 AM – 12:00 PM',
    location: 'Dubai Healthcare City, Clinic Room 3',
    description: 'An informative session on understanding and managing lymphedema. Open to patients, families, and healthcare professionals.',
    type: 'Workshop',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70',
    link: 'https://wa.me/971507910902?text=Hi%2C%20I%20would%20like%20to%20register%20for%20the%20Lymphedema%20Workshop%20on%20August%2010th.',
  },

  {
    id: 2,
    title: 'Lipedema Support Group',
    date: new Date('2026-08-24'),
    time: '2:00 PM – 4:00 PM',
    location: 'Online — link sent on enquiry',
    description: 'A safe, moderated space for lipedema patients to share experiences, ask questions, and connect with others.',
    type: 'Support group',
    // No image or link for this one — both are optional
  },

  {
    id: 3,
    title: 'Community Health Fair',
    date: new Date('2026-09-06'),
    time: '9:00 AM – 5:00 PM',
    location: 'Dubai Mall Atrium',
    description: 'Free consultations, educational materials, and awareness activities. Come meet our team and learn about our services.',
    type: 'Community event',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=70',
    link: 'https://wa.me/971507910902?text=Hi%2C%20I%20am%20interested%20in%20the%20Community%20Health%20Fair%20on%20September%206th.',
  },

]


// ──────────────────────────────────────────────────────────────────
//  PATIENT STORIES  (pre-approved, always displayed)
//  ──────────────────────────────────────────────────
//  • To ADD a story:    copy one block, paste at the top, fill in.
//  • To REMOVE a story: delete its block.
//  • The first story in the list gets the large featured card.
//
//  PHOTO (optional):
//    1. Get the patient's written consent first.
//    2. Put their photo in  public/images/patients/
//    3. Set  photo: '/images/patients/their-name.jpg'
//    4. Use null if they prefer no photo.
//
//  NAME:
//    Use null + is_anonymous: true  to show "Anonymous patient".
//    Use their name + is_anonymous: false  to show their name.
//
//  CONDITION options:  'lymphedema' | 'lipedema' | 'other'
// ──────────────────────────────────────────────────────────────────

export type StoryItem = {
  id:           string
  name:         string | null
  is_anonymous: boolean
  condition:    'lymphedema' | 'lipedema' | 'other'
  story:        string
  photo?:       string | null
  created_at:   string    // format: 'YYYY-MM-DDT00:00:00Z'
}

export const staticStories: StoryItem[] = [

  // ── Paste new stories here (at the top) ──

  {
    id: 's1',
    name: 'Fatima Al-Rashidi',
    is_anonymous: false,
    condition: 'lipedema',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    story: 'For twelve years I was told my weight was the problem — just eat less and move more. I tried everything. Nothing changed my legs. When I finally received my lipedema diagnosis here, I cried for an hour. Not from sadness — from relief. Someone finally believed me. The treatment has made a real difference and I feel like I have my life back.',
    created_at: '2025-10-15T10:00:00Z',
  },

  {
    id: 's2',
    name: null,
    is_anonymous: true,
    condition: 'lymphedema',
    photo: null,
    story: 'After my breast cancer treatment my arm started to swell and I had no idea what was happening. The team here explained lymphedema clearly, without making me feel scared. They gave me a compression sleeve, showed me the exercises, and checked in every step of the way. Two years on and it is completely manageable. I feel in control again.',
    created_at: '2025-11-03T10:00:00Z',
  },

  {
    id: 's3',
    name: 'Mariam Yousef',
    is_anonymous: false,
    condition: 'lipedema',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80',
    story: 'I was 28 when I noticed how different my legs looked compared to everyone else. My doctor dismissed my concerns several times. This clinic changed everything. In one appointment they gave a name to what I had been experiencing my whole life. Knowing it is a real condition — not a personal failure — has been life-changing.',
    created_at: '2025-12-01T10:00:00Z',
  },

  {
    id: 's4',
    name: 'Khalid Al-Mansoori',
    is_anonymous: false,
    condition: 'lymphedema',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    story: 'My lymphedema began after surgery on my left leg. The swelling was painful and I was struggling to walk. The clinic created a personalised treatment plan. The drainage sessions gave immediate relief and the compression guidance has helped me maintain it between appointments. A very professional and caring team.',
    created_at: '2026-01-10T10:00:00Z',
  },

]


// ──────────────────────────────────────────────────────────────────
//  GALLERY PHOTOS
//  ──────────────
//  • To ADD a photo:    add a new { src, alt, caption } line.
//  • To REMOVE a photo: delete its line.
//  • The grid auto-adjusts — no layout changes needed.
//  • The FIRST photo in the list is displayed slightly larger.
//
//  To use your own photos:
//    1. Put the image in  public/images/gallery/
//    2. Set  src: '/images/gallery/your-photo.jpg'
//    3. Recommended size: at least 800px wide, JPEG format.
// ──────────────────────────────────────────────────────────────────

export type GalleryPhoto = { src: string; alt: string; caption: string }

export const galleryPhotos: GalleryPhoto[] = [

  // ── Add more photos here — the grid adjusts automatically ──

  { src: 'https://images.unsplash.com/photo-1631217868264-e6274c3a1ced?auto=format&fit=crop&w=800&q=80', alt: 'Clinic consultation room', caption: 'Our consultation suite' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', alt: 'Doctor consulting patient', caption: 'Expert one-on-one care' },
  { src: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?auto=format&fit=crop&w=800&q=80', alt: 'Medical team at work', caption: 'Our dedicated team' },
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', alt: 'Medical equipment', caption: 'State-of-the-art equipment' },
  { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80', alt: 'Healthcare professionals', caption: 'Our specialist team' },
  { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80', alt: 'Patient care session', caption: 'Personalised treatment sessions' },

]


// ──────────────────────────────────────────────────────────────────
//  CLINIC VIDEOS  (self-hosted, autoplay on scroll)
//  ─────────────────────────────────────────────────
//  • To ADD a video:    add a new block and put the .mp4 in public/videos/
//  • To REMOVE a video: delete its block.
//  • Videos appear in a 2-column grid automatically.
//
//  Steps to add a video:
//    1. Put the .mp4 file in  public/videos/
//    2. Add a block below with  src: '/videos/your-file.mp4'
//    3. Optional: add a poster thumbnail from  public/images/
//
//  Tips:
//    • Keep videos under 50 MB for fast loading.
//    • 720p resolution is a good balance of quality and size.
//    • Videos autoplay muted — add clear titles so users know what they're watching.
// ──────────────────────────────────────────────────────────────────

export type ClinicVideo = { src: string; poster?: string; title: string; description?: string }

export const clinicVideos: ClinicVideo[] = [

  // ── Add more videos here — the grid adjusts automatically ──

  {
    src: '/videos/clinic-overview.mp4',
    // poster: '/images/video-thumb-1.jpg',   ← optional thumbnail
    title: 'Welcome to our clinic',
    description: 'A short overview of our facilities, team, and what to expect on your first visit.',
  },

  {
    src: '/videos/lymphedema-treatment.mp4',
    title: 'Manual lymph drainage session',
    description: 'Watch how our specialists perform a manual lymph drainage therapy session.',
  },

]


// ──────────────────────────────────────────────────────────────────
//  TIKTOK VIDEOS
//  ─────────────
//  How to find a TikTok video ID:
//    1. Open the TikTok video in your browser.
//    2. The URL looks like:  tiktok.com/@vasculardxb/video/7234567890123456789
//    3. Copy the long number at the end — that is the ID.
//
//  To ADD a video: add a new { id, caption } line.
//  To REMOVE:      delete the line.
// ──────────────────────────────────────────────────────────────────

export const TIKTOK_USERNAME = 'vasculardxb'

export type TikTokVideo = { id: string; caption: string }

export const tiktokVideos: TikTokVideo[] = [

  // { id: '7234567890123456789', caption: 'Description of the video' },
  // { id: '7234567890987654321', caption: 'Another video description' },

  // Placeholder — replace with real TikTok video IDs from @vasculardxb

]