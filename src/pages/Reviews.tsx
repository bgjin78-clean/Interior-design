import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  addReview,
  loadReviews,
  removeLocalReview,
  reviewCategories,
  type Review,
  type ReviewCategory,
} from '../data/reviews'
import { Seo } from '../components/Seo'
import './Reviews.css'

const emptyForm = {
  title: '',
  category: '부분철거' as ReviewCategory,
  area: '',
  date: new Date().toISOString().slice(0, 10),
  summary: '',
  beforeNote: '',
  afterNote: '',
  tags: '',
}

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews())
  const [filter, setFilter] = useState<(typeof reviewCategories)[number]>('전체')
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    if (filter === '전체') return reviews
    return reviews.filter((r) => r.category === filter)
  }, [filter, reviews])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.summary.trim() || !form.area.trim()) return

    const next = addReview({
      title: form.title.trim(),
      category: form.category,
      area: form.area.trim(),
      date: form.date,
      summary: form.summary.trim(),
      beforeNote: form.beforeNote.trim() || '시공 전 상태를 기록합니다.',
      afterNote: form.afterNote.trim() || '시공 후 변화를 기록합니다.',
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
    setReviews(next)
    setForm(emptyForm)
    setFormOpen(false)
  }

  function onRemove(id: string) {
    setReviews(removeLocalReview(id))
  }

  return (
    <div className="reviews-page">
      <Seo
        title="작업후기"
        path="/reviews"
        description="부산·경남 철거·인테리어 작업후기. 부분철거, 욕실, 주방, 도배장판 등 시공 사례를 누적 관리합니다."
      />
      <section className="reviews-hero">
        <div className="container">
          <p className="eyebrow">REVIEWS</p>
          <h1>작업후기</h1>
          <p>
            부산·경남 시공 사례를 날짜·분야별로 쌓아 관리합니다. 새 현장은 아래에서
            추가해 지속적으로 누적할 수 있습니다.
          </p>
          <button className="btn btn-primary" type="button" onClick={() => setFormOpen(true)}>
            후기 추가하기
          </button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-row" role="tablist" aria-label="후기 분야 필터">
            {reviewCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                className={filter === cat ? 'is-active' : ''}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="reviews-list">
            {filtered.map((review) => (
              <article className="review-item" key={review.id}>
                <div className="review-top">
                  <div>
                    <div className="review-meta">
                      <span>{review.category}</span>
                      <time dateTime={review.date}>{review.date}</time>
                      <span>{review.area}</span>
                    </div>
                    <h2>{review.title}</h2>
                  </div>
                  {review.id.startsWith('local-') && (
                    <button
                      type="button"
                      className="btn-text"
                      onClick={() => onRemove(review.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
                <p className="review-summary">{review.summary}</p>
                <div className="before-after">
                  <div>
                    <strong>Before</strong>
                    <p>{review.beforeNote}</p>
                  </div>
                  <div>
                    <strong>After</strong>
                    <p>{review.afterNote}</p>
                  </div>
                </div>
                {review.tags.length > 0 && (
                  <div className="tag-row">
                    {review.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="empty">해당 분야의 후기가 아직 없습니다. 첫 후기를 남겨 보세요.</p>
            )}
          </div>
        </div>
      </section>

      {formOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setFormOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-form-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2 id="review-form-title">작업후기 추가</h2>
              <button type="button" className="btn-text" onClick={() => setFormOpen(false)}>
                닫기
              </button>
            </div>
            <form className="review-form" onSubmit={onSubmit}>
              <label>
                제목
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="예: 욕실 방수·타일 리모델링"
                />
              </label>
              <div className="form-row">
                <label>
                  분야
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        category: e.target.value as ReviewCategory,
                      }))
                    }
                  >
                    {reviewCategories
                      .filter((c) => c !== '전체')
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </label>
                <label>
                  날짜
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  />
                </label>
              </div>
              <label>
                지역
                <input
                  required
                  value={form.area}
                  onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                  placeholder="예: 부산 해운대구"
                />
              </label>
              <label>
                한줄 요약
                <textarea
                  required
                  rows={2}
                  value={form.summary}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                />
              </label>
              <label>
                시공 전
                <textarea
                  rows={2}
                  value={form.beforeNote}
                  onChange={(e) => setForm((f) => ({ ...f, beforeNote: e.target.value }))}
                />
              </label>
              <label>
                시공 후
                <textarea
                  rows={2}
                  value={form.afterNote}
                  onChange={(e) => setForm((f) => ({ ...f, afterNote: e.target.value }))}
                />
              </label>
              <label>
                태그 (쉼표로 구분)
                <input
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  placeholder="방수, 타일, 당일"
                />
              </label>
              <button className="btn btn-primary" type="submit">
                저장하기
              </button>
              <p className="form-hint">
                브라우저에 저장되어 이 기기에서 계속 누적됩니다. 공식 사이트 반영이
                필요하면 내용을 전달해 주세요.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
