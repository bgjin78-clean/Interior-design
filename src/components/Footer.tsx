import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{SITE.name}</p>
          <p className="footer-copy">
            {SITE.regionsLabel} 철거부터 마감까지, 가족과 같은 마음으로 공간을 돌봅니다.
          </p>
        </div>
        <div>
          <p className="footer-label">바로가기</p>
          <div className="footer-links">
            <Link to="/demolition">철거</Link>
            <Link to="/interior">인테리어</Link>
            <Link to="/reviews">작업후기</Link>
            <Link to="/contact">문의·FAQ</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">상담</p>
          <a className="footer-phone" href={SITE.phoneHref}>
            {SITE.phoneDisplay}
          </a>
          <p className="footer-meta">
            상담 {SITE.hours} · {SITE.regionsLabel} · 현장 일정 협의 가능
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>작업후기는 시공 후 지속적으로 누적 관리합니다.</span>
      </div>
    </footer>
  )
}
