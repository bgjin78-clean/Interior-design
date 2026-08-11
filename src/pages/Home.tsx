import { Link } from 'react-router-dom'
import { demolitionServices, interiorServices, processSteps } from '../data/services'
import { seedReviews } from '../data/reviews'
import { faqs } from '../data/faq'
import { SITE } from '../data/site'
import { featuredSchemas } from '../data/featured'
import { FaqAccordion } from '../components/FaqAccordion'
import { Seo } from '../components/Seo'
import { useReveal } from '../hooks/useReveal'
import './Home.css'

export function HomePage() {
  const aboutRef = useReveal<HTMLDivElement>()
  const featuredRef = useReveal<HTMLDivElement>()
  const dualRef = useReveal<HTMLDivElement>()
  const processRef = useReveal<HTMLDivElement>()
  const reviewRef = useReveal<HTMLDivElement>()

  return (
    <>
      <Seo path="/" />
      <section className="hero">
        <div className="hero-media">
          <img
            src="/images/hero.png"
            alt="가족애 인테리어 부산·경남 리모델링 현장"
          />
          <div className="hero-shade" />
        </div>
        <div className="container hero-content">
          <p className="hero-brand">가족애</p>
          <h1>부산·경남 철거부터 인테리어까지</h1>
          <p className="hero-lead">
            부분철거·인테리어철거와 욕실·주방·도배장판·몰딩까지.
            {SITE.regionsLabel} 현장에서 꼼꼼한 마감으로 보답합니다.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact">
              무료 상담 요청
            </Link>
            <Link className="btn btn-ghost" to="/reviews">
              작업후기 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-block reveal" ref={aboutRef}>
          <div className="section-head">
            <span className="eyebrow">ABOUT</span>
            <h2>가족애 철거·인테리어가 함께합니다</h2>
            <p>
              {SITE.regionsLong}을 중심으로, 철거는 안전하고 깔끔하게, 인테리어는
              생활 동선에 맞게 제안합니다. 공간은 머무는 곳을 넘어 가족의 일상을
              담는 자리입니다.
            </p>
          </div>
          <div className="about-points">
            <div>
              <strong>원스톱</strong>
              <span>철거 → 폐기물 → 마감 시공까지 한 흐름으로</span>
            </div>
            <div>
              <strong>디테일</strong>
              <span>보양·분진 관리·이웃 배려를 기본으로</span>
            </div>
            <div>
              <strong>누적 관리</strong>
              <span>작업후기로 시공 이력을 지속적으로 기록</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal" ref={featuredRef}>
            <span className="eyebrow">CORE 5</span>
            <h2>핵심 서비스 5개조</h2>
            <p>
              철거 · 리모델링 · 욕실 · 주방 · 도배장판 — 검색과 상담에 가장 많이 찾는
              분야입니다.
            </p>
          </div>
          <div className="featured-grid">
            {featuredSchemas.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="featured-card"
                aria-label={`가족애 ${service.name}`}
              >
                <img
                  src={service.image}
                  alt={`가족애 ${service.name} — 부산·경남 시공`}
                  loading="lazy"
                  width={640}
                  height={480}
                />
                <span className="featured-label">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dual-section">
        <div className="container">
          <div className="section-head reveal" ref={dualRef}>
            <span className="eyebrow">SERVICE</span>
            <h2>두 가지 전문 영역</h2>
            <p>필요하신 공사 성격에 맞게 철거와 인테리어를 나누어 안내합니다.</p>
          </div>
          <div className="dual-grid">
            <Link to="/demolition" className="dual-panel demolition">
              <span className="dual-label">DEMOLITION</span>
              <h3>철거</h3>
              <p>
                {demolitionServices
                  .slice(0, 4)
                  .map((s) => s.title)
                  .join(' · ')}{' '}
                외
              </p>
              <span className="dual-cta">철거 분야 보기</span>
            </Link>
            <Link to="/interior" className="dual-panel interior">
              <span className="dual-label">INTERIOR</span>
              <h3>인테리어</h3>
              <p>
                {interiorServices
                  .slice(0, 4)
                  .map((s) => s.title)
                  .join(' · ')}{' '}
                외
              </p>
              <span className="dual-cta">인테리어 분야 보기</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal" ref={processRef}>
            <span className="eyebrow">PROCESS</span>
            <h2>진행 과정</h2>
            <p>상담부터 마감·후기 관리까지 단계별로 투명하게 진행합니다.</p>
          </div>
          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step.step}>
                <span>{step.step}</span>
                <strong>{step.title}</strong>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section review-preview">
        <div className="container">
          <div className="section-head reveal" ref={reviewRef}>
            <span className="eyebrow">REVIEWS</span>
            <h2>최근 작업후기</h2>
            <p>시공 사례를 모아 두어, 비슷한 공사 참고와 이후 관리에 활용합니다.</p>
          </div>
          <div className="review-preview-grid">
            {seedReviews.slice(0, 3).map((review) => (
              <article key={review.id}>
                <div className="meta">
                  <span>{review.category}</span>
                  <time dateTime={review.date}>{review.date}</time>
                </div>
                <h3>{review.title}</h3>
                <p>{review.summary}</p>
                <span className="area">{review.area}</span>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <Link className="btn btn-outline" to="/reviews">
              전체 후기·누적 관리
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-home">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>자주 묻는 질문</h2>
            <p>견적, 아파트 작업, 폐기물, 공사 기간 등 고객이 가장 많이 궁금해하는 내용입니다.</p>
          </div>
          <FaqAccordion items={faqs.slice(0, 5)} />
          <div className="section-actions">
            <Link className="btn btn-outline" to="/contact">
              FAQ 더보기 · 문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
