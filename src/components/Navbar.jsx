import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar({ serviceUnavailable = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const { theme, toggleTheme } = useTheme()

  function handleSubmit(event) {
    event.preventDefault()
    const query = new FormData(event.currentTarget).get('query').trim()
    navigate(query ? `/?${new URLSearchParams({ query })}` : '/')
  }

  return (
    <header className='navbar'>
      <Link className='brand' to='/' aria-label='LifeIsOn home'>LifeIsOn<span>.</span></Link>
      {!serviceUnavailable && <form key={`${location.pathname}${location.search}`} className='search' onSubmit={handleSubmit} role='search'>
        <input name='query' aria-label='Search posts' placeholder='Find your next read…' defaultValue={location.pathname === '/' ? params.get('query') || '' : ''} type='search' />
        <button type='submit' aria-label='Search'><svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' aria-hidden='true'><circle cx='10.5' cy='10.5' r='6.5' /><path d='m16 16 5 5' /></svg></button>
        <button className='search-clear' type='reset' onClick={() => navigate('/')}>Clear</button>
      </form>}
      <div className='navbar-actions'>
        {serviceUnavailable ? <span className='nav-journal'>A little pause in the story</span> : <Link className='nav-journal' to='/'>The journal</Link>}
        <button className='theme-toggle' type='button' onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
