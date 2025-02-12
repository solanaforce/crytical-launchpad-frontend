/* eslint-disable @typescript-eslint/no-var-requires */
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  staticPageGenerationTimeout: 1000,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  webpack: configs => {
    configs.externals.push('pino-pretty', 'lokijs', 'encoding')    
    return configs
  },
  async rewrites() {
    return []
  },
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      }
    ]
  },
  async redirects() {
    return []
  },
}

export default withVanillaExtract(config)
