import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { 
		adapter: adapter(),
		alias: {
			'$schemas/*': 'src/schemas/*',
		},
		experimental: {
			remoteFunctions: true
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx'],

	compilerOptions: {
		experimental: { async: true }
	}
};

export default config;
