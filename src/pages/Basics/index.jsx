import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Basics.css'

// 基础概念数据
const concepts = [
  {
    id: 'components',
    title: '组件 (Components)',
    icon: '🧩',
    description: 'React应用的基本构建块，可以复用的UI片段',
    example: `function Welcome(props) {
  return <h1>你好, {props.name}!</h1>
}

// 使用组件
<Welcome name="小明" />`
  },
  {
    id: 'jsx',
    title: 'JSX语法',
    icon: '📝',
    description: 'JavaScript的语法扩展，让你在JS中写HTML',
    example: `const element = (
  <div className="greeting">
    <h1>Hello, World!</h1>
    <p>欢迎学习React!</p>
  </div>
)`
  },
  {
    id: 'props',
    title: 'Props属性',
    icon: '📦',
    description: '组件间传递数据的方式，类似函数参数',
    example: `function UserCard({ name, age, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>年龄: {age}</p>
    </div>
  )
}`
  },
  {
    id: 'events',
    title: '事件处理',
    icon: '⚡',
    description: '处理用户交互，如点击、输入等',
    example: `function Button() {
  const handleClick = () => {
    alert('按钮被点击了!')
  }
  
  return (
    <button onClick={handleClick}>
      点击我
    </button>
  )
}`
  }
]

// 实际演示组件
function WelcomeDemo({ name }) {
  return (
    <div className="demo-component">
      <h3>你好, {name || '访客'}! 👋</h3>
      <p>这是一个简单的React组件演示</p>
    </div>
  )
}

function UserCardDemo({ name, age, role }) {
  return (
    <div className="user-card-demo">
      <div className="avatar">👤</div>
      <div className="user-info">
        <h4>{name}</h4>
        <p>年龄: {age}</p>
        <span className="role">{role}</span>
      </div>
    </div>
  )
}

function Basics() {
  const [selectedConcept, setSelectedConcept] = useState('components')
  const [userName, setUserName] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const { theme } = useTheme()

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1)
    alert(`按钮被点击了 ${clickCount + 1} 次!`)
  }

  const selectedConceptData = concepts.find(c => c.id === selectedConcept)

  return (
    <div className="basics-page">
      {/* 页面标题 */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">📚 React 基础概念</h1>
        <p className="page-description">
          掌握React的核心概念，为深入学习打下坚实基础
        </p>
      </motion.div>

      {/* 概念导航 */}
      <motion.div
        className="concepts-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {concepts.map((concept, index) => (
          <motion.button
            key={concept.id}
            className={`concept-tab ${selectedConcept === concept.id ? 'active' : ''}`}
            onClick={() => setSelectedConcept(concept.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="concept-icon">{concept.icon}</span>
            <span className="concept-name">{concept.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* 概念详情 */}
      <motion.div
        className="concept-detail"
        key={selectedConcept}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="concept-info">
          <div className="concept-header">
            <span className="concept-icon-large">{selectedConceptData.icon}</span>
            <div>
              <h2 className="concept-title">{selectedConceptData.title}</h2>
              <p className="concept-description">{selectedConceptData.description}</p>
            </div>
          </div>
          
          <div className="code-example">
            <h3>代码示例:</h3>
            <pre><code>{selectedConceptData.example}</code></pre>
          </div>
        </div>

        {/* 实际演示区域 */}
        <div className="live-demo">
          <h3>实际演示:</h3>
          
          {selectedConcept === 'components' && (
            <div className="demo-section">
              <h4>组件演示</h4>
              <WelcomeDemo name={userName || '小明'} />
              <p className="demo-note">
                💡 这个组件接收 name 属性并显示欢迎信息
              </p>
            </div>
          )}

          {selectedConcept === 'jsx' && (
            <div className="demo-section">
              <h4>JSX语法演示</h4>
              <div className="jsx-demo">
                <div className="greeting-card">
                  <h1>Hello, World! 🌍</h1>
                  <p>欢迎学习React!</p>
                  <div className="features">
                    <span className="feature">⚡ 快速</span>
                    <span className="feature">🔧 灵活</span>
                    <span className="feature">📱 现代</span>
                  </div>
                </div>
              </div>
              <p className="demo-note">
                💡 JSX让我们可以在JavaScript中写HTML结构
              </p>
            </div>
          )}

          {selectedConcept === 'props' && (
            <div className="demo-section">
              <h4>Props传递演示</h4>
              <div className="props-demo">
                <UserCardDemo name="张三" age={25} role="前端开发" />
                <UserCardDemo name="李四" age={30} role="后端开发" />
                <UserCardDemo name="王五" age={28} role="UI设计师" />
              </div>
              <p className="demo-note">
                💡 同一个组件通过不同的props显示不同的内容
              </p>
            </div>
          )}

          {selectedConcept === 'events' && (
            <div className="demo-section">
              <h4>事件处理演示</h4>
              <div className="events-demo">
                <button className="demo-button" onClick={handleButtonClick}>
                  点击我 ({clickCount})
                </button>
                <input
                  type="text"
                  placeholder="输入你的名字"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="demo-input"
                />
                {userName && (
                  <p className="input-feedback">你好, {userName}! 👋</p>
                )}
              </div>
              <p className="demo-note">
                💡 React通过事件处理函数响应用户交互
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 学习要点 */}
      <motion.div
        className="learning-points"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>🎯 学习要点</h2>
        <div className="points-grid">
          <div className="point-card">
            <h3>🧩 组件化思维</h3>
            <p>将UI拆分成独立、可复用的组件，每个组件负责一个功能</p>
          </div>
          <div className="point-card">
            <h3>📝 JSX语法</h3>
            <p>熟练使用JSX语法，理解它是JavaScript的语法糖</p>
          </div>
          <div className="point-card">
            <h3>📦 数据流动</h3>
            <p>理解props的单向数据流，父组件向子组件传递数据</p>
          </div>
          <div className="point-card">
            <h3>⚡ 事件处理</h3>
            <p>掌握React事件系统，处理用户交互和状态更新</p>
          </div>
        </div>
      </motion.div>

      {/* 练习建议 */}
      <motion.div
        className="practice-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2>💪 练习建议</h2>
        <div className="practice-list">
          <div className="practice-item">
            <span className="practice-number">1</span>
            <div className="practice-content">
              <h4>创建简单组件</h4>
              <p>尝试创建一个显示个人信息的组件，包含姓名、年龄、职业等</p>
            </div>
          </div>
          <div className="practice-item">
            <span className="practice-number">2</span>
            <div className="practice-content">
              <h4>使用JSX表达式</h4>
              <p>在JSX中使用JavaScript表达式，如条件渲染、列表渲染等</p>
            </div>
          </div>
          <div className="practice-item">
            <span className="practice-number">3</span>
            <div className="practice-content">
              <h4>Props传递练习</h4>
              <p>创建父子组件，练习通过props传递不同类型的数据</p>
            </div>
          </div>
          <div className="practice-item">
            <span className="practice-number">4</span>
            <div className="practice-content">
              <h4>事件处理实践</h4>
              <p>添加各种事件处理器，如点击、输入、提交等</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Basics