import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173, // Ensure the same port is being used
    strictPort: true, // Ensures the server doesn't auto-switch ports
    hmr: {
      protocol: 'ws', // WebSocket protocol
      host: 'localhost',
      clientPort: 5173, // Ensure the same port is being used
    },
    watch: {
      usePolling: true, // Use polling for file watching
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
      '/login': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
      '/register': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})