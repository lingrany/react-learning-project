import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite配置文件 - 用于构建和开发服务器
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: false
  }
})
