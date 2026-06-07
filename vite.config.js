import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(),tailwindcss()],
    base: "/my-love",
    server: {
      host: true,
    },
  };
});