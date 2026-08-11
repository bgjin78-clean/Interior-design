export type FeaturedService = {
  id: string
  name: string
  schemaType: string
  path: string
  image: string
  description: string
  keywords: string[]
}

/** 검색 노출용 핵심 서비스 5개분야 */
export const featuredSchemas: FeaturedService[] = [
  {
    id: 'demolition',
    name: '철거',
    schemaType: 'DemolitionService',
    path: '/demolition',
    image: '/images/demolish.png',
    description:
      '부산·경남 부분철거, 인테리어철거, 상가·원상복구, 폐기물 처리까지 안전하고 깔끔하게 진행합니다.',
    keywords: ['부산 철거', '경남 철거', '인테리어철거', '부분철거'],
  },
  {
    id: 'remodeling',
    name: '리모델링',
    schemaType: 'HomeImprovementService',
    path: '/interior',
    image: '/images/remodeling.png',
    description:
      '부산·경남 주택·아파트 리모델링. 철거부터 마감까지 원스톱으로 공간을 새롭게 바꿉니다.',
    keywords: ['부산 리모델링', '경남 리모델링', '아파트 리모델링'],
  },
  {
    id: 'bathroom',
    name: '욕실',
    schemaType: 'HomeImprovementService',
    path: '/interior#bathroom',
    image: '/images/bathroom.png',
    description:
      '부산·경남 욕실 리모델링. 방수, 타일, 위생도기, 샤워부스까지 전문 시공합니다.',
    keywords: ['부산 욕실 리모델링', '경남 욕실공사', '욕실 타일'],
  },
  {
    id: 'kitchen',
    name: '주방',
    schemaType: 'HomeImprovementService',
    path: '/interior#kitchen',
    image: '/images/kitchen.png',
    description:
      '부산·경남 주방 인테리어. 싱크대, 상판, 수납, 후드까지 동선에 맞게 시공합니다.',
    keywords: ['부산 주방 인테리어', '경남 싱크대', '주방 리모델링'],
  },
  {
    id: 'wallpaper-floor',
    name: '도배장판',
    schemaType: 'HomeImprovementService',
    path: '/interior#wallpaper-floor',
    image: '/images/wallpaper.png',
    description:
      '부산·경남 도배·장판 시공. 실크·합지 도배와 장판·마루 마감으로 공간을 밝게 바꿉니다.',
    keywords: ['부산 도배', '경남 장판', '도배장판'],
  },
]
