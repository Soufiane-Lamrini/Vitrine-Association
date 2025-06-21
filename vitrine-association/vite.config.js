import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Plugin React obligatoire pour JSX
    tailwindcss(), // Plugin Tailwind
  ],
});