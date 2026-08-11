import type { ServiceItem } from '../data/services'
import { useReveal } from '../hooks/useReveal'
import './ServiceGrid.css'

type Props = {
  items: ServiceItem[]
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article
      ref={ref}
      className="service-card reveal"
      style={{ transitionDelay: `${index * 60}ms` }}
      id={item.id}
    >
      <div className="service-index">{String(index + 1).padStart(2, '0')}</div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <ul>
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  )
}

export function ServiceGrid({ items }: Props) {
  return (
    <div className="service-grid">
      {items.map((item, index) => (
        <ServiceCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
