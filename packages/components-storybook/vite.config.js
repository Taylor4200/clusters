import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  logLevel: 'info',
  server: {
    host: '0.0.0.0',
    port: 6007,
    allowedHosts: 'all'
  },
  resolve: {
    alias: {
      '$app/state': '/src/mocks/app-state.js',
      '$env/static/public': '/src/mocks/env-static-public.js',
    }
  },
  build: {
    assetsInlineLimit: Infinity,
    sourcemap: true,
    output: {
      sourcemap: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
