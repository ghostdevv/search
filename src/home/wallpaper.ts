interface Response {
	data: {
		path: string;
	}[];
}

let lastFetchTime: number | null = null;
let cachedImage: string | null = null;

export async function randomWallpaper() {
	// if lastFetchTime was over 1 hour ago
	if (!lastFetchTime || Date.now() - lastFetchTime > 3600000) {
		lastFetchTime = Date.now();
		cachedImage = null;
	}

	if (cachedImage) {
		return cachedImage;
	}

	const url = new URL('https://wallhaven.cc/api/v1/search');
	url.searchParams.set('q', '@Starkiteckt');
	url.searchParams.set('categories', '100');
	url.searchParams.set('purity', '100');
	url.searchParams.set('sorting', 'random');
	url.searchParams.set('atleast', '1920x1200');
	url.searchParams.set('resolutions', '1920x1200');
	url.searchParams.set('colors', '0066cc');

	try {
		const res = await fetch(url);
		const { data }: Response = await res.json();

		lastFetchTime = Date.now();
		cachedImage = data.at(0)?.path || null;

		return cachedImage;
	} catch (error) {
		const message = Error.isError(error) ? error.message : `${error}`;
		console.error('failed to fetch random wallpaper:', message);
		return null;
	}
}
