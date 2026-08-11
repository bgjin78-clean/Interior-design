import { useEffect } from 'react'
import { SITE, pageTitle } from '../data/site'

type SeoProps = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function Seo({
  title,
  description = SITE.description,
  path = '/',
  type = 'website',
}: SeoProps) {
  useEffect(() => {
    const fullTitle = pageTitle(title)
    const url = `${SITE.url}${path === '/' ? '' : path}`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', SITE.keywords.join(', '))
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'geo.region', 'KR-26')
    upsertMeta('name', 'geo.placename', 'Busan, Gyeongsangnam-do')
    upsertMeta('name', 'format-detection', 'telephone=yes')

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:locale', 'ko_KR')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${SITE.url}/images/interior/partial-repair.jpg`)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', `${SITE.url}/images/interior/partial-repair.jpg`)

    upsertLink('canonical', url)
  }, [title, description, path, type])

  return null
}
