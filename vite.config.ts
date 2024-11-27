import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://base.yuanlei.tech:54574',
        changeOrigin: true,
      }
    }
  }
})