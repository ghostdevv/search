import { search } from './search.ts';

function error(code: number, message: string) {
	return Response.json({ error: message }, { status: code });
}

export function serve(port: number) {
	const server = Deno.serve({ port }, (request) => {
		if (request.method != 'GET') {
			return error(405, 'Method Not Allowed');
		}

		const url = new URL(request.url);
		const query = url.searchParams.get('q')?.trim();

		if (typeof query != 'string' || query.length == 0) {
			return error(400, 'Missing query');
		}

		const result = search(query);

		switch (result.type) {
			case 'search':
				return Response.redirect(`https://duckduckgo.com?q=${result.query}`);

			case 'text':
				return new Response(result.text);
				// return new Response(result.text, {
				// 	headers: {
				// 		'Content-Type': 'text/plain',
				// 	},
				// });

			case 'url':
				return Response.redirect(result.href);
		}
	});

	return {
		[Symbol.dispose]() {
			server.shutdown();
		},
	};
}
