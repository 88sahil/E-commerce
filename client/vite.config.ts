import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'https://e-commerce-production-47b8.up.railway.app',
        changeOrigin: true,
      },
    },
  },
})
