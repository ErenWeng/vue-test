import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // WSL2 not update: https://cn.vitejs.dev/guide/troubleshooting.html#vite-does-not-detect-a-file-change
  server: {
    watch: {
      usePolling: true
    }
  }
})
