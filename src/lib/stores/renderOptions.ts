import type { RenderOptions } from './../paintOffset';
import { writable } from 'svelte/store';

const LOCAL_STORAGE_KEY = 'app:renderOptions';
const DEFAULT_OPTIONS: RenderOptions = {
	width: 2000,
	height: 1600,
	offset: 200,
	offsetBackground: true,
	offsetBackgroundColor: '#cccccc',
	offsetBackgroundOpacity: 50,
	borderWidth: 2,
	border: true,
	borderColor: '#000000',
	borderOpacity: 100,
	safeZone: true,
	safeZoneColor: '#ff0000',
	safeZoneOpacity: 10,
	safeZoneWidth: 30,
};

export const renderOptions = writable<RenderOptions | null>(null);

export function setDefaults() {
	renderOptions.set(DEFAULT_OPTIONS);
}

if (typeof window !== 'undefined') {
	try {
		const localSettings =
			JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '') || DEFAULT_OPTIONS;
		renderOptions.set({ ...DEFAULT_OPTIONS, ...localSettings });
	} catch {
		renderOptions.set(DEFAULT_OPTIONS);
	}

	renderOptions.subscribe((value) => {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
	});
}

export default renderOptions;
