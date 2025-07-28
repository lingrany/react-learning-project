import React, { useState, useEffect, useReducer } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Interactive.css'

// 计算器reducer
function calculatorReducer(state, action) {
  switch (action.type) {
    case 'SET_DISPLAY':
      return { ...state, display: action.payload }
    case 'SET_PREVIOUS':
      return { ...state, previous: action.payload }
    case 'SET_OPERATION':
      return { ...state, operation: action.payload }
    case 'CLEAR':
      return { display: '0', previous: null, operation: null }
    default:
      return state
  }
}

// 待办事项reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed)
    default:
      return state
  }
}

// 计算器组件
function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, {
    display: '0',
    previous: null,
    operation: null
  })

  const inputNumber = (num) => {
    if (state.display === '0') {
      dispatch({ type: 'SET_DISPLAY', payload: num })
    } else {
      dispatch({ type: 'SET_DISPLAY', payload: state.display + num })
    }
  }

  const inputOperation = (nextOperation) => {
    if (state.previous === null) {
      dispatch({ type: 'SET_PREVIOUS', payload: state.display })
    } else if (state.operation) {
      const result = calculate()
      dispatch({ type: 'SET_DISPLAY', payload: String(result) })
      dispatch({ type: 'SET_PREVIOUS', payload: String(result) })
    }
    
    dispatch({ type: 'SET_DISPLAY', payload: '0' })
    dispatch({ type: 'SET_OPERATION', payload: nextOperation })
  }

  const calculate = () => {
    const prev = parseFloat(state.previous)
    const current = parseFloat(state.display)
    
    switch (state.operation) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return prev / current
      default:
        return current
    }
  }

  const performCalculation = () => {
    if (state.previous !== null && state.operation) {
      const result = calculate()
      dispatch({ type: 'SET_DISPLAY', payload: String(result) })
      dispatch({ type: 'SET_PREVIOUS', payload: null })
      dispatch({ type: 'SET_OPERATION', payload: null })
    }
  }

  const clear = () => {
    dispatch({ type: 'CLEAR' })
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        {state.display}
      </div>
      <div className="calculator-buttons">
        <button onClick={clear} className="calc-btn clear">C</button>
        <button onClick={() => inputOperation('÷')} className="calc-btn operation">÷</button>
        <button onClick={() => inputOperation('×')} className="calc-btn operation">×</button>
        <button onClick={() => inputOperation('-')} className="calc-btn operation">-</button>
        
        <button onClick={() => inputNumber('7')} className="calc-btn">7</button>
        <button onClick={() => inputNumber('8')} className="calc-btn">8</button>
        <button onClick={() => inputNumber('9')} className="calc-btn">9</button>
        <button onClick={() => inputOperation('+')} className="calc-btn operation" rowSpan="2">+</button>
        
        <button onClick={() => inputNumber('4')} className="calc-btn">4</button>
        <button onClick={() => inputNumber('5')} className="calc-btn">5</button>
        <button onClick={() => inputNumber('6')} className="calc-btn">6</button>
        
        <button onClick={() => inputNumber('1')} className="calc-btn">1</button>
        <button onClick={() => inputNumber('2')} className="calc-btn">2</button>
        <button onClick={() => inputNumber('3')} className="calc-btn">3</button>
        <button onClick={performCalculation} className="calc-btn equals" rowSpan="2">=</button>
        
        <button onClick={() => inputNumber('0')} className="calc-btn zero">0</button>
        <button onClick={() => inputNumber('.')} className="calc-btn">.</button>
      </div>
    </div>
  )
}

// 待办事项应用
function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue.trim() })
      setInputValue('')
    }
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="todo-app">
      <div className="todo-header">
        <h3>📝 待办事项</h3>
        <div className="todo-input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新的待办事项..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-todo-btn">
            添加
          </button>
        </div>
      </div>

      <div className="todo-filters">
        <button
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          全部 ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        >
          进行中 ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          已完成 ({completedCount})
        </button>
      </div>

      <div className="todo-list">
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
              </div>
              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="delete-todo-btn"
              >
                🗑️
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {completedCount > 0 && (
        <div className="todo-actions">
          <button
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            className="clear-completed-btn"
          >
            清除已完成 ({completedCount})
          </button>
        </div>
      )}
    </div>
  )
}

