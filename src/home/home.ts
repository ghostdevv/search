import homeTpl from './home.html' with { type: 'text' };
import { randomWallpaper } from './wallpaper.ts';

export async function renderHomePage() {
	const wallpaper = await randomWallpaper();
	const html = homeTpl.replace(
		'__WALLPAPER__',
		wallpaper ? `url(${wallpaper})` : 'var(--background-primary)',
	);

	return html;
}
