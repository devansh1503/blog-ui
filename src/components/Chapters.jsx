import { Link } from 'react-router-dom'

function Chapters({ book, bookId }) {
  const chapters = book.chapters ?? []
  return (
    <section className='chapters' aria-labelledby='chapters-title'>
      <h2 id='chapters-title'>Chapters</h2>
      {chapters.length === 0 ? <p>No chapters available yet.</p> : (
        <ul className='chapter-list'>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <Link className='chapter-card' to={`/books/${encodeURIComponent(bookId)}/chapters/${encodeURIComponent(chapter.id)}`}>
                <div className='chapter-image'>
                  {chapter.imageUrl?.trim() && <img src={chapter.imageUrl} alt='' />}
                </div>
                <span className='chapter-index'>{String(index + 1).padStart(2, '0')}</span><h3>{chapter.title}</h3><span className='chapter-arrow' aria-hidden='true'>↗</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Chapters