// 天气查询组件
function WeatherApp() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState('')

  // 模拟天气数据
  const mockWeatherData = {
    '北京': { temp: 22, condition: '晴天', icon: '☀️', humidity: 45, wind: '微风' },
    '上海': { temp: 26, condition: '多云', icon: '⛅', humidity: 60, wind: '东风' },
    '广州': { temp: 28, condition: '小雨', icon: '🌧️', humidity: 75, wind: '南风' },
    '深圳': { temp: 29, condition: '晴天', icon: '☀️', humidity: 55, wind: '微风' },
    '杭州': { temp: 24, condition: '阴天', icon: '☁️', humidity: 65, wind: '北风' }
  }

  const searchWeather = async () => {
    if (!city.trim()) return

    setLoading(true)
    
    // 模拟API调用延迟
    setTimeout(() => {
      const weatherData = mockWeatherData[city] || {
        temp: Math.floor(Math.random() * 20) + 15,
        condition: '未知',
        icon: '❓',
        humidity: Math.floor(Math.random() * 50) + 30,
        wind: '微风'
      }
      
      setWeather({ ...weatherData, city })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="weather-app">
      <div className="weather-header">
        <h3>🌤️ 天气查询</h3>
        <div className="weather-search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
            placeholder="输入城市名称..."
            className="weather-input"
          />
          <button onClick={searchWeather} className="search-btn" disabled={loading}>
            {loading ? '查询中...' : '查询'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>正在查询天气信息...</p>
        </div>
      )}

      {weather && !loading && (
        <motion.div
          className="weather-result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="weather-main">
            <div className="weather-icon">{weather.icon}</div>
            <div className="weather-info">
              <h4>{weather.city}</h4>
              <div className="temperature">{weather.temp}°C</div>
              <div className="condition">{weather.condition}</div>
            </div>
          </div>
          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">湿度</span>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">风力</span>
              <span className="detail-value">{weather.wind}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="weather-suggestions">
        <p>💡 试试搜索: 北京、上海、广州、深圳、杭州</p>
      </div>
    </div>
  )
}

// 购物车组件
function ShoppingCart() {
  const [items, setItems] = useState([])
  const [products] = useState([
    { id: 1, name: 'iPhone 15', price: 5999, image: '📱' },
    { id: 2, name: 'MacBook Pro', price: 12999, image: '💻' },
    { id: 3, name: 'AirPods Pro', price: 1999, image: '🎧' },
    { id: 4, name: 'iPad Air', price: 4599, image: '📱' },
    { id: 5, name: 'Apple Watch', price: 2999, image: '⌚' }
  ])

  const addToCart = (product) => {
    const existingItem = items.find(item => item.id === product.id)
    if (existingItem) {
      setItems(items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setItems([...items, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setItems(items.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setItems(items.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shopping-cart">
      <div className="products-section">
        <h3>🛍️ 商品列表</h3>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="product-price">¥{product.price}</div>
                <button
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  加入购物车
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h3>🛒 购物车 ({totalItems})</h3>
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>购物车是空的</p>
            <p>快去添加一些商品吧！</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-image">{item.image}</span>
                    <div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">¥{item.price}</div>
                    </div>
                  </div>
                  <div className="item-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="total-price">
                总计: ¥{totalPrice.toLocaleString()}
              </div>
              <button className="checkout-btn">
                结算 ({totalItems} 件商品)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Interactive() {
  const [activeDemo, setActiveDemo] = useState('calculator')
  const { theme } = useTheme()

  const demos = [
    { id: 'calculator', name: '计算器', icon: '🧮', component: Calculator },
    { id: 'todo', name: '待办事项', icon: '📝', component: TodoApp },
    { id: 'weather', name: '天气查询', icon: '🌤️', component: WeatherApp },
    { id: 'shopping', name: '购物车', icon: '🛒', component: ShoppingCart }
  ]

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || Calculator

  return (
    <div className="interactive-page">
      {/* 页面标题 */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">🎮 互动演示</h1>
        <p className="page-description">
          体验完整的React应用示例，学习实际开发中的常见功能实现
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

      {/* 技术要点 */}
      <motion.div
        className="tech-points"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>💡 技术要点</h2>
        <div className="points-grid">
          <div className="point-card">
            <h3>🎣 Hooks应用</h3>
            <p>useState、useEffect、useReducer等Hooks的实际应用</p>
          </div>
          <div className="point-card">
            <h3>🎨 动画效果</h3>
            <p>使用Framer Motion实现流畅的页面动画和交互效果</p>
          </div>
          <div className="point-card">
            <h3>📱 响应式设计</h3>
            <p>适配不同屏幕尺寸，提供良好的移动端体验</p>
          </div>
          <div className="point-card">
            <h3>🔄 状态管理</h3>
            <p>复杂状态的管理和组件间的数据流动</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Interactive