import { useState } from 'react'
import type { FormEvent } from 'react'
import { faqs } from '../data/faq'
import { SITE } from '../data/site'
import { FaqAccordion } from '../components/FaqAccordion'
import { Seo } from '../components/Seo'
import './Contact.css'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact-page">
      <Seo
        title="문의·FAQ"
        path="/contact"
        description={`부산·경남 철거·인테리어 상담. 견적·방문 실측·공사 일정 문의 ${SITE.phoneDisplay}`}
      />
      <section className="contact-hero">
        <div className="container">
          <p className="eyebrow">CONTACT</p>
          <h1>문의·FAQ</h1>
          <p>
            부산·경남 철거·인테리어 상담을 받으실 수 있습니다. 철거 범위, 공사 기간,
            견적 방식 등 궁금하신 점과 사진·주소를 남겨 주세요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>상담 안내</h2>
            <a className="phone" href={SITE.phoneHref}>
              {SITE.phoneDisplay}
            </a>
            <p>상담 가능 시간 {SITE.hours}</p>
            <p>현장 방문·야간 작업은 일정 협의 후 진행합니다.</p>
            <ul>
              <li>서비스 지역: {SITE.regionsLabel}</li>
              <li>철거 / 인테리어 / 부분수리 상담</li>
              <li>작업후기 기반 유사 사례 안내</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h2>상담 요청</h2>
            <label>
              이름
              <input name="name" required placeholder="홍길동" />
            </label>
            <label>
              연락처
              <input name="phone" required placeholder={SITE.phoneDisplay} />
            </label>
            <label>
              관심 분야
              <select name="topic" defaultValue="철거">
                <option>철거</option>
                <option>인테리어</option>
                <option>철거+인테리어</option>
                <option>부분수리</option>
                <option>기타</option>
              </select>
            </label>
            <label>
              지역 / 현장 주소
              <input name="area" placeholder="예: 부산 해운대구" />
            </label>
            <label>
              문의 내용
              <textarea
                name="message"
                required
                rows={5}
                placeholder="공사 범위, 희망 일정, 참고 사진 유무 등을 적어 주세요."
              />
            </label>
            <button className="btn btn-primary" type="submit">
              문의 보내기
            </button>
            {sent && (
              <p className="sent-msg">
                문의가 접수된 형태로 표시됩니다. 급한 상담은 {SITE.phoneDisplay}로
                연락해 주세요.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>사람들이 자주 묻는 내용</h2>
            <p>견적, 아파트 작업, 폐기물, 공사 기간, A/S까지 모아 두었습니다.</p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </div>
  )
}
