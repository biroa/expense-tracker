import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
