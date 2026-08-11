export type ReviewCategory =
  | '부분철거'
  | '인테리어철거'
  | '상가철거'
  | '욕실'
  | '주방'
  | '도배장판'
  | '몰딩'
  | '타일페인트'
  | '문목공'
  | '부분수리'

export type Review = {
  id: string
  title: string
  category: ReviewCategory
  area: string
  date: string
  summary: string
  beforeNote: string
  afterNote: string
  tags: string[]
}

export const reviewCategories: Array<ReviewCategory | '전체'> = [
  '전체',
  '부분철거',
  '인테리어철거',
  '상가철거',
  '욕실',
  '주방',
  '도배장판',
  '몰딩',
  '타일페인트',
  '문목공',
  '부분수리',
]

export const seedReviews: Review[] = [
  {
    id: 'r1',
    title: '아파트 거실 가벽·장판 부분철거',
    category: '부분철거',
    area: '부산 해운대구',
    date: '2026-07-18',
    summary: '가벽 철거 후 바닥 정리까지 하루 만에 깔끔하게 마무리했습니다.',
    beforeNote: '이전 인테리어 가벽과 들뜬 장판으로 공간이 답답했습니다.',
    afterNote: '개방감을 살리고 후속 도배·장판 시공이 바로 가능하도록 정리했습니다.',
    tags: ['부분철거', '분진최소화', '당일마무리'],
  },
  {
    id: 'r2',
    title: '욕실 올수리 전 인테리어철거',
    category: '인테리어철거',
    area: '경남 창원시',
    date: '2026-07-02',
    summary: '타일·도기·천장까지 해체하고 방수 전 단계로 현장을 인도했습니다.',
    beforeNote: '노후 타일 균열과 하수구 냄새 불편이 있었습니다.',
    afterNote: '설비 위치를 표시한 뒤 보양·잔재 반출까지 완료했습니다.',
    tags: ['욕실철거', '방수준비', '폐기물처리'],
  },
  {
    id: 'r3',
    title: '주방 싱크대·상판 교체',
    category: '주방',
    area: '부산 수영구',
    date: '2026-06-21',
    summary: '수납 동선을 재배치하고 상판·후드까지 교체한 주방 사례입니다.',
    beforeNote: '싱크대 하부 습기와 상판 스크래치가 심했습니다.',
    afterNote: '밝은 톤 상판과 수납 보강으로 조리 동선이 짧아졌습니다.',
    tags: ['싱크대', '상판', '수납'],
  },
  {
    id: 'r4',
    title: '욕실 방수·타일·도기 리모델링',
    category: '욕실',
    area: '부산 금정구',
    date: '2026-06-05',
    summary: '누수 보수 후 타일·샤워부스·수전까지 교체했습니다.',
    beforeNote: '하부 누수 흔적과 줄눈 곰팡이가 있었습니다.',
    afterNote: '방수 재시공 후 밝은 대형타일로 위생감을 높였습니다.',
    tags: ['방수', '타일', '샤워부스'],
  },
  {
    id: 'r5',
    title: '도배·장판·몰딩 전체 마감',
    category: '도배장판',
    area: '경남 김해시',
    date: '2026-05-27',
    summary: '이사 전 전체 도배와 장판, 몰딩을 한 번에 맞춘 현장입니다.',
    beforeNote: '벽지 변색과 장판 이음새 들뜸이 눈에 띄었습니다.',
    afterNote: '톤을 통일해 밝고 정돈된 분위기로 바꿨습니다.',
    tags: ['도배', '장판', '몰딩'],
  },
  {
    id: 'r6',
    title: '폐업 매장 원상복구 철거',
    category: '상가철거',
    area: '부산 부산진구',
    date: '2026-05-12',
    summary: '계약 만료에 맞춰 집기·인테리어 구조물을 철거하고 인도했습니다.',
    beforeNote: '카운터·조명·가벽이 남아 원상복구가 필요했습니다.',
    afterNote: '관리규정을 확인해 불필요 공사를 줄이고 기한 내 완료했습니다.',
    tags: ['원상복구', '상가', '야간작업'],
  },
]

const STORAGE_KEY = 'gajokae-reviews'

export function loadReviews(): Review[] {
  const extra = readStored()
  return [...extra, ...seedReviews].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function addReview(
  input: Omit<Review, 'id'> & { id?: string },
): Review[] {
  const review: Review = {
    ...input,
    id: input.id ?? `local-${Date.now()}`,
  }
  const stored = readStored()
  const next = [review, ...stored]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return loadReviews()
}

export function removeLocalReview(id: string): Review[] {
  if (!id.startsWith('local-')) return loadReviews()
  const next = readStored().filter((r) => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return loadReviews()
}

function readStored(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Review[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
