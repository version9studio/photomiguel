import { useState, useMemo } from 'react'
import { galleryItems, categories } from '../data/gallery'
import { useReveal } from '../hooks/useReveal'
import Lightbox from './Lightbox'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('people')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [headerRef, headerVisible] = useReveal()

  const filtered = useMemo(
    () => activeFilter === 'all' ? galleryItems : galleryItems.filter(i => i.category === activeFilter),
    [activeFilter]
  )

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className={`gallery__header reveal${headerVisible ? ' visible' : ''}`} ref={headerRef}>
          <p className="section-label">Work</p>
          <h2 className="section-heading section-heading--sans">Curated Projects</h2>
        </div>

        <div className="gallery__filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`gallery__filter${activeFilter === cat.id ? ' gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(prev => Math.max(0, prev - 1))}
          onNext={() => setLightboxIndex(prev => Math.min(filtered.length - 1, prev + 1))}
        />
      )}
    </section>
  )
}

function GalleryItem({ item, index, onClick }) {
  const [ref, visible] = useReveal(0.05)
  const delay = (index % 6) * 0.07

  return (
    <div
      ref={ref}
      className={`gallery__item reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      onClick={onClick}
    >
      <div className="gallery__item-inner">
        <img
          src={item.type === 'video' ? item.thumbnail : item.thumb}
          alt={item.title}
          className="gallery__item-img"
          loading="lazy"
        />
        {item.type === 'video' && (
          <div className="gallery__play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
