import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='site-footer'>
      <div><Link className='brand' to='/'>LifeIsOn<span>.</span></Link><p>A quiet corner for stories and perspectives.</p></div>
      <a href='mailto:devanshabrol1503@gmail.com'>Let’s get in touch <span aria-hidden='true'>↗</span></a>
    </footer>
  )
}

export default Footer
