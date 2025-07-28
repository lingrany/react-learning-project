import React, { useState, useEffect, useReducer, useContext, createContext } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Hooks.css'

// 创建一个简单的Context用于演示
const CountContext = createContext()

// useReducer的reducer函数
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

// Hook演示数据
const hookExamples = [
  {
    id: 'useState',
    title: 'useState - 状态管理',
    icon: '📊',
    description: '管理组件的本地状态，是最常用的Hook',
    code: `const [count, setCount] = useState(0)

const increment = () => {
  setCount(count + 1)
}

return (
  <div>
    <p>计数: {count}</p>
    <button onClick={increment}>增加</button>
  </div>
)`
  },
  {
    id: 'useEffect',
    title: 'useEffect - 副作用处理',
    icon: '⚡',
    description: '处理副作用，如API调用、订阅、定时器等',
    code: `useEffect(() => {
  // 组件挂载时执行
  document.title = \`计数: \${count}\`
  
  // 清理函数（可选）
  return () => {
    document.title = 'React学习项目'
  }
}, [count]) // 依赖数组`
  },
  {
    id: 'useReducer',
    title: 'useReducer - 复杂状态',
    icon: '🔄',
    description: '管理复杂的状态逻辑，类似Redux的reducer',
    code: `const [state, dispatch] = useReducer(reducer, initialState)

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}`
  },
  {
    id: 'useContext',
    title: 'useContext - 上下文',
    icon: '🌐',
    description: '在组件树中共享数据，避免props drilling',
    code: `const ThemeContext = createContext()

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  )
}

function Header() {
  const theme = useContext(ThemeContext)
  return <h1>当前主题: {theme}</h1>
}`
  }
]

// useState演示组件
function UseStateDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="hook-demo">
      <div className="demo-section">
        <h4>计数器演示</h4>
        <div className="counter-demo">
          <span className="count-display">{count}</span>
          <div className="counter-buttons">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(0)}>重置</button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>输入框演示</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入你的名字"
          className="demo-input"
        />
        {name && <p className="greeting">你好, {name}! 👋</p>}
      </div>

      <div className="demo-section">
        <h4>待办列表演示</h4>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="添加待办事项"
            className="demo-input"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo} className="add-btn">添加</button>
        </div>
        {todos.length > 0 && (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                <span className="todo-status">{todo.completed ? '✅' : '⏳'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// useEffect演示组件
function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // 定时器效果
  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // 窗口大小监听
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 文档标题更新
  useEffect(() => {
    document.title = `计时器: ${seconds}秒`
    return () => {
      document.title = 'React学习项目'
    }
  }, [seconds])

  return (
    <div className="hook-demo">
      <div className="demo-section">
        <h4>定时器演示</h4>
        <div className="timer-demo">
          <div className="timer-display">{seconds}秒</div>
          <div className="timer-buttons">
            <button onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? '暂停' : '开始'}
            </button>
            <button onClick={() => { setSeconds(0); setIsRunning(false) }}>
              重置
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>窗口大小监听</h4>
        <div className="window-info">
          <p>当前窗口宽度: <strong>{windowWidth}px</strong></p>
          <p className="tip">💡 试试调整浏览器窗口大小</p>
        </div>
      </div>
    </div>
  )
}

// useReducer演示组件
function UseReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div className="hook-demo">
      <div className="demo-section">
        <h4>useReducer计数器</h4>
        <div className="reducer-demo">
          <div className="count-display">{state.count}</div>
          <div className="reducer-buttons">
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
          </div>
        </div>
        <div className="action-log">
          <p>💡 useReducer适合管理复杂的状态逻辑</p>
        </div>
      </div>
    </div>
  )
}

// useContext演示组件
function UseContextDemo() {
  const [contextValue, setContextValue] = useState(42)

  return (
    <CountContext.Provider value={{ count: contextValue, setCount: setContextValue }}>
      <div className="hook-demo">
        <div className="demo-section">
          <h4>Context共享状态</h4>
          <ContextChild />
          <ContextGrandChild />
        </div>
      </div>
    </CountContext.Provider>
  )
}

function ContextChild() {
  const { count, setCount } = useContext(CountContext)
  
  return (
    <div className="context-component">
      <h5>子组件</h5>
      <p>从Context获取的值: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}

function ContextGrandChild() {
  const { count } = useContext(CountContext)
  
  return (
    <div className="context-component">
      <h5>孙组件</h5>
      <p>同样可以获取Context值: {count}</p>
      <p className="tip">💡 无需通过props层层传递</p>
    </div>
  )
}

function Hooks() {
  const [selectedHook, setSelectedHook] = useState('useState')
  const { theme } = useTheme()

  const selectedHookData = hookExamples.find(hook => hook.id === selectedHook)

  const renderDemo = () => {
    switch (selectedHook) {
      case 'useState':
        return <UseStateDemo />
      case 'useEffect':
        return <UseEffectDemo />
      case 'useReducer':
        return <UseReducerDemo />
      case 'useContext':
        return <UseContextDemo />
      default:
        return <UseStateDemo />
    }
  }

  return (
    <div className="hooks-page">
      {/* 页面标题 */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">🎣 React Hooks 演示</h1>
        <p className="page-description">
          深入学习React Hooks，掌握现代React开发的核心技能
        </p>
      </motion.div>

      {/* Hook导航 */}
      <motion.div
        className="hooks-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {hookExamples.map((hook, index) => (
          <motion.button
            key={hook.id}
            className={`hook-tab ${selectedHook === hook.id ? 'active' : ''}`}
            onClick={() => setSelectedHook(hook.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="hook-icon">{hook.icon}</span>
            <span className="hook-name">{hook.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Hook详情和演示 */}
      <motion.div
        className="hook-content"
        key={selectedHook}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="hook-info">
          <div className="hook-header">
            <span className="hook-icon-large">{selectedHookData.icon}</span>
            <div>
              <h2 className="hook-title">{selectedHookData.title}</h2>
              <p className="hook-description">{selectedHookData.description}</p>
            </div>
          </div>
          
          <div className="code-example">
            <h3>代码示例:</h3>
            <pre><code>{selectedHookData.code}</code></pre>
          </div>
        </div>

        <div className="hook-demo-container">
          <h3>实际演示:</h3>
          {renderDemo()}
        </div>
      </motion.div>

      {/* Hook使用要点 */}
      <motion.div
        className="hook-tips"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>💡 Hook使用要点</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>🔄 Hook规则</h3>
            <ul>
              <li>只在函数组件顶层调用Hook</li>
              <li>不要在循环、条件或嵌套函数中调用</li>
              <li>Hook名称以"use"开头</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>⚡ 性能优化</h3>
            <ul>
              <li>useEffect依赖数组要准确</li>
              <li>避免不必要的重新渲染</li>
              <li>使用useMemo和useCallback优化</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>🎯 最佳实践</h3>
            <ul>
              <li>自定义Hook复用逻辑</li>
              <li>状态尽量保持简单</li>
              <li>合理使用useReducer管理复杂状态</li>
            </ul>
          </div>
          <div className="tip-card">
            <h3>🐛 常见错误</h3>
            <ul>
              <li>忘记清理副作用</li>
              <li>依赖数组不完整</li>
              <li>在条件语句中使用Hook</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hooks