import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/Home'
import { DemolitionPage } from './pages/Demolition'
import { InteriorPage } from './pages/Interior'
import { ReviewsPage } from './pages/Reviews'
import { ContactPage } from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="demolition" element={<DemolitionPage />} />
          <Route path="interior" element={<InteriorPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
