import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'https://e-commerce-production-47b8.up.railway.app',
=======
        target: 'https://e-commerce-1-e86e.onrender.com',
>>>>>>> b2d04bcbeabf4e45f47ac42ea9e226227a97e4b7
        changeOrigin: true,
      },
    },
  },
})
