import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { 
		adapter: adapter(),
		alias: {
			'$schemas/*': 'src/schemas/*',
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
