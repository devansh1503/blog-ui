import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { ReadingProvider } from './context/ReadingContext'
import Home from './pages/Home'
import Contents from './pages/Contents'
import Reader from './pages/Reader'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <ReadingProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/:id' element={<Contents />} />
        <Route path='/books/:bookId/chapters/:id' element={<Reader />} />
      </Routes>
      </ReadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
