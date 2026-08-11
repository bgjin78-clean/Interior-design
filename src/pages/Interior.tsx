import { Link } from 'react-router-dom'
import { interiorServices } from '../data/services'
import { SITE } from '../data/site'
import { ServiceGrid } from '../components/ServiceGrid'
import { Seo } from '../components/Seo'
import { useReveal } from '../hooks/useReveal'
import './ServicePage.css'

export function InteriorPage() {
  const headRef = useReveal<HTMLDivElement>()

  return (
    <div className="service-page">
      <Seo
        title="부산·경남 인테리어"
        path="/interior"
        description="부산·경남 욕실·주방·도배장판·몰딩·타일·페인트·문·조명·부분수리. 가족애 인테리어 시공."
      />
      <section className="service-hero interior-hero">
        <div className="container">
          <p className="eyebrow">INTERIOR</p>
          <h1>부산·경남 인테리어</h1>
          <p>
            욕실·주방·도배장판·몰딩은 물론 타일·페인트·문·조명·부분수리까지.
            {SITE.regionsLabel} 생활 공간에 맞춘 마감으로 완성합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal" ref={headRef}>
            <span className="eyebrow">FIELDS</span>
            <h2>인테리어 세부 분야</h2>
            <p>
              단독 시공도, 철거 후 패키지 시공도 가능합니다. 예산과 우선순위에 맞춰
              범위를 조정해 드립니다.
            </p>
          </div>
          <ServiceGrid items={interiorServices} />
        </div>
      </section>

      <section className="section service-note">
        <div className="container note-panel">
          <h2>시공 전 준비하면 좋은 것</h2>
          <ul>
            <li>원하는 톤(밝음/따뜻함/무채색)과 참고 사진을 준비해 주세요.</li>
            <li>욕실·주방은 누수 이력, 도배는 곰팡이·결로 여부를 알려주시면 좋습니다.</li>
            <li>자재 직접 구매/시공 포함 중 원하시는 방식을 말씀해 주세요.</li>
            <li>이사·입주 일정에 맞춰 공정 순서를 짜 드립니다.</li>
          </ul>
          <div className="note-actions">
            <Link className="btn btn-primary" to="/contact">
              인테리어 상담하기
            </Link>
            <Link className="btn btn-outline" to="/reviews">
              시공 후기 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
