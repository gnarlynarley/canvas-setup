import type { RenderOptions } from './../paintOffset';
import { writable } from 'svelte/store';

const LOCAL_STORAGE_KEY = 'app:renderOptions';
const DEFAULT_OPTIONS: RenderOptions = {
	width: 2000,
	height: 1600,
	offset: 50,
	background: true,
	backgroundColor: '#cccccc',
	backgroundOpacity: 100,
	borderWidth: 2,
	border: true,
	borderColor: '#000000',
	borderOpacity: 100,
};

export const renderOptions = writable<RenderOptions | null>(null);

if (typeof window !== 'undefined') {
	try {
		const localSettings =
			JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '') || DEFAULT_OPTIONS;
		renderOptions.set(localSettings);
	} catch {
		renderOptions.set(DEFAULT_OPTIONS);
	}

	renderOptions.subscribe((value) => {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
	});
}

export default renderOptions;
