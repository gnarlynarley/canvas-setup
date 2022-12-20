import { sveltekit } from '@sveltejs/kit/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [tsconfigPaths(), sveltekit()]
};

export default config;
