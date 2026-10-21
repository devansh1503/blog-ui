import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
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
      <Link className='brand' to='/'>LifeIsOn</Link>
      <form key={`${location.pathname}${location.search}`} className='search' onSubmit={handleSubmit} role='search'>
        <input name='query' aria-label='Search posts' placeholder='Search Using Keywords' defaultValue={location.pathname === '/' ? params.get('query') || '' : ''} type='search' />
        <button type='submit' aria-label='Search'>🔍</button>
        <button className='search-clear' type='reset' onClick={() => navigate('/')}>Clear</button>
      </form>
      <div className='navbar-actions'>
        <div>
          <div>About</div>
          <div>Translate Page</div>
        </div>
        <button className='theme-toggle' type='button' onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label='Dark mode'>
          {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>
    </header>
  )
}

export default Navbar
