import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { SITE } from '../data/site'
import './Header.css'

const links = [
  { to: '/', label: '홈' },
  { to: '/demolition', label: '철거' },
  { to: '/interior', label: '인테리어' },
  { to: '/reviews', label: '작업후기' },
  { to: '/contact', label: '문의·FAQ' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img className="brand-mark" src="/favicon.svg" alt="" width={34} height={34} />
          <span className="brand-text">
            <strong>가족애</strong>
            <em>철거·인테리어</em>
          </span>
        </Link>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label="메뉴"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a className="nav-phone" href={SITE.phoneHref}>
            상담 문의
          </a>
        </nav>
      </div>
    </header>
  )
}
