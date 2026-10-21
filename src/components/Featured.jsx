import { Link } from 'react-router-dom'

function Featured({ post }) {
  if (!post) return null
  return (
    <section className='featured' aria-label='Featured story'>
      <Link className='featured-card' to={`/books/${encodeURIComponent(post.id)}`}>
        <div className='featured-image'>
          {post.imageUrl?.trim() ? <img src={post.imageUrl} alt='' /> : <span className='cover-placeholder' aria-hidden='true'>L.</span>}
        </div>
        <div className='featured-details'>
          <span className='eyebrow'>In the spotlight</span>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <span className='read-link'>Read the story <span aria-hidden='true'>↗</span></span>
        </div>
      </Link>
    </section>
  )
}

export default Featured
