import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '../constants/contact'
import { useCMS } from '../context/CMSContext'

export default function SEO({
  title,
  description,
  path = '/',
  type = 'website',
}) {
  const { siteSettings } = useCMS()
  const siteName = siteSettings?.siteName || SITE_NAME
  const siteDescription = siteSettings?.siteDescription || SITE_DESCRIPTION
  const metaDescription = description || siteDescription
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  )
}
