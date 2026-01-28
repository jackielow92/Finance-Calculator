import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/Finance-Calculator/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pcb-data': ['./src/data/pcb-table-data'],
          'chart': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
})
