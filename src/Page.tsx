import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from 'config/meta'
import { Box } from 'components/Box'

const StyledPage = styled(Box)`
  width: 100%;
  min-height: calc(100vh - 64px);
  max-width: 1280px;
  padding: 16px 8px;
  margin: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 32px 24px;
  }
`

export const PageMeta: React.FC<React.PropsWithChildren> = () => {
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname)

  if (!pageMeta) {
    return null
  }

  const { description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <NextSeo
      title={pageMeta.title}
      description={description}
      openGraph={
        image
          ? {
              images: [{ url: image, alt: pageMeta?.title, type: 'image/jpeg' }],
            }
          : undefined
      }
    />
  )
}

const Page: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
