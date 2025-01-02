import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/* export default defineConfig({
  plugins: [react()],
})
 */

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
}});