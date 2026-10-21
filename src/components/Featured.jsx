import { Link } from 'react-router-dom'

function Featured({ post }) {
  if (!post) return null
  return (
    <div className='featured'>
        <Link className='featured-card' to={`/books/${encodeURIComponent(post.id)}`}>
            <div className='featured-image'>
                {post.imageUrl?.trim() && <img src={post.imageUrl} alt={post.title || 'Featured post'} />}
            </div>
            <div className='featured-details'>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
            </div>
        </Link>
    </div>
  )
}

export default Featured
