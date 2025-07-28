import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import './Components.css'

// 按钮组件演示
function ButtonDemo() {
  const [buttonStates, setButtonStates] = useState({
    primary: false,
    secondary: false,
    success: false,
    warning: false,
    danger: false
  })

  const handleButtonClick = (type) => {
    setButtonStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <div className="component-demo">
      <h3>🔘 按钮组件</h3>
      <div className="demo-showcase">
        <div className="button-grid">
          <button 
            className={`demo-btn primary ${buttonStates.primary ? 'active' : ''}`}
            onClick={() => handleButtonClick('primary')}
          >
            主要按钮
          </button>
          <button 
            className={`demo-btn secondary ${buttonStates.secondary ? 'active' : ''}`}
            onClick={() => handleButtonClick('secondary')}
          >
            次要按钮
          </button>
          <button 
            className={`demo-btn success ${buttonStates.success ? 'active' : ''}`}
            onClick={() => handleButtonClick('success')}
          >
            成功按钮
          </button>
          <button 
            className={`demo-btn warning ${buttonStates.warning ? 'active' : ''}`}
            onClick={() => handleButtonClick('warning')}
          >
            警告按钮
          </button>
          <button 
            className={`demo-btn danger ${buttonStates.danger ? 'active' : ''}`}
            onClick={() => handleButtonClick('danger')}
          >
            危险按钮
          </button>
        </div>
      </div>
      
      <div className="code-example">
        <h4>使用示例:</h4>
        <pre>{`<button className="demo-btn primary">
  主要按钮
</button>

<button className="demo-btn secondary">
  次要按钮
</button>`}</pre>
      </div>
    </div>
  )
}

// 输入框组件演示
function InputDemo() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    textarea: '',
    select: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="component-demo">
      <h3>📝 输入组件</h3>
      <div className="demo-showcase">
        <div className="input-grid">
          <div className="input-group">
            <label>文本输入</label>
            <input
              type="text"
              className="demo-input"
              placeholder="请输入文本"
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>邮箱输入</label>
            <input
              type="email"
              className="demo-input"
              placeholder="请输入邮箱"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>密码输入</label>
            <input
              type="password"
              className="demo-input"
              placeholder="请输入密码"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>下拉选择</label>
            <select
              className="demo-select"
              value={formData.select}
              onChange={(e) => handleInputChange('select', e.target.value)}
            >
              <option value="">请选择</option>
              <option value="option1">选项1</option>
              <option value="option2">选项2</option>
              <option value="option3">选项3</option>
            </select>
          </div>
          
          <div className="input-group full-width">
            <label>文本域</label>
            <textarea
              className="demo-textarea"
              placeholder="请输入多行文本"
              rows="4"
              value={formData.textarea}
              onChange={(e) => handleInputChange('textarea', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="form-preview">
        <h4>实时预览:</h4>
        <div className="preview-content">
          <p><strong>文本:</strong> {formData.text || '(空)'}</p>
          <p><strong>邮箱:</strong> {formData.email || '(空)'}</p>
          <p><strong>密码:</strong> {formData.password ? '●'.repeat(formData.password.length) : '(空)'}</p>
          <p><strong>选择:</strong> {formData.select || '(空)'}</p>
          <p><strong>文本域:</strong> {formData.textarea || '(空)'}</p>
        </div>
      </div>
    </div>
  )
}

