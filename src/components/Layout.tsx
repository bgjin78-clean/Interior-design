import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { JsonLd } from './JsonLd'

export function Layout() {
  return (
    <div className="site-shell">
      <JsonLd />
      <Header />
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
