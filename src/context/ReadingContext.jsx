import { createContext, useContext, useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import { getBook, getChapter } from '../api'

const ReadingContext = createContext(null)

export function ReadingProvider({ children }) {
  const bookMatch = useMatch('/books/:id')
  const chapterMatch = useMatch('/books/:bookId/chapters/:chapterId')
  const bookId = chapterMatch?.params.bookId ?? bookMatch?.params.id
  const chapterId = chapterMatch?.params.chapterId
  const [savedBook, setSavedBook] = useState(null)
  const [savedChapter, setSavedChapter] = useState(null)
  const [chapterFailure, setChapterFailure] = useState(null)
  const [chapterAttempt, setChapterAttempt] = useState(0)
  const [failure, setFailure] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const currentBook = bookId && String(savedBook?.id) !== bookId ? null : savedBook
  const error = failure?.bookId === bookId && failure?.attempt === attempt ? failure.message : ''

  useEffect(() => {
    if (!bookId || String(savedBook?.id) === bookId) return
    const controller = new AbortController()
    getBook(bookId, { signal: controller.signal }).then((book) => {
      if (!book || String(book.id) !== bookId) throw new Error('Book not found.')
      if (!controller.signal.aborted) setSavedBook(book)
    }).catch(() => {
      if (!controller.signal.aborted) {
        setFailure({ bookId, attempt, message: 'Unable to load this book. Please try again.' })
      }
    })
    return () => controller.abort()
  }, [bookId, savedBook, attempt])

  const currentChapter = chapterId && String(savedChapter?.id) === chapterId
    && String(savedChapter?.bookId) === bookId ? savedChapter : null
  const chapterError = chapterFailure?.bookId === bookId
    && chapterFailure?.chapterId === chapterId && chapterFailure?.attempt === chapterAttempt
    ? chapterFailure.message : ''

  useEffect(() => {
    if (!chapterId || currentChapter) return
    const controller = new AbortController()
    getChapter(chapterId, { signal: controller.signal }).then((chapter) => {
      if (!chapter || String(chapter.id) !== chapterId || String(chapter.bookId) !== bookId) {
        throw new Error('Chapter not found.')
      }
      if (!controller.signal.aborted) setSavedChapter(chapter)
    }).catch(() => {
      if (!controller.signal.aborted) {
        setChapterFailure({ bookId, chapterId, attempt: chapterAttempt,
          message: 'Unable to load this chapter. Please try again.' })
      }
    })
    return () => controller.abort()
  }, [bookId, chapterId, currentChapter, chapterAttempt])

  return (
    <ReadingContext.Provider value={{
      currentBook,
      currentChapter,
      chapterLoading: !!chapterId && !currentChapter && !chapterError,
      chapterError,
      retryChapter: () => setChapterAttempt((value) => value + 1),
      loading: !!bookId && !currentBook && !error,
      error,
      retry: () => setAttempt((value) => value + 1),
    }}>
      {children}
    </ReadingContext.Provider>
  )
}

// Kept beside the provider so the context setup has one entry point.
// eslint-disable-next-line react-refresh/only-export-components
export function useReading() {
  const context = useContext(ReadingContext)
  if (!context) throw new Error('useReading must be used within ReadingProvider')
  return context
}
