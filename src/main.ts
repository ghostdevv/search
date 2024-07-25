import { commands } from './commands.ts';

function error(code: number, message: string) {
	return Response.json({ error: message }, { status: code });
}

Deno.serve({ port: 9343 }, (request) => {
	if (request.method != 'GET') {
		return error(405, 'Method Not Allowed');
	}

	const url = new URL(request.url);
	const query = url.searchParams.get('q')?.trim();

	if (typeof query != 'string' || query.length == 0) {
		return error(400, 'Missing query');
	}

	if (!query.startsWith('!')) {
		return Response.redirect(`https://duckduckgo.com?q=${query}`);
	}

	const [name, ...args] = query.slice(1).split(' ');

	const command = commands.find(
		(command) => command.name == name || command.aliases?.includes(name),
	);

	if (!command) {
		return error(400, `Command "${name}" not found`);
	}

	const rawResult =
		typeof command.handle == 'string'
			? command.handle
			: command.handle(args);

	const result = rawResult.replace(/\$(\d|#)/g, (_, index) => {
		const replacement = index == '#' ? args.join(' ') : args[Number(index)];
		return typeof replacement == 'string' ? replacement : `$${index}`;
	});

	if (result.match(/\$(\d|#)/g)) {
		return error(400, 'Missing args');
	}

	return URL.parse(result) ? Response.redirect(result) : new Response(result);
});
