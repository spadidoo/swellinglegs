import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Testimonial = {
  id:           string
  name:         string | null
  is_anonymous: boolean
  condition:    'lymphedema' | 'lipedema' | 'other'
  story:        string
  approved:     boolean
  created_at:   string
}