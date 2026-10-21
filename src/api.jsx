import axios from 'axios'
import { markServiceUnavailable } from './serviceStatus'

const baseURL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

const api = axios.create({
  // BASE_URL may include the controller's /v1 prefix or just the server origin.
  baseURL: baseURL.endsWith('/v1') ? baseURL : `${baseURL}/v1`,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 503) markServiceUnavailable()
    return Promise.reject(error)
  },
)

export async function getBooks(page = 0, options = {}) {
  const { data } = await api.get('/posts', { ...options, params: { page } })
  return data
}

export async function getBook(id, options = {}) {
  const { data } = await api.get('/book', { ...options, params: { id } })
  return data
}

export async function searchBooks(query, options = {}) {
  const { data } = await api.get('/posts/search', { ...options, params: { query } })
  return data
}


export async function getChapter(id, options = {}) {
  const { data } = await api.get('/chapter', { ...options, params: { id } })
  return data
}


// Replace these two stubs with API calls returning ChapterMetaData[] when ready.
export async function getChapters() {
  return []
}

export async function searchChapters(query) {
  const chapters = await getChapters()
  return chapters.filter((chapter) => chapter.title.toLowerCase().includes(query.toLowerCase()))
}

export async function getFeaturedPost(options = {}) {
  const { data } = await api.get('/posts/getFeatured', options)
  return data
}
