import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// This connects next-intl to Next.js
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)