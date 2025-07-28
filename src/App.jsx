import React from 'react'
import TestPage from './TestPage'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <TestPage />
    </ErrorBoundary>
  )
}

export default App
