import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
plugins: [swc.vite()],
  test: {
      globals: true,
      includeSource: [  
        'src/components/*/*.spec.{js,ts}' // Component testing
      ],
      exclude:  ['src/tests/e2e/*.spec.{js,ts}', 'node_modules', 'dist', '.idea', '.git', '.cache'],
    },
})