function AboutBook({ book }) {
  return (
    <section className='book-details' aria-labelledby='book-title'>
      {book.imageUrl?.trim() && <div className='book-image'>
        <img src={book.imageUrl} alt={book.title} />
      </div>}
      <div className='book-description'>
        <h1 id='book-title'>{book.title}</h1>
        <p>{book.description}</p>
      </div>
    </section>
  )
}

export default AboutBook
