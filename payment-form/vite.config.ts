import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  server: {
    host: 'localhost.com',
    port: 4200,
    strictPort: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      include: ['src/**'],
      exclude: ['src/vite-env.d.ts', 'src/main.tsx', 'src/reportWebVitals.ts', 'src/mocks'],
      reporter: ['text', 'json', 'html']
    },
    exclude: [...configDefaults.exclude, 'node_modules'],
    include: ['src/__tests__/*.{test,spec}.{js,ts,jsx,tsx}']
  }
});
