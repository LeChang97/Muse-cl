import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import museVitePlugin from '@ebay/muse-vite-plugin';
import museVitePluginEbay from '@ebay/muse-vite-plugin-ebay';

export default defineConfig(() => {
  return {
    plugins: [react(), museVitePlugin(), museVitePluginEbay()],
  };
});
