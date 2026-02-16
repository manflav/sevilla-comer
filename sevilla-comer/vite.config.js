import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/donde-comer/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})