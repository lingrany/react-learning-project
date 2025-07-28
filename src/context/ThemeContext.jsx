import React, { createContext, useContext, useState, useEffect } from 'react'

// 创建主题上下文
const ThemeContext = createContext()

// 主题提供者组件
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // 从localStorage加载主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // 检测系统主题偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // 应用主题到文档根元素
  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.style.setProperty('--color-primary', '#6c5ce7')
      root.style.setProperty('--color-secondary', '#a29bfe')
      root.style.setProperty('--color-background', 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)')
      root.style.setProperty('--color-cardBg', 'rgba(255, 255, 255, 0.05)')
      root.style.setProperty('--color-text', '#ffffff')
      root.style.setProperty('--color-textSecondary', 'rgba(255, 255, 255, 0.7)')
      root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)')
    } else {
      root.style.setProperty('--color-primary', '#667eea')
      root.style.setProperty('--color-secondary', '#764ba2')
      root.style.setProperty('--color-background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
      root.style.setProperty('--color-cardBg', 'rgba(255, 255, 255, 0.1)')
      root.style.setProperty('--color-text', '#ffffff')
      root.style.setProperty('--color-textSecondary', 'rgba(255, 255, 255, 0.8)')
      root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.2)')
    }
    
    // 保存主题设置到localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // 切换主题函数
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // 设置特定主题
  const setSpecificTheme = (newTheme) => {
    setTheme(newTheme)
  }

  const value = {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// 使用主题的Hook
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme必须在ThemeProvider内部使用')
  }
  return context
}

export default ThemeContext