import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import ErrorBoundary from './components/common/ErrorBoundary'

// 简化的导航栏
function SimpleNavbar() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav style={{
      padding: '10px 20px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 首页</Link>
        <Link to="/basics" style={{ color: 'white', textDecoration: 'none' }}>📚 基础</Link>
        <Link to="/hooks" style={{ color: 'white', textDecoration: 'none' }}>🎣 Hooks</Link>
        <Link to="/interactive" style={{ color: 'white', textDecoration: 'none' }}>🎮 演示</Link>
      </div>
      <button 
        onClick={toggleTheme}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'} 切换主题
      </button>
    </nav>
  )
}

// 简化的首页
function SimpleHome() {
  return (
    <div>
      <SimpleNavbar />
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉 React学习项目</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>
          一个完整的React学习平台，帮助你掌握现代React开发
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h3>📚 基础概念</h3>
            <p>学习React组件、JSX、Props等核心概念</p>
            <Link to="/basics" style={{ color: 'white', textDecoration: 'underline' }}>开始学习 →</Link>
          </div>
          
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h3>🎣 React Hooks</h3>
            <p>掌握useState、useEffect等现代React特性</p>
            <Link to="/hooks" style={{ color: 'white', textDecoration: 'underline' }}>开始学习 →</Link>
          </div>
          
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h3>🎮 交互演示</h3>
            <p>体验完整的React应用示例</p>
            <Link to="/interactive" style={{ color: 'white', textDecoration: 'underline' }}>查看演示 →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// 简化的基础概念页面
function SimpleBasics() {
  return (
    <div>
      <SimpleNavbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>📚 React 基础概念</h1>
        <p>掌握React的核心概念，为深入学习打下坚实基础</p>
        
        <div style={{ marginTop: '30px' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <h2>🧩 组件 (Components)</h2>
            <p>React应用的基本构建块，可以复用的UI片段</p>
            <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontFamily: 'monospace' }}>
              <pre style={{ margin: 0, color: '#fff' }}>{`function Welcome(props) {
  return <h1>你好, {props.name}!</h1>
}

// 使用组件
<Welcome name="小明" />`}</pre>
            </div>
          </div>
          
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <h2>📝 JSX语法</h2>
            <p>JavaScript的语法扩展，让你在JS中写HTML</p>
            <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontFamily: 'monospace' }}>
              <pre style={{ margin: 0, color: '#fff' }}>{`const element = (
  <div className="greeting">
    <h1>Hello, World!</h1>
    <p>欢迎学习React!</p>
  </div>
)`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 简化的Hooks页面
function SimpleHooks() {
  const [count, setCount] = React.useState(0)
  const [name, setName] = React.useState('')
  
  return (
    <div>
      <SimpleNavbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>🎣 React Hooks</h1>
        <p>学习现代React的状态管理和副作用处理</p>
        
        <div style={{ marginTop: '30px' }}>
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <h2>useState - 状态管理</h2>
            <p>管理组件的状态数据</p>
            <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
              <p>计数器: {count}</p>
              <button 
                onClick={() => setCount(count + 1)}
                style={{ marginRight: '10px', padding: '5px 10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                增加
              </button>
              <button 
                onClick={() => setCount(count - 1)}
                style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                减少
              </button>
            </div>
          </div>
          
          <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <h2>表单处理</h2>
            <p>处理用户输入和表单数据</p>
            <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
              <input
                type="text"
                placeholder="输入你的名字"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '8px', marginRight: '10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px' }}
              />
              {name && <p>你好, {name}! 👋</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 简化的交互演示页面
function SimpleInteractive() {
  const [todos, setTodos] = React.useState([])
  const [newTodo, setNewTodo] = React.useState('')
  
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
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  return (
    <div>
      <SimpleNavbar />
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>🎮 交互演示 - 待办事项</h1>
        <p>一个完整的React应用示例</p>
        
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="添加新的待办事项"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              style={{ flex: 1, padding: '8px', marginRight: '10px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px' }}
            />
            <button 
              onClick={addTodo}
              style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
            >
              添加
            </button>
          </div>
          
          <div>
            {todos.length === 0 ? (
              <p style={{ textAlign: 'center', opacity: 0.7 }}>还没有待办事项，添加一个吧！</p>
            ) : (
              todos.map(todo => (
                <div key={todo.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '10px', 
                  marginBottom: '10px', 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '4px',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.6 : 1
                }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ marginRight: '10px' }}
                  />
                  <span style={{ flex: 1 }}>{todo.text}</span>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    style={{ padding: '4px 8px', background: 'rgba(255,0,0,0.3)', border: '1px solid rgba(255,0,0,0.5)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    删除
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 布局组件
function Layout({ children }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {children}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<SimpleHome />} />
              <Route path="/basics" element={<SimpleBasics />} />
              <Route path="/hooks" element={<SimpleHooks />} />
              <Route path="/interactive" element={<SimpleInteractive />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
