import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      // Encaminha as chamadas da API didática para o servidor local
      // (npm run dev:api). Sem ele, o frontend usa a cópia local do catálogo.
      '/api': 'http://localhost:3001',
    },
  },
})
