import { useReveal } from '../hooks/useReveal'

export default function About() {
  const [imgRef, imgVisible] = useReveal()
  const [textRef, textVisible] = useReveal()

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div
            ref={imgRef}
            className={`about__img-col reveal${imgVisible ? ' visible' : ''}`}
          >
            <div className="about__img-wrap">
              <img
                src="/gallery/about.jpg"
                alt="Photographer at work"
                className="about__img"
              />
            </div>
          </div>

          <div
            ref={textRef}
            className={`about__text-col reveal reveal-delay-2${textVisible ? ' visible' : ''}`}
          >
            <p className="section-label">About</p>
            <p className="about__body about__body--large">
              I believe the best stories are imperfect. I work with individuals,
              brands, and artists who are looking for something different from
              the rest.
            </p>
            <p className="about__body">
              I capture the real moments: the beauty in-between.
            </p>

            <button
              className="btn-primary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Work With Me
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
