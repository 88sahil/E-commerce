import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'https://e-commerce-1-e86e.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
