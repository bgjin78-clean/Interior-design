import { SITE } from '../data/site'
import { faqs } from '../data/faq'
import { featuredSchemas } from '../data/featured'

export function JsonLd() {
  const businessId = `${SITE.url}/#business`
  const websiteId = `${SITE.url}/#website`

  const serviceNodes = featuredSchemas.map((service) => ({
    '@type': 'Service',
    '@id': `${SITE.url}/#service-${service.id}`,
    name: `가족애 ${service.name}`,
    alternateName: service.keywords,
    serviceType: service.name,
    description: service.description,
    url: `${SITE.url}${service.path}`,
    image: `${SITE.url}${service.image}`,
    provider: { '@id': businessId },
    areaServed: [
      { '@type': 'AdministrativeArea', name: '부산광역시' },
      { '@type': 'AdministrativeArea', name: '경상남도' },
    ],
    audience: {
      '@type': 'Audience',
      geographicArea: {
        '@type': 'AdministrativeArea',
        name: '부산·경남',
      },
    },
    brand: {
      '@type': 'Brand',
      name: SITE.shortName,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'KRW',
      url: `${SITE.url}/contact`,
      description: `${service.name} 무료 상담 · ${SITE.phoneDisplay}`,
    },
  }))

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
        '@id': businessId,
        name: SITE.name,
        alternateName: ['가족애', '가족애 인테리어', '가족애 철거'],
        description: SITE.description,
        url: SITE.url,
        telephone: SITE.phoneDisplay,
        image: featuredSchemas.map((s) => `${SITE.url}${s.image}`),
        logo: `${SITE.url}/favicon.svg`,
        priceRange: '₩₩',
        areaServed: [
          { '@type': 'AdministrativeArea', name: '부산광역시' },
          { '@type': 'AdministrativeArea', name: '경상남도' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: '부산',
          addressRegion: '부산광역시',
          addressCountry: 'KR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.1796,
          longitude: 129.0756,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:00',
          closes: '18:00',
        },
        knowsAbout: featuredSchemas.flatMap((s) => s.keywords),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '가족애 주요 서비스 5개조',
          itemListElement: featuredSchemas.map((service, index) => ({
            '@type': 'OfferCatalog',
            name: service.name,
            position: index + 1,
            itemListElement: {
              '@type': 'Offer',
              itemOffered: { '@id': `${SITE.url}/#service-${service.id}` },
            },
          })),
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.phoneDisplay,
          contactType: 'customer service',
          areaServed: ['KR'],
          availableLanguage: ['Korean'],
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { '@id': businessId },
        inLanguage: 'ko-KR',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/contact`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/#webpage`,
        url: SITE.url,
        name: SITE.name,
        isPartOf: { '@id': websiteId },
        about: { '@id': businessId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE.url}/images/remodeling.png`,
        },
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/contact#faq`,
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE.url}/#service-list`,
        name: '가족애 핵심 서비스 5개조',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: featuredSchemas.length,
        itemListElement: featuredSchemas.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.name,
          url: `${SITE.url}${service.path}`,
          item: { '@id': `${SITE.url}/#service-${service.id}` },
        })),
      },
      ...serviceNodes,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
