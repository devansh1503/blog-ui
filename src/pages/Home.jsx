import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Featured from '../components/Featured'
import List from '../components/List'
import Footer from '../components/Footer'
import { getBooks, getFeaturedPost, searchBooks } from '../api'

// Supports a plain array or a paginated response with content/posts/items.
function readPosts(data) {
  if (Array.isArray(data)) return data
  const posts = data?.content ?? data?.posts ?? data?.items
  if (!Array.isArray(posts)) throw new Error('The server returned an unexpected post list.')
  return posts
}

function HomePosts({ query }) {
  const [page, setPage] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ posts: [], loading: true, error: '', hasNext: false })
  const [featured, setFeatured] = useState({ post: null, loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    getFeaturedPost({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) {
          setFeatured({ post: data?.post ?? data ?? null, loading: false, error: '' })
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setFeatured({ post: null, loading: false, error: 'Unable to load the featured post.' })
        }
      })
    return () => controller.abort()
  }, [attempt])

  useEffect(() => {
    const controller = new AbortController()
    const request = query
      ? searchBooks(query, { signal: controller.signal })
      : getBooks(page, { signal: controller.signal })

    request.then((data) => {
      const posts = readPosts(data)
      const totalPages = data?.totalPages ?? data?.page?.totalPages
      const hasNext = query ? false
        : typeof data?.last === 'boolean' ? !data.last
        : typeof totalPages === 'number' ? page + 1 < totalPages
        : typeof data?.hasNext === 'boolean' ? data.hasNext
        : posts.length > 0
      if (!controller.signal.aborted) {
        setResult({ posts, hasNext, loading: false, error: '' })
      }
    }).catch((error) => {
      if (!controller.signal.aborted) {
        setResult({ posts: [], hasNext: false, loading: false,
          error: error.response ? 'Unable to load posts. Please try again.' : error.message })
      }
    })
    return () => controller.abort()
  }, [query, page, attempt])

  function changePage(nextPage) {
    setResult({ posts: [], loading: true, error: '', hasNext: false })
    setPage(nextPage)
  }

  function retry() {
    setResult({ posts: [], loading: true, error: '', hasNext: false })
    setFeatured({ post: null, loading: true, error: '' })
    setAttempt((value) => value + 1)
  }

  return (
    <div>
      {!query && (
        <section className='journal-intro'>
          <p className='eyebrow'><span className='intro-dot' /> Stories, thoughts & everything in between</p>
          <h1>Life happens.<br /><em>Let’s read into it.</em></h1>
          <p className='intro-description'>
            A collection of stories and fresh perspectives.<br />
            Slow down, settle in, and find something that stays with you.
          </p>
          <span className='intro-flourish' aria-hidden='true'>✳</span>
        </section>
      )}
      {!query && <>
        {featured.loading && <p className='home-status' role='status'>Loading featured post…</p>}
        {featured.error && <p className='home-status' role='alert'>{featured.error} <button onClick={retry}>Retry</button></p>}
        <Featured post={featured.post} />
      </>}
      <main aria-busy={result.loading}>
        {result.loading && <p className='home-status' role='status'>Loading posts…</p>}
        {result.error && <p className='home-status' role='alert'>{result.error} <button onClick={retry}>Retry</button></p>}
        {!result.loading && !result.error && <>
          <List objects={result.posts} title={query ? `Search results for “${query}”` : 'The reading room'} />
          {result.posts.length === 0 && <p className='home-status'>No posts found.</p>}
        </>}
        {!query && <nav className='pagination' aria-label='Post pages'>
          <button disabled={result.loading || page === 0} onClick={() => changePage(page - 1)}>Previous</button>
          <span>Page {page + 1}</span>
          <button disabled={result.loading || !!result.error || !result.hasNext} onClick={() => changePage(page + 1)}>Next</button>
        </nav>}
      </main>
      <Footer />
    </div>
  )
}

function Home() {
  const [params] = useSearchParams()
  const query = params.get('query')?.trim() || ''
  return <HomePosts key={query} query={query} />
}

export default Home
