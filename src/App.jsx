import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/common/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'
import Home from './pages/Home'
import Basics from './pages/Basics'
import Hooks from './pages/Hooks'
import Components from './pages/Components'
import Interactive from './pages/Interactive'
import Styling from './pages/Styling'
import Advanced from './pages/Advanced'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/basics" element={<Basics />} />
              <Route path="/hooks" element={<Hooks />} />
              <Route path="/components" element={<Components />} />
              <Route path="/interactive" element={<Interactive />} />
              <Route path="/styling" element={<Styling />} />
              <Route path="/advanced" element={<Advanced />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
