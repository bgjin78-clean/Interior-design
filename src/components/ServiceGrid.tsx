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
      className={`service-card reveal ${item.image ? 'has-image' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      id={item.id}
    >
      {item.image && (
        <div className="service-photo">
          <img
            src={item.image}
            alt={item.imageAlt ?? `${item.title} 시공 완성 이미지`}
            loading="lazy"
            width={640}
            height={420}
          />
        </div>
      )}
      <div className="service-body">
        <div className="service-index">{String(index + 1).padStart(2, '0')}</div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <ul>
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
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
