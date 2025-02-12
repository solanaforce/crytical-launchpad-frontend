/**
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import NextErrorComponent, { ErrorProps } from 'next/error'
import { NotFound } from 'components/NotFound'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

const CustomErrorComponent = (props: ErrorProps) => (
  <NotFound statusCode={props.statusCode} LinkComp={Link}>
    <NextSeo title="404" />
  </NotFound>
)

CustomErrorComponent.getInitialProps = async (contextData) => {
  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
