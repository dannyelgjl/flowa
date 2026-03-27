import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './__test__'),
    },
  },
  test: {
    css: true,
    environment: 'jsdom',
    setupFiles: './__test__/setup.ts',
  },
})
