import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target:"http://13.211.135.249:8000",
        changeOrigin: true,
      },
    },
  },
})
