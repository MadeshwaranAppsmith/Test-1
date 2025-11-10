// Lightweight Vite config for static multi-page site
// Uses /src as root and outputs to /dist
import { defineConfig } from 'vite';

export default defineConfig({
	root: 'src',
	publicDir: '../assets',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				index: 'src/index.html',
				projects: 'src/projects.html',
				about: 'src/about.html',
				contact: 'src/contact.html',
				project1: 'src/project/project-alpha.html',
				project2: 'src/project/project-beta.html',
				project3: 'src/project/project-gamma.html'
			}
		}
	},
	server: {
		port: 5173
	}
});


