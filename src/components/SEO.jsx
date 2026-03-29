import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '../constants/contact'

export default function SEO({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
