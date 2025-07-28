import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import TestPage from './TestPage'

// 简化的首页组件
function SimpleHome() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <h1>🎉 React学习项目</h1>
      <p>欢迎来到React学习平台！</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/test" style={{ color: 'white', textDecoration: 'underline', marginRight: '20px' }}>查看测试页面</Link>
        <Link to="/basics" style={{ color: 'white', textDecoration: 'underline' }}>基础概念</Link>
      </div>
    </div>
  )
}

// 简化的基础概念页面
function SimpleBasics() {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <h1>📚 React 基础概念</h1>
      <p>这里是基础概念页面的简化版本</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>返回首页</Link>
      </div>
      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
        <h2>🧩 组件 (Components)</h2>
        <p>React应用的基本构建块，可以复用的UI片段</p>
        <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
          <code>function Welcome(props) {'{'}
            <br />{'  '}return &lt;h1&gt;你好, {'{props.name}'}!&lt;/h1&gt;
            <br />{'}'}</code>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/basics" element={<SimpleBasics />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
