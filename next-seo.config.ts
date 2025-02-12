import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Crytical AI',
  defaultTitle: 'Crytical AI',
  description:
    '',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@',
    site: '@',
  },
  openGraph: {
    title: 'Crytical AI',
    description:
      '',
    images: [{ url: 'https://app.crytical.ai/logo.png' }],
  },
}
