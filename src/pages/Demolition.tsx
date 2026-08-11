import { Link } from 'react-router-dom'
import { demolitionServices } from '../data/services'
import { SITE } from '../data/site'
import { ServiceGrid } from '../components/ServiceGrid'
import { Seo } from '../components/Seo'
import { useReveal } from '../hooks/useReveal'
import './ServicePage.css'

export function DemolitionPage() {
  const headRef = useReveal<HTMLDivElement>()

  return (
    <div className="service-page">
      <Seo
        title="부산·경남 철거"
        path="/demolition"
        description="부산·경남 부분철거, 인테리어철거, 상가·원상복구, 욕실·주방 철거, 폐기물 처리. 가족애 철거 전문."
      />
      <section className="service-hero demolition-hero">
        <div className="container">
          <p className="eyebrow">DEMOLITION</p>
          <h1>부산·경남 철거</h1>
          <p>
            부분철거부터 인테리어철거, 상가·원상복구, 폐기물 처리까지.
            {SITE.regionsLabel} 현장에서 필요한 범위만 정확히 해체하고 다음 시공이
            바로 이어지도록 정리합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal" ref={headRef}>
            <span className="eyebrow">FIELDS</span>
            <h2>철거 세부 분야</h2>
            <p>
              아파트·주택·상가 모두 대응하며, 소음·분진·하역 동선까지 미리 계획합니다.
            </p>
          </div>
          <ServiceGrid items={demolitionServices} />
        </div>
      </section>

      <section className="section service-note">
        <div className="container note-panel">
          <h2>철거 전, 이런 점이 궁금하시죠</h2>
          <ul>
            <li>엘리베이터·주차·자재 반출 경로를 먼저 확인합니다.</li>
            <li>관리사무소 신고·작업 시간 규정을 함께 체크합니다.</li>
            <li>남길 설비와 철거할 범위를 사진으로 구분해 두면 견적이 빨라집니다.</li>
            <li>폐기물 처리 포함 여부를 견적서에 명시합니다.</li>
          </ul>
          <div className="note-actions">
            <Link className="btn btn-primary" to="/contact">
              철거 상담하기
            </Link>
            <Link className="btn btn-outline" to="/reviews">
              철거 후기 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
