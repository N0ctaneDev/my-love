import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';
import { _REPO } from './__config__';

export default defineConfig(() => {
  return {
    plugins: [react(),tailwindcss()],
    base: _REPO,
    server: {
      host: true,
    },
  };
});