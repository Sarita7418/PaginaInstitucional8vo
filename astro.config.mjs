// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static', // Tu nueva configuración de servidor
  vite: {
    // @ts-ignore - Silencia el falso error de tipos entre Astro y Tailwind
    plugins: [tailwindcss()]
  }
});