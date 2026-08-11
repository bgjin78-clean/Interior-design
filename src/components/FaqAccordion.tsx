import { useState } from 'react'
import type { FaqItem } from '../data/faq'
import './FaqAccordion.css'

type Props = {
  items: FaqItem[]
}

export function FaqAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="faq-list">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div className={`faq-item ${open ? 'is-open' : ''}`} key={item.id}>
            <button
              className="faq-trigger"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="faq-cat">{item.category}</span>
              <span className="faq-q">{item.question}</span>
              <span className="faq-icon" aria-hidden>
                {open ? '−' : '+'}
              </span>
            </button>
            <div className="faq-panel" hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
