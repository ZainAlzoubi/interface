import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      events:'events',
      util:'util',
      stream: 'readable-stream',
    },
  },
  optimizeDeps:{
    esbuildOptions:{
      define:{
        global:'globalThis',
      },
      plugins:[
        NodeGlobalsPolyfillPlugin({
          process:true,
          buffer:true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  // base: "/interface/",
  build: {
    rollupOptions: {
      plugins: [visualizer({ open: true })],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});