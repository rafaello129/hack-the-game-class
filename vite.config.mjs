import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages publishes this repository under /hack-the-game-class/.
  // Local development remains at /.
  base: process.env.GITHUB_ACTIONS ? '/hack-the-game-class/' : '/'
});
