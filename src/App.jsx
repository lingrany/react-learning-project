import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import TestPage from './TestPage'

// 简化的首页组件
function SimpleHome() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <h1>🎉 React学习项目</h1>
      <p>欢迎来到React学习平台！</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/test" style={{ color: 'white', textDecoration: 'underline' }}>查看测试页面</a>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<SimpleHome />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
