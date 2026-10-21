import { Link } from 'react-router-dom'
import AboutBook from '../components/AboutBook'
import Chapters from '../components/Chapters'
import Footer from '../components/Footer'
import { useReading } from '../context/ReadingContext'

function Contents() {
  const { currentBook: book, loading, error, retry } = useReading()
  return (
    <>
      <main className='contents-page'>
        <Link className='back-link' to='/'>← Back to posts</Link>
        {error ? <p role='alert'>{error} <button onClick={retry}>Retry</button></p>
          : loading ? <p role='status'>Loading book…</p> : book && <>
            <AboutBook book={book} />
            <Chapters book={book} bookId={book.id} />
          </>}
      </main>
      <Footer />
    </>
  )
}

export default Contents
