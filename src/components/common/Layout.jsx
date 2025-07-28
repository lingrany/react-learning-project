import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../navigation/Sidebar'
import { useTheme } from '../../context/ThemeContext'
import './Layout.css'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme } = useTheme()

  // 响应式处理：在移动端默认收起侧边栏
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // 初始检查
    handleResize()

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`layout ${theme}`}>
      {/* 侧边栏 */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* 主内容区域 */}
      <motion.main
        className="main-content"
        animate={{
          marginLeft: window.innerWidth > 1024 ? (sidebarOpen ? '280px' : '80px') : '0',
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
      >
        {/* 移动端顶部栏 */}
        <div className="mobile-header">
          <button
            className="mobile-menu-btn"
            onClick={toggleSidebar}
            aria-label="打开菜单"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <div className="mobile-logo">
            <span className="mobile-logo-icon">⚛️</span>
            <span className="mobile-logo-text">React学习</span>
          </div>
        </div>

        {/* 页面内容 */}
        <div className="content-wrapper">
          <motion.div
            className="page-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>

        {/* 页脚 */}
        <footer className="layout-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>React学习项目</h4>
              <p>一个完整的React学习平台，帮助你掌握现代React开发</p>
            </div>
            
            <div className="footer-section">
              <h4>学习资源</h4>
              <ul>
                <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React官方文档</a></li>
                <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite构建工具</a></li>
                <li><a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer">Framer Motion</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>技术栈</h4>
              <ul>
                <li>React 18</li>
                <li>React Router</li>
                <li>Framer Motion</li>
                <li>CSS3 & 现代布局</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>联系方式</h4>
              <p>如有问题或建议，欢迎反馈</p>
              <div className="social-links">
                <a href="#" aria-label="GitHub">📧</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="LinkedIn">💼</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 React学习项目. 用于教育目的.</p>
            <p>Made with ❤️ for React learners</p>
          </div>
        </footer>
      </motion.main>
    </div>
  )
}

export default Layout