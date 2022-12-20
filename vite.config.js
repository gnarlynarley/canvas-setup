import { svelte } from '@sveltejs/vite-plugin-svelte';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [tsconfigPaths(), svelte()],
	base: '/canvas-setup',
};

export default config;
