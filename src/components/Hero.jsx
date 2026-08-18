import { useEffect, useState } from 'react'
import { galleryItems } from '../data/gallery'

const slides = galleryItems.filter(item => item.type === 'photo')
const SLIDE_INTERVAL = 5000

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % slides.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.src}
            alt=""
            className={`hero__img${i === slideIndex ? ' hero__img--active' : ''}`}
          />
        ))}
        <div className="hero__overlay" />
      </div>

      <div className={`hero__content container${loaded ? ' hero__content--visible' : ''}`}>
        <p className="hero__label">Creative Services</p>
        <p className="hero__sub hero__sub--large">
          Portrait, lifestyle, and event photography<br />
          crafted with intention.
        </p>
        <div className="hero__ctas">
          <button className="btn-outline" onClick={() => scrollTo('#gallery')}>
            View Our Work
          </button>
          <button className="btn-outline" onClick={() => scrollTo('#contact')}>
            Book a Session
          </button>
        </div>
      </div>

      <div className="hero__scroll-hint" onClick={() => scrollTo('#gallery')}>
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL</span>
      </div>
    </section>
  )
}
