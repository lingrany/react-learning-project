import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Sidebar.css'

// 导航菜单数据
const menuItems = [
  {
    path: '/',
    name: '首页',
    icon: '🏠',
    description: '项目介绍和快速开始'
  },
  {
    path: '/basics',
    name: '基础概念',
    icon: '📚',
    description: 'React核心概念学习'
  },
  {
    path: '/hooks',
    name: 'Hooks',
    icon: '🎣',
    description: 'React Hooks详解'
  },
  {
    path: '/components',
    name: '组件库',
    icon: '🛠️',
    description: '实用组件演示'
  },
  {
    path: '/interactive',
    name: '互动演示',
    icon: '🎮',
    description: '完整应用示例'
  },
  {
    path: '/styling',
    name: '样式主题',
    icon: '🎨',
    description: 'CSS样式和主题'
  },
  {
    path: '/advanced',
    name: '高级概念',
    icon: '🚀',
    description: '性能优化和最佳实践'
  }
]

function Sidebar({ isOpen, onToggle }) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <>
      {/* 移动端遮罩层 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* 侧边栏 */}
      <motion.aside
        className={`sidebar ${isOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{
          width: isOpen ? '280px' : '80px',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
      >
        {/* 侧边栏头部 */}
        <div className="sidebar-header">
          <motion.div
            className="logo"
            animate={{
              scale: isOpen ? 1 : 0.8,
              transition: { duration: 0.3 }
            }}
          >
            <span className="logo-icon">⚛️</span>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  className="logo-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  React学习
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={isOpen ? '收起侧边栏' : '展开侧边栏'}
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ◀
            </motion.span>
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path
              
              return (
                <motion.li
                  key={item.path}
                  className="nav-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    title={!isOpen ? item.name : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className="nav-content"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="nav-name">{item.name}</span>
                          <span className="nav-description">{item.description}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 活动指示器 */}
                    {isActive && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* 悬浮提示（收起状态） */}
                  <AnimatePresence>
                    {!isOpen && hoveredItem === item.path && (
                      <motion.div
                        className="nav-tooltip"
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="tooltip-content">
                          <div className="tooltip-name">{item.name}</div>
                          <div className="tooltip-description">{item.description}</div>
                        </div>
                        <div className="tooltip-arrow" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </ul>
        </nav>

        {/* 侧边栏底部 */}
        <div className="sidebar-footer">
          {/* 主题切换按钮 */}
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}
          >
            <span className="theme-icon">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  className="theme-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? '深色模式' : '浅色模式'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* 版本信息 */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="version-info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="version-text">React学习项目</div>
                <div className="version-number">v1.0.0</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar