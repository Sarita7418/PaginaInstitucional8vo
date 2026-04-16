// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',   // 👈 CAMBIA ESTO

  vite: {
    plugins: [tailwindcss()]
  }
});