// 卡片组件演示
function CardDemo() {
  const cards = [
    {
      id: 1,
      title: '基础卡片',
      content: '这是一个基础的卡片组件，包含标题和内容。',
      type: 'basic'
    },
    {
      id: 2,
      title: '图片卡片',
      content: '这是一个带图片的卡片组件。',
      type: 'image',
      image: '🖼️'
    },
    {
      id: 3,
      title: '操作卡片',
      content: '这是一个带操作按钮的卡片组件。',
      type: 'action'
    }
  ]

  return (
    <div className="component-demo">
      <h3>🃏 卡片组件</h3>
      <div className="demo-showcase">
        <div className="card-grid">
          {cards.map(card => (
            <div key={card.id} className={`demo-card ${card.type}`}>
              {card.image && (
                <div className="card-image">
                  <span className="image-placeholder">{card.image}</span>
                </div>
              )}
              <div className="card-content">
                <h4 className="card-title">{card.title}</h4>
                <p className="card-text">{card.content}</p>
                {card.type === 'action' && (
                  <div className="card-actions">
                    <button className="card-btn primary">确认</button>
                    <button className="card-btn secondary">取消</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 模态框组件演示
function ModalDemo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('basic')

  const openModal = (type) => {
    setModalType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="component-demo">
      <h3>🪟 模态框组件</h3>
      <div className="demo-showcase">
        <div className="modal-controls">
          <button 
            className="demo-btn primary"
            onClick={() => openModal('basic')}
          >
            基础模态框
          </button>
          <button 
            className="demo-btn secondary"
            onClick={() => openModal('confirm')}
          >
            确认模态框
          </button>
          <button 
            className="demo-btn warning"
            onClick={() => openModal('form')}
          >
            表单模态框
          </button>
        </div>
      </div>

      {/* 模态框 */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-header">
              <h4>
                {modalType === 'basic' && '基础模态框'}
                {modalType === 'confirm' && '确认操作'}
                {modalType === 'form' && '表单模态框'}
              </h4>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              {modalType === 'basic' && (
                <p>这是一个基础的模态框组件，用于显示简单的信息。</p>
              )}
              
              {modalType === 'confirm' && (
                <div>
                  <p>⚠️ 您确定要执行此操作吗？</p>
                  <p>此操作不可撤销。</p>
                </div>
              )}
              
              {modalType === 'form' && (
                <form className="modal-form">
                  <div className="form-group">
                    <label>姓名</label>
                    <input type="text" className="form-input" placeholder="请输入姓名" />
                  </div>
                  <div className="form-group">
                    <label>邮箱</label>
                    <input type="email" className="form-input" placeholder="请输入邮箱" />
                  </div>
                </form>
              )}
            </div>
            
            <div className="modal-footer">
              {modalType === 'basic' && (
                <button className="demo-btn primary" onClick={closeModal}>
                  知道了
                </button>
              )}
              
              {modalType === 'confirm' && (
                <>
                  <button className="demo-btn danger" onClick={closeModal}>
                    确认
                  </button>
                  <button className="demo-btn secondary" onClick={closeModal}>
                    取消
                  </button>
                </>
              )}
              
              {modalType === 'form' && (
                <>
                  <button className="demo-btn primary" onClick={closeModal}>
                    提交
                  </button>
                  <button className="demo-btn secondary" onClick={closeModal}>
                    取消
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// 加载动画组件演示
function LoadingDemo() {
  const [loadingStates, setLoadingStates] = useState({
    spinner: false,
    dots: false,
    progress: false
  })

  const toggleLoading = (type) => {
    setLoadingStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
    
    if (!loadingStates[type]) {
      setTimeout(() => {
        setLoadingStates(prev => ({
          ...prev,
          [type]: false
        }))
      }, 3000)
    }
  }

  return (
    <div className="component-demo">
      <h3>⏳ 加载组件</h3>
      <div className="demo-showcase">
        <div className="loading-grid">
          <div className="loading-item">
            <h4>旋转加载</h4>
            <div className="loading-container">
              {loadingStates.spinner ? (
                <div className="spinner-loading"></div>
              ) : (
                <button 
                  className="demo-btn primary"
                  onClick={() => toggleLoading('spinner')}
                >
                  开始加载
                </button>
              )}
            </div>
          </div>
          
          <div className="loading-item">
            <h4>点点加载</h4>
            <div className="loading-container">
              {loadingStates.dots ? (
                <div className="dots-loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <button 
                  className="demo-btn secondary"
                  onClick={() => toggleLoading('dots')}
                >
                  开始加载
                </button>
              )}
            </div>
          </div>
          
          <div className="loading-item">
            <h4>进度条</h4>
            <div className="loading-container">
              {loadingStates.progress ? (
                <div className="progress-loading">
                  <div className="progress-bar"></div>
                </div>
              ) : (
                <button 
                  className="demo-btn success"
                  onClick={() => toggleLoading('progress')}
                >
                  开始加载
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Components() {
  const { theme } = useTheme()

  return (
    <div className="components-page">
      {/* 页面标题 */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="page-title">🛠️ 组件库</h1>
        <p className="page-description">
          常用React组件的实现和使用示例，帮助你构建美观实用的用户界面
        </p>
      </motion.div>

      {/* 组件演示区域 */}
      <div className="components-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ButtonDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InputDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CardDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ModalDemo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <LoadingDemo />
        </motion.div>
      </div>

      {/* 组件使用指南 */}
      <motion.div
        className="usage-guide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2>📋 使用指南</h2>
        <div className="guide-grid">
          <div className="guide-card">
            <h3>🎨 设计原则</h3>
            <ul>
              <li>保持一致的视觉风格</li>
              <li>提供清晰的交互反馈</li>
              <li>支持键盘和触摸操作</li>
              <li>遵循无障碍设计标准</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h3>⚡ 性能优化</h3>
            <ul>
              <li>使用React.memo避免重渲染</li>
              <li>合理使用useCallback和useMemo</li>
              <li>懒加载大型组件</li>
              <li>优化CSS动画性能</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h3>🔧 最佳实践</h3>
            <ul>
              <li>组件职责单一明确</li>
              <li>提供完整的TypeScript类型</li>
              <li>编写详细的文档和示例</li>
              <li>进行充分的测试覆盖</li>
            </ul>
          </div>
          
          <div className="guide-card">
            <h3>📱 响应式设计</h3>
            <ul>
              <li>移动优先的设计理念</li>
              <li>灵活的布局系统</li>
              <li>适配不同屏幕尺寸</li>
              <li>优化触摸交互体验</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Components