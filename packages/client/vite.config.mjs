import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.mjs',
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: path.resolve(__dirname, '../../coverage/client'),
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.spec.{js,jsx}', 'test/**'],
    },
  },
})
