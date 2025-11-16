import { renderHomePage } from './home/home.ts';
import { search } from './search.ts';

function error(code: number, message: string) {
	return Response.json({ error: message }, { status: code });
}

export function serve(port: number, hostname: string) {
	const server = Deno.serve({ port, hostname }, async (request) => {
		if (request.method != 'GET') {
			return error(405, 'Method Not Allowed');
		}

		const url = new URL(request.url);

		if (url.pathname != '/') {
			return error(404, 'Not Found');
		}

		const query = url.searchParams.get('q')?.trim();

		if (typeof query != 'string' || query.length == 0) {
			return new Response(await renderHomePage(), {
				headers: {
					'Content-Type': 'text/html',
				},
			});
		}

		const result = search(query);

		switch (result.type) {
			case 'search':
				return Response.redirect(
					`https://duckduckgo.com?q=${encodeURIComponent(result.query)}`,
				);

			case 'text':
				return new Response(result.text);

			case 'url':
				return Response.redirect(result.href);

			case 'redirect': {
				const newURL = new URL(url.origin);
				newURL.pathname = result.page === 'home' ? '/' : '';
				return Response.redirect(newURL);
			}

			case 'error':
				return error(400, result.message);
		}
	});

	return {
		[Symbol.dispose]() {
			server.shutdown();
		},
	};
}
