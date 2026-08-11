import { useState } from 'react'
import type { FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { faqs } from '../data/faq'
import { SITE } from '../data/site'
import { EMAILJS } from '../data/emailjs'
import { FaqAccordion } from '../components/FaqAccordion'
import { Seo } from '../components/Seo'
import './Contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!EMAILJS.publicKey) {
      setStatus('error')
      setErrorMsg(
        'EmailJS Public Key가 아직 설정되지 않았습니다. 관리자에게 문의해 주세요.',
      )
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('from_name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const topic = String(data.get('topic') ?? '').trim()
    const area = String(data.get('area') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const composed = [
      '[가족애 철거·인테리어] 홈페이지 상담 문의',
      '',
      `고객명: ${name}`,
      `연락처: ${phone}`,
      `관심분야: ${topic}`,
      `지역: ${area || '-'}`,
      '',
      '문의내용:',
      message,
      '',
      '---',
      '본 메일은 가족애 철거·인테리어 홈페이지에서 발송되었습니다.',
    ].join('\n')

    setStatus('sending')
    setErrorMsg('')

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: name,
          user_name: name,
          name,
          phone,
          user_phone: phone,
          topic,
          area,
          message: composed,
          title: `[가족애] 상담 문의 — ${name}${topic ? ` / ${topic}` : ''}`,
          subject: `[가족애 철거·인테리어] 상담 문의 — ${name}`,
          to_email: SITE.email,
          reply_to: phone,
        },
        { publicKey: EMAILJS.publicKey },
      )
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg(
        `메일 전송에 실패했습니다. ${SITE.phoneDisplay}로 전화 주시거나 잠시 후 다시 시도해 주세요.`,
      )
    }
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
            <a className="mail" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            <p>상담 가능 시간 {SITE.hours}</p>
            <p>현장 방문·야간 작업은 일정 협의 후 진행합니다.</p>
            <ul>
              <li>서비스 지역: {SITE.regionsLabel}</li>
              <li>철거 / 인테리어 / 부분수리 상담</li>
              <li>홈페이지 문의는 메일로 바로 전달됩니다</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h2>상담 요청</h2>
            <label>
              이름
              <input name="from_name" required placeholder="홍길동" autoComplete="name" />
            </label>
            <label>
              연락처
              <input
                name="phone"
                required
                placeholder="010-0000-0000"
                autoComplete="tel"
              />
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
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? '보내는 중…' : '문의 보내기'}
            </button>
            {status === 'sent' && (
              <p className="sent-msg">
                가족애로 문의가 전달되었습니다. 확인 후 연락드리겠습니다. 급한 상담은{' '}
                {SITE.phoneDisplay}로 연락해 주세요.
              </p>
            )}
            {status === 'error' && <p className="error-msg">{errorMsg}</p>}
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
