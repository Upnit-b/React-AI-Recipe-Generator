import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/hf-inference': {
        target: 'https://router.huggingface.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf-inference/, '/hf-inference'),
      },
    },
  },
  plugins: [react()],
})

// export default defineConfig({
//   server: {
//     proxy: {
//       '/hf-inference': {
//         target: 'https://router.huggingface.co',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/hf-inference/, '/hf-inference'),
//       },
//     },
//   },
// });
