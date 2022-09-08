import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		exclude: ['build', 'netlify', 'node_modules']
	}
};

export default config;
