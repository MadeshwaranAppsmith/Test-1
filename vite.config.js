// Lightweight Vite config for static site
import { defineConfig } from 'vite';

export default defineConfig({
	root: '.',
	publicDir: 'assets',
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				index: './index.html'
			}
		}
	},
	server: {
		port: 5173
	}
});
