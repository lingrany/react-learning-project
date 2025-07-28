import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Styling.css'

// 主题预设
const themePresets = [
  {
    id: 'default',
    name: '默认主题',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    }
  },
  {
    id: 'ocean',
    name: '海洋主题',
    colors: {
      primary: '#00c6ff',
      secondary: '#0072ff',
      background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    }
  },
  {
    id: 'sunset',
    name: '日落主题',
    colors: {
      primary: '#ff7e5f',
      secondary: '#feb47b',
      background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    }
  },
  {
    id: 'forest',
    name: '森林主题',
    colors: {
      primary: '#11998e',
      secondary: '#38ef7d',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    }
  },
  {
    id: 'dark',
    name: '深色主题',
    colors: {
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
      cardBg: 'rgba(255, 255, 255, 0.05)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)'
    }
  },
  {
    id: 'light',
    name: '浅色主题',
    colors: {
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      cardBg: 'rgba(255, 255, 255, 0.8)',
      text: '#2d3436',
      textSecondary: '#636e72'
    }
  }
]

// CSS属性演示组件
function CSSPropertiesDemo() {
  const [selectedProperty, setSelectedProperty] = useState('flexbox')

  const cssProperties = [
    {
      id: 'flexbox',
      name: 'Flexbox布局',
      description: '灵活的一维布局方法',
      example: (
        <div className="flex-demo">
          <div className="flex-container">
            <div className="flex-item">项目1</div>
            <div className="flex-item">项目2</div>
            <div className="flex-item">项目3</div>
          </div>
          <div className="code-snippet">
            <pre>{`.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`}</pre>
          </div>
        </div>
      )
    },
    {
      id: 'grid',
      name: 'Grid布局',
      description: '强大的二维布局系统',
      example: (
        <div className="grid-demo">
          <div className="grid-container">
            <div className="grid-item">1</div>
            <div className="grid-item">2</div>
            <div className="grid-item">3</div>
            <div className="grid-item">4</div>
            <div className="grid-item">5</div>
            <div className="grid-item">6</div>
          </div>
          <div className="code-snippet">
            <pre>{`.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`}</pre>
          </div>
        </div>
      )
    },
    {
      id: 'animations',
      name: 'CSS动画',
      description: '流畅的过渡和动画效果',
      example: (
        <div className="animation-demo">
          <div className="animated-elements">
            <div className="bounce-element">弹跳</div>
            <div className="rotate-element">旋转</div>
            <div className="pulse-element">脉冲</div>
          </div>
          <div className="code-snippet">
            <pre>{`@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.bounce-element {
  animation: bounce 2s infinite;
}`}</pre>
          </div>
        </div>
      )
    },
    {
      id: 'gradients',
      name: '渐变效果',
      description: '美丽的颜色过渡效果',
      example: (
        <div className="gradient-demo">
          <div className="gradient-examples">
            <div className="gradient-1">线性渐变</div>
            <div className="gradient-2">径向渐变</div>
            <div className="gradient-3">圆锥渐变</div>
          </div>
          <div className="code-snippet">
            <pre>{`.gradient-1 {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.gradient-2 {
  background: radial-gradient(circle, #ff9a9e, #fecfef);
}`}</pre>
          </div>
        </div>
      )
    }
  ]

  const selectedDemo = cssProperties.find(prop => prop.id === selectedProperty)

  return (
    <div className="css-properties-demo">
      <h3>🎨 CSS属性演示</h3>
      
      <div className="property-tabs">
        {cssProperties.map(prop => (
          <button
            key={prop.id}
            className={`property-tab ${selectedProperty === prop.id ? 'active' : ''}`}
            onClick={() => setSelectedProperty(prop.id)}
          >
            {prop.name}
          </button>
        ))}
      </div>

      <div className="property-content">
        <div className="property-info">
          <h4>{selectedDemo.name}</h4>
          <p>{selectedDemo.description}</p>
        </div>
        <div className="property-example">
          {selectedDemo.example}
        </div>
      </div>
    </div>
  )
}

// 响应式设计演示
function ResponsiveDemo() {
  const [viewportSize, setViewportSize] = useState('desktop')

  const viewports = [
    { id: 'mobile', name: '手机', width: '375px', icon: '📱' },
    { id: 'tablet', name: '平板', width: '768px', icon: '📱' },
    { id: 'desktop', name: '桌面', width: '100%', icon: '💻' }
  ]

  return (
    <div className="responsive-demo">
      <h3>📱 响应式设计演示</h3>
      
      <div className="viewport-controls">
        {viewports.map(viewport => (
          <button
            key={viewport.id}
            className={`viewport-btn ${viewportSize === viewport.id ? 'active' : ''}`}
            onClick={() => setViewportSize(viewport.id)}
          >
            <span className="viewport-icon">{viewport.icon}</span>
            <span>{viewport.name}</span>
          </button>
        ))}
      </div>

      <div className="responsive-preview">
        <div 
          className={`preview-container ${viewportSize}`}
          style={{ maxWidth: viewports.find(v => v.id === viewportSize)?.width }}
        >
          <div className="responsive-layout">
            <header className="responsive-header">
              <h4>响应式网站</h4>
              <nav className="responsive-nav">
                <a href="#">首页</a>
                <a href="#">关于</a>
                <a href="#">联系</a>
              </nav>
            </header>
            <main className="responsive-main">
              <div className="responsive-content">
                <h5>主要内容</h5>
                <p>这是一个响应式布局的演示。内容会根据屏幕大小自动调整。</p>
              </div>
              <aside className="responsive-sidebar">
                <h6>侧边栏</h6>
                <ul>
                  <li>链接1</li>
                  <li>链接2</li>
                  <li>链接3</li>
                </ul>
              </aside>
            </main>
          </div>
        </div>
      </div>

      <div className="responsive-code">
        <h4>媒体查询示例:</h4>
        <pre>{`/* 手机端 */
@media (max-width: 768px) {
  .responsive-main {
    flex-direction: column;
  }
  
  .responsive-nav {
    display: none;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  .responsive-main {
    gap: 1rem;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .responsive-main {
    display: flex;
    gap: 2rem;
  }
}`}</pre>
      </div>
    </div>
  )
}

