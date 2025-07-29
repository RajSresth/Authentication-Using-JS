import { defineConfig } from 'vite';

export default defineConfig({
  root: './Frontend', // Project root directory (default is '.')
 
  server: {
    port: 5173, // Dev server port
    open: true, // Open browser on server start
  },
  build: {
    outDir: 'dist', // Output directory for build
    sourcemap: true, // Generate source maps
  },
});