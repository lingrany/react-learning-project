import React, { useState, useEffect, useMemo, useCallback, memo, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Advanced.css'

// 懒加载组件演示
const LazyComponent = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="lazy-component">
            <h4>🚀 懒加载组件</h4>
            <p>这个组件是通过React.lazy()懒加载的！</p>
            <p>它会在需要时才被加载，有助于减少初始包大小。</p>
          </div>
        )
      })
    }, 1000) // 模拟加载延迟
  })
)

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.log('错误边界捕获到错误:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h4>🚨 出现错误了！</h4>
          <p>错误边界捕获到了一个错误</p>
          <details>
            <summary>错误详情</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="retry-btn"
          >
            重试
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// 会出错的组件
function BuggyComponent({ shouldError }) {
  if (shouldError) {
    throw new Error('这是一个故意抛出的错误，用于演示错误边界！')
  }
  
  return (
    <div className="buggy-component">
      <h4>✅ 正常组件</h4>
      <p>这个组件现在工作正常</p>
    </div>
  )
}

// 使用memo优化的组件
const OptimizedComponent = memo(({ count, name }) => {
  console.log('OptimizedComponent 重新渲染')
  
  return (
    <div className="optimized-component">
      <h4>⚡ 优化组件 (React.memo)</h4>
      <p>计数: {count}</p>
      <p>名称: {name}</p>
      <p className="memo-note">
        💡 这个组件使用了React.memo，只有当props改变时才会重新渲染
      </p>
    </div>
  )
})

// 性能优化演示
function PerformanceDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React学习者')
  const [items, setItems] = useState([])

  // useMemo 优化昂贵计算
  const expensiveValue = useMemo(() => {
    console.log('执行昂贵计算...')
    let result = 0
    for (let i = 0; i < count * 1000; i++) {
      result += i
    }
    return result
  }, [count])

  // useCallback 优化函数引用
  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, `项目 ${prev.length + 1}`])
  }, [])

  const handleClearItems = useCallback(() => {
    setItems([])
  }, [])

  return (
    <div className="performance-demo">
      <h3>⚡ 性能优化演示</h3>
      
      <div className="demo-section">
        <h4>useMemo 演示</h4>
        <div className="memo-controls">
          <button onClick={() => setCount(count + 1)}>
            增加计数 ({count})
          </button>
          <button onClick={() => setName(name + '!')}>
            修改名称
          </button>
        </div>
        <div className="memo-result">
          <p>昂贵计算结果: {expensiveValue}</p>
          <p className="memo-note">
            💡 只有当count改变时，昂贵计算才会重新执行
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h4>React.memo 演示</h4>
        <OptimizedComponent count={count} name={name} />
      </div>

      <div className="demo-section">
        <h4>useCallback 演示</h4>
        <div className="callback-controls">
          <button onClick={handleAddItem}>添加项目</button>
          <button onClick={handleClearItems}>清空列表</button>
        </div>
        <div className="items-list">
          {items.map((item, index) => (
            <div key={index} className="list-item">{item}</div>
          ))}
        </div>
        <p className="callback-note">
          💡 handleAddItem和handleClearItems使用了useCallback优化
        </p>
      </div>
    </div>
  )
}

// 代码分割演示
function CodeSplittingDemo() {
  const [showLazyComponent, setShowLazyComponent] = useState(false)

  return (
    <div className="code-splitting-demo">
      <h3>📦 代码分割演示</h3>
      
      <div className="demo-section">
        <button 
          onClick={() => setShowLazyComponent(!showLazyComponent)}
          className="toggle-btn"
        >
          {showLazyComponent ? '隐藏' : '显示'}懒加载组件
        </button>
        
        {showLazyComponent && (
          <Suspense fallback={
            <div className="loading-fallback">
              <div className="loading-spinner"></div>
              <p>正在加载组件...</p>
            </div>
          }>
            <LazyComponent />
          </Suspense>
        )}
      </div>

      <div className="code-example">
        <h4>代码示例:</h4>
        <pre>{`// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'))

// 使用Suspense包装
<Suspense fallback={<div>加载中...</div>}>
  <LazyComponent />
</Suspense>`}</pre>
      </div>
    </div>
  )
}

// 错误边界演示
function ErrorBoundaryDemo() {
  const [shouldError, setShouldError] = useState(false)

  return (
    <div className="error-boundary-demo">
      <h3>🚨 错误边界演示</h3>
      
      <div className="demo-section">
        <div className="error-controls">
          <button 
            onClick={() => setShouldError(!shouldError)}
            className={`error-btn ${shouldError ? 'danger' : 'safe'}`}
          >
            {shouldError ? '修复错误' : '触发错误'}
          </button>
        </div>
        
        <ErrorBoundary>
          <BuggyComponent shouldError={shouldError} />
        </ErrorBoundary>
      </div>

      <div className="code-example">
        <h4>错误边界代码:</h4>
        <pre>{`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('捕获到错误:', error)
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了！</h1>
    }
    return this.props.children
  }
}`}</pre>
      </div>
    </div>
  )
}

