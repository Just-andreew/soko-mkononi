import { defineConfig } from 'vitest/config';


export default defineConfig({
  test: {
    globals: true, // Enables Jest-like globals such as `expect`
    environment: 'jsdom', // Simulates a browser environment for React components
  },
});