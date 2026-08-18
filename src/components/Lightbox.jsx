import { useEffect, useCallback } from 'react'

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const item = items[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  const handleKey = useCallback(
    e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="lightbox__media">
          {item.type === 'video' ? (
            <iframe
              className="lightbox__video"
              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={item.title}
            />
          ) : (
            <img src={item.src} alt={item.title} className="lightbox__img" />
          )}
        </div>

        <div className="lightbox__caption">
          <span className="lightbox__category">{item.subtitle}</span>
        </div>
      </div>

      {hasPrev && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {hasNext && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div className="lightbox__counter">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  )
}
