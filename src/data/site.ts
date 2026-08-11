export const SITE = {
  name: '가족애 철거·인테리어',
  shortName: '가족애',
  phoneDisplay: '010-9242-3895',
  phoneTel: '01092423895',
  phoneHref: 'tel:01092423895',
  regions: ['부산', '경남'],
  regionsLabel: '부산 · 경남',
  regionsLong: '부산광역시, 경상남도 전 지역',
  hours: '09:00–18:00',
  url: 'https://interior-design-five-mocha.vercel.app',
  description:
    '부산·경남 철거·인테리어 전문 가족애. 부분철거, 인테리어철거, 욕실·주방·도배장판·몰딩까지 원스톱 시공.',
  keywords: [
    '부산 철거',
    '경남 철거',
    '부산 인테리어',
    '경남 인테리어',
    '부산 부분철거',
    '부산 인테리어철거',
    '부산 욕실 리모델링',
    '경남 주방 인테리어',
    '부산 도배장판',
    '경남 원상복구',
    '가족애 철거',
    '가족애 인테리어',
  ],
} as const

export function pageTitle(page?: string) {
  return page ? `${page} | ${SITE.name}` : `${SITE.name} | 부산·경남 철거·인테리어`
}
