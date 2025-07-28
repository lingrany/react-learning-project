import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Home.css'

// 特色功能数据
const features = [
  {
    icon: '🎯',
    title: '循序渐进',
    description: '从基础概念到高级技巧，系统化学习React',
    color: '#4CAF50'
  },
  {
    icon: '💡',
    title: '实战演示',
    description: '丰富的交互式示例，边学边练',
    color: '#2196F3'
  },
  {
    icon: '🛠',
    title: '实用组件',
    description: '可复用的组件库，直接应用到项目中',
    color: '#FF9800'
  },
  {
    icon: '🎨',
    title: '美观界面',
    description: '现代化设计，多主题支持',
    color: '#E91E63'
  }
]

// 学习路径数据
const learningPath = [
  {
    step: 1,
    title: '基础概念',
    description: '了解React组件、JSX、Props等核心概念',
    path: '/basics',
    icon: '📚',
    estimated: '30分钟'
  },
  {
    step: 2,
    title: 'Hooks深入',
    description: '掌握useState、useEffect等React Hooks',
    path: '/hooks',
    icon: '🎣',
    estimated: '45分钟'
  },
  {
    step: 3,
    title: '实用组件',
    description: '学习常用组件的设计和实现',
    path: '/components',
    icon: '🛠',
    estimated: '60分钟'
  },
  {
    step: 4,
    title: '交互应用',
    description: '构建完整的交互式应用',
    path: '/interactive',
    icon: '🎮',
    estimated: '90分钟'
  },
  {
    step: 5,
    title: '样式主题',
    description: '掌握样式处理和主题系统',
    path: '/styling',
    icon: '🎨',
    estimated: '45分钟'
  },
  {
    step: 6,
    title: '高级概念',
    description: '性能优化和最佳实践',
    path: '/advanced',
    icon: '🚀',
    estimated: '75分钟'
  }
]

// 统计数据
const stats = [
  { number: '7', label: '学习模块', icon: '📚' },
  { number: '30+', label: '实战示例', icon: '💡' },
  { number: '20+', label: '可复用组件', icon: '🛠' },
  { number: '4', label: '主题选择', icon: '🎨' }
]

function Home() {
  const { theme } = useTheme()

  return (
    <div className="home-page">
      {/* 英雄区域 */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-icon"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ⚛️
          </motion.div>
          
          <h1 className="hero-title">
            欢迎来到
            <span className="highlight"> React 学习平台</span>
          </h1>
          
          <p className="hero-description">
            这是一个专为初学者设计的完整React学习项目，包含了从基础概念到高级技巧的全面内容。
            通过丰富的交互式示例和实战项目，帮助你快速掌握React开发技能。
          </p>
          
          <div className="hero-actions">
            <Link to="/basics" className="cta-button primary">
              🚀 开始学习
            </Link>
            <Link to="/interactive" className="cta-button secondary">
              🎮 查看演示
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 统计数据 */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 特色功能 */}
      <section className="features-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌟 项目特色
        </motion.h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div 
                className="feature-icon"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 学习路径 */}
      <section className="learning-path-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🗺️ 学习路径
        </motion.h2>
        
        <div className="learning-path">
          {learningPath.map((item, index) => (
            <motion.div
              key={index}
              className="path-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="path-step">
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
              </div>
              
              <div className="path-content">
                <h3 className="path-title">{item.title}</h3>
                <p className="path-description">{item.description}</p>
                <div className="path-meta">
                  <span className="estimated-time">⏱️ 预计 {item.estimated}</span>
                  <Link to={item.path} className="path-link">
                    开始学习 →
                  </Link>
                </div>
              </div>
              
              {index < learningPath.length - 1 && (
                <div className="path-connector"></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 快速开始 */}
      <section className="quick-start-section">
        <motion.div
          className="quick-start-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="quick-start-title">🚀 快速开始</h2>
          <p className="quick-start-description">
            准备好开始你的React学习之旅了吗？选择一个适合你的起点：
          </p>
          
          <div className="quick-start-options">
            <Link to="/basics" className="quick-option">
              <div className="option-icon">🔰</div>
              <div className="option-content">
                <h3>我是新手</h3>
                <p>从基础概念开始学习</p>
              </div>
            </Link>
            
            <Link to="/hooks" className="quick-option">
              <div className="option-icon">⚡</div>
              <div className="option-content">
                <h3>有一些基础</h3>
                <p>直接学习React Hooks</p>
              </div>
            </Link>
            
            <Link to="/interactive" className="quick-option">
              <div className="option-icon">🎯</div>
              <div className="option-content">
                <h3>想看实战项目</h3>
                <p>查看完整应用示例</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home