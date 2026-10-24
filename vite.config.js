import { defineConfig } from 'vite'
import { resolve } from 'path'

// Multi-page app configuration: every HTML page is its own entry point.
export default defineConfig({
  root: '.',
  base: '/',
  server: { proxy: { '/api': 'http://localhost:5000', '/uploads': 'http://localhost:5000' } },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        scholarships: resolve(__dirname, 'scholarships.html'),
        details: resolve(__dirname, 'details.html'),
        apply: resolve(__dirname, 'apply.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        faq: resolve(__dirname, 'faq.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        error: resolve(__dirname, '404.html'),
      },
    },
  },
})
