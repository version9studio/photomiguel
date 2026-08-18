export default function Footer() {
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-text">MIGUEL</span>
              <span className="footer__logo-sub">FLORES</span>
            </div>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Navigation</h4>
            <a href="#gallery" className="footer__link" onClick={e => { e.preventDefault(); scrollTo('#gallery') }}>Work</a>
            <a href="#about" className="footer__link" onClick={e => { e.preventDefault(); scrollTo('#about') }}>About</a>
            <a href="#contact" className="footer__link" onClick={e => { e.preventDefault(); scrollTo('#contact') }}>Contact</a>
            <a href="#contact" className="footer__link" onClick={e => { e.preventDefault(); scrollTo('#contact') }}>Book a Session</a>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Connect</h4>
            <a href="mailto:hello@photomiguel.com" className="footer__link">hello@photomiguel.com</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} Miguel Flores. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
