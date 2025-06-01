import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname, 'src/util'),
      commonComponents: path.resolve(__dirname, 'src/commonComponents'),
      containers: path.resolve(__dirname, 'src/containers'),
    },
  },
});
