import { useState, useEffect } from 'react'

const links = [
  { label: 'Work', href: '#gallery' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" onClick={e => handleLink(e, '#home')}>
          <span className="navbar__logo-text">MIGUEL</span>
          <span className="navbar__logo-sub">FLORES</span>
        </a>

        <div className={`navbar__links${mobileOpen ? ' navbar__links--open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="navbar__link" onClick={e => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary navbar__cta" onClick={e => handleLink(e, '#contact')}>
            Book Now
          </a>
        </div>

        <button
          className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
