import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const services = [
  'Portrait Session',
  'Commercial Photography',
  'Event Coverage',
  'Other',
]

export default function Contact() {
  const [headerRef, headerVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('form-name', 'contact')
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      await fetch('/', { method: 'POST', body: formData })
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', service: '', date: '', message: '' })
    } catch (err) {
      console.error('Form error:', err)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className={`contact__header reveal${headerVisible ? ' visible' : ''}`} ref={headerRef}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-heading">Book Your Session</h2>
          <p className="contact__intro">
            Ready to create something beautiful together? Tell us about your vision
            and we&apos;ll be in touch shortly.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__info-item">
              <h4 className="contact__info-label">Location</h4>
              <p className="contact__info-value">
                Encinitas, CA
              </p>
            </div>
            <div className="contact__info-item">
              <h4 className="contact__info-label">Contact</h4>
              <p className="contact__info-value">
                hello@photomiguel.com
              </p>
            </div>
          </div>

          <div
            ref={formRef}
            className={`contact__form-wrap reveal reveal-delay-2${formVisible ? ' visible' : ''}`}
          >
            {submitted ? (
              <div className="contact__success">
                <span className="contact__success-icon">✓</span>
                <h3>Message Sent!</h3>
                <p>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                name="contact"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">Full Name *</label>
                    <input
                      className="contact__input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Email Address *</label>
                    <input
                      className="contact__input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">Phone (optional)</label>
                    <input
                      className="contact__input"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Service *</label>
                    <select
                      className="contact__input contact__select"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="contact__field">
                  <label className="contact__label">Preferred Date</label>
                  <input
                    className="contact__input"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={today}
                  />
                </div>
                <div className="contact__field">
                  <label className="contact__label">Tell Us About Your Vision *</label>
                  <textarea
                    className="contact__input contact__textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your project, location ideas, style references..."
                  />
                </div>
                <button type="submit" className="btn-primary contact__submit">
                  Send Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
