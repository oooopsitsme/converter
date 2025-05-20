import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  splitting: false,
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  bundle: false,
});
