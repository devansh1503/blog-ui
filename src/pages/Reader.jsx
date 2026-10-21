import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useReading } from '../context/ReadingContext'

function Reader() {
  const { bookId, id } = useParams()
  const { currentChapter: chapter, chapterLoading, chapterError, retryChapter } = useReading()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [bookId, id])

  return (
    <main className='contents-page reader-page' aria-busy={chapterLoading}>
      <Link className='back-link' to={`/books/${encodeURIComponent(bookId)}`}>← Back to contents</Link>
      {chapterError ? <p role='alert'>{chapterError} <button onClick={retryChapter}>Retry</button></p>
        : chapterLoading ? <p role='status'>Loading chapter…</p>
        : chapter ? <article aria-labelledby='chapter-title'>
          <header className='reader-header'>
            <div className='reader-image'>
              {chapter.imageUrl?.trim() && <img src={chapter.imageUrl} alt={chapter.title} />}
            </div>
            <div className='reader-heading'>
              {chapter.chapterNumber != null && <p className='chapter-number'>Chapter {chapter.chapterNumber}</p>}
              <h1 id='chapter-title'>{chapter.title}</h1>
            </div>
          </header>
          {/* Chapter HTML is trusted, authored content supplied by the backend. */}
          {chapter.content ? <div className='reader-content' dangerouslySetInnerHTML={{ __html: chapter.content }} />
            : <p className='reader-content'>This chapter has no content yet.</p>}
        </article> : <p role='status'>Chapter not found.</p>}
    </main>
  )
}

export default Reader