// 自定义Hook演示
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(c => c + 1), [])
  const decrement = useCallback(() => setCount(c => c - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, increment, decrement, reset }
}

function CustomHooksDemo() {
  const [name, setName] = useLocalStorage('userName', '')
  const { count, increment, decrement, reset } = useCounter(0)

  return (
    <div className="custom-hooks-demo">
      <h3>🎣 自定义Hook演示</h3>
      
      <div className="demo-section">
        <h4>useLocalStorage Hook</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入你的名字（会保存到localStorage）"
          className="demo-input"
        />
        <p>保存的名字: {name}</p>
        <p className="hook-note">
          💡 刷新页面后名字仍然会保留
        </p>
      </div>

      <div className="demo-section">
        <h4>useCounter Hook</h4>
        <div className="counter-display">{count}</div>
        <div className="counter-controls">
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
          <button onClick={reset}>重置</button>
        </div>
        <p className="hook-note">
          💡 封装了计数器的所有逻辑，可以在多个组件中复用
        </p>
      </div>

      <div className="code-example">
        <h4>自定义Hook代码:</h4>
        <pre>{`function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}`}</pre>
      </div>
    </div>
  )
}

function Advanced() {
  const [activeDemo, setActiveDemo] = useState('performance')
  const { theme } = useTheme()

  const demos = [
    { id: 'performance', name: '性能优化', icon: '⚡', component: PerformanceDemo },
    { id: 'code-splitting', name: '代码分割', icon: '📦', component: CodeSplittingDemo },
    { id: 'error-boundary', name: '错误边界', icon: '🚨', component: ErrorBoundaryDemo },
    { id: 'custom-hooks', name: '自定义Hook', icon: '🎣', component: CustomHooksDemo }
  ]

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || PerformanceDemo

  return (
    <div className="advanced-page">
      {/* 页面标题 */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">🚀 高级概念</h1>
        <p className="page-description">
          深入学习React的高级特性，掌握性能优化和最佳实践
        </p>
      </motion.div>

      {/* 演示导航 */}
      <motion.div
        className="demo-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {demos.map((demo, index) => (
          <motion.button
            key={demo.id}
            className={`demo-tab ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="demo-icon">{demo.icon}</span>
            <span className="demo-name">{demo.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* 演示内容 */}
      <motion.div
        className="demo-content"
        key={activeDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ActiveComponent />
      </motion.div>

      {/* 最佳实践 */}
      <motion.div
        className="best-practices"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>💡 最佳实践</h2>
        <div className="practices-grid">
          <div className="practice-card">
            <h3>⚡ 性能优化</h3>
            <ul>
              <li>使用React.memo避免不必要的重渲染</li>
              <li>用useMemo缓存昂贵的计算结果</li>
              <li>用useCallback稳定函数引用</li>
              <li>合理使用代码分割减少包大小</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h3>🛡️ 错误处理</h3>
            <ul>
              <li>使用错误边界捕获组件错误</li>
              <li>提供友好的错误提示界面</li>
              <li>记录错误信息用于调试</li>
              <li>实现错误恢复机制</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h3>🎣 Hook设计</h3>
            <ul>
              <li>遵循Hook命名规范（use开头）</li>
              <li>将相关逻辑封装到自定义Hook</li>
              <li>保持Hook的单一职责</li>
              <li>提供清晰的API接口</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <h3>📦 代码组织</h3>
            <ul>
              <li>按功能模块组织代码结构</li>
              <li>使用懒加载优化首屏加载</li>
              <li>合理拆分组件避免过度复杂</li>
              <li>建立统一的代码规范</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* 学习资源 */}
      <motion.div
        className="learning-resources"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2>📚 进阶学习资源</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>📖 官方文档</h3>
            <ul>
              <li>React官方文档</li>
              <li>React DevTools</li>
              <li>Create React App</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h3>🛠️ 开发工具</h3>
            <ul>
              <li>React Developer Tools</li>
              <li>React Profiler</li>
              <li>Bundle Analyzer</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h3>📚 推荐书籍</h3>
            <ul>
              <li>《React技术揭秘》</li>
              <li>《深入React技术栈》</li>
              <li>《React设计模式》</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h3>🎯 实践项目</h3>
            <ul>
              <li>Todo应用进阶版</li>
              <li>博客系统</li>
              <li>电商网站</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Advanced