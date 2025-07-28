import React from 'react'

function TestPage() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      color: '#333'
    }}>
      <h1>🎉 React应用正常运行!</h1>
      <p>如果你看到这个页面，说明React应用已经成功启动。</p>
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>测试功能</h2>
        <button 
          onClick={() => alert('按钮点击成功!')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          点击测试
        </button>
      </div>
    </div>
  )
}

export default TestPage