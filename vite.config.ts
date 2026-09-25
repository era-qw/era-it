import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' — относительные пути, чтобы сборка работала на GitHub Pages
// под любым именем репозитория (project pages) без правок.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