function Styling() {
  const [selectedTheme, setSelectedTheme] = useState('default')
  const { theme, toggleTheme } = useTheme()

  const applyTheme = (themePreset) => {
    const root = document.documentElement
    Object.entries(themePreset.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
    setSelectedTheme(themePreset.id)
  }

  return (
    <div className="styling-page">
      {/* 页面标题 */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">🎨 样式与主题</h1>
        <p className="page-description">
          探索CSS样式技巧、主题切换和响应式设计的实现方法
        </p>
      </motion.div>

      {/* 主题切换区域 */}
      <motion.div
        className="theme-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2>🌈 主题预设</h2>
        <div className="theme-grid">
          {themePresets.map((themePreset, index) => (
            <motion.div
              key={themePreset.id}
              className={`theme-card ${selectedTheme === themePreset.id ? 'active' : ''}`}
              onClick={() => applyTheme(themePreset)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="theme-preview"
                style={{ background: themePreset.colors.background }}
              >
                <div className="theme-elements">
                  <div 
                    className="theme-element primary"
                    style={{ backgroundColor: themePreset.colors.primary }}
                  ></div>
                  <div 
                    className="theme-element secondary"
                    style={{ backgroundColor: themePreset.colors.secondary }}
                  ></div>
                  <div 
                    className="theme-element card"
                    style={{ backgroundColor: themePreset.colors.cardBg }}
                  ></div>
                </div>
              </div>
              <div className="theme-info">
                <h3>{themePreset.name}</h3>
                <div className="theme-colors">
                  <span 
                    className="color-dot"
                    style={{ backgroundColor: themePreset.colors.primary }}
                  ></span>
                  <span 
                    className="color-dot"
                    style={{ backgroundColor: themePreset.colors.secondary }}
                  ></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CSS属性演示 */}
      <motion.div
        className="css-demo-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <CSSPropertiesDemo />
      </motion.div>

      {/* 响应式设计演示 */}
      <motion.div
        className="responsive-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <ResponsiveDemo />
      </motion.div>

      {/* 样式技巧 */}
      <motion.div
        className="styling-tips"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2>💡 样式技巧</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>🎯 CSS变量</h3>
            <p>使用CSS自定义属性创建可维护的主题系统</p>
            <div className="tip-example">
              <pre>{`:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}

.button {
  background: var(--primary-color);
}`}</pre>
            </div>
          </div>
          
          <div className="tip-card">
            <h3>📱 移动优先</h3>
            <p>从小屏幕开始设计，逐步增强到大屏幕</p>
            <div className="tip-example">
              <pre>{`/* 基础样式（移动端） */
.container {
  padding: 1rem;
}

/* 桌面端增强 */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
  }
}`}</pre>
            </div>
          </div>
          
          <div className="tip-card">
            <h3>🌟 现代CSS</h3>
            <p>使用现代CSS特性提升用户体验</p>
            <div className="tip-example">
              <pre>{`.card {
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}`}</pre>
            </div>
          </div>
          
          <div className="tip-card">
            <h3>♿ 无障碍设计</h3>
            <p>确保所有用户都能访问和使用你的网站</p>
            <div className="tip-example">
              <pre>{`/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid;
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}`}</pre>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 实用工具 */}
      <motion.div
        className="tools-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h2>🛠️ 实用工具推荐</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <h3>🎨 设计工具</h3>
            <ul>
              <li>Figma - 界面设计</li>
              <li>Adobe XD - 原型设计</li>
              <li>Sketch - Mac设计工具</li>
            </ul>
          </div>
          
          <div className="tool-card">
            <h3>🌈 颜色工具</h3>
            <ul>
              <li>Coolors.co - 配色方案</li>
              <li>Adobe Color - 色轮工具</li>
              <li>Contrast Checker - 对比度检查</li>
            </ul>
          </div>
          
          <div className="tool-card">
            <h3>📐 CSS工具</h3>
            <ul>
              <li>CSS Grid Generator - Grid布局</li>
              <li>Flexbox Froggy - Flexbox学习</li>
              <li>Can I Use - 兼容性查询</li>
            </ul>
          </div>
          
          <div className="tool-card">
            <h3>🚀 优化工具</h3>
            <ul>
              <li>PurgeCSS - CSS优化</li>
              <li>PostCSS - CSS处理</li>
              <li>Lighthouse - 性能检测</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Styling