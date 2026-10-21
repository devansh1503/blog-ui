import Navbar from '../components/Navbar'

export default function ServiceUnavailable() {
  return (
    <div className="unavailable-page">
    <Navbar serviceUnavailable />
    <main className="service-unavailable" aria-labelledby="service-unavailable-title">
      <div>
        <div className="resting-server" aria-hidden="true">
          <span className="server-orbit" />
          <svg viewBox="0 0 160 140" fill="none">
            <path d="M28 118h104" stroke="currentColor" strokeOpacity=".2" />
            <g className="server-stack" stroke="currentColor" strokeWidth="1.5">
              <rect x="40" y="42" width="80" height="30" rx="7" fill="var(--surface)" />
              <rect x="40" y="79" width="80" height="30" rx="7" fill="var(--surface)" />
              <path d="M54 57h22M54 94h22" strokeLinecap="round" />
              <circle className="server-light" cx="105" cy="57" r="3" fill="currentColor" stroke="none" />
              <circle cx="105" cy="94" r="3" fill="currentColor" stroke="none" opacity=".3" />
            </g>
            <g className="server-sleep" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M112 27h9l-9 10h9M127 12h12l-12 13h12" />
            </g>
          </svg>
        </div>
        <p className="eyebrow unavailable-label">The journal is taking a breather</p>
        <h1 id="service-unavailable-title">The ECS Task is not running currently.</h1>
        <p>
          Contact me at{' '}
          <a href="mailto:devanshabrol1503@gmail.com">devanshabrol1503@gmail.com</a>{' '}
          to request a Demo of the working application.
        </p>
        <a className="demo-link" href="mailto:devanshabrol1503@gmail.com?subject=LifeIsOn%20demo%20request">Request a demo <span aria-hidden="true">↗</span></a>
      </div>
    </main>
    </div>
  )
}
