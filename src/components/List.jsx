import { Link } from 'react-router-dom'

function List({ objects, title = 'The reading room' }) {
  return (
    <section className='list-outer' aria-labelledby='posts-title'>
      <div className='list-heading'>
        <div><p className='eyebrow'>A little inspiration, a new perspective</p><h2 id='posts-title'>{title}</h2></div>
        <span className='section-note'>Stay curious. Keep reading.</span>
      </div>
      <div className='list'>
        {objects.map((item, index) => (
          <Link key={item.id ?? index} className='card' to={`/books/${encodeURIComponent(item.id)}`} style={{ '--card-index': Math.min(index, 6) }}>
            <div className='card-img'>
              {item.imageUrl?.trim() ? <img loading='lazy' src={item.imageUrl} alt='' /> : <span className='cover-placeholder' aria-hidden='true'>L.</span>}
            </div>
            <div className='card-details'>
              <span className='eyebrow'>From the journal</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className='read-link'>Discover the story <span aria-hidden='true'>↗</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default List
