import { commands } from './commands';
import { logger } from 'hono/logger';
import type { Env } from './types';
import { cache } from 'hono/cache';
import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { run } from './utils';

const app = new Hono<Env>();

// app.use('*', cors());
app.use('*', logger());
app.use('*', cache({ cacheName: 'default', cacheControl: 'max-age=604800' }));

app.get('/*', async (c) => {
	const { s: search = 'https://duckduckgo.com/', q: query } = c.req.query();

	if (!query) {
		return c.json({ message: 'Missing query parameter: q' }, 400);
	}

	if (!query.startsWith('!')) {
		return c.redirect(`${search}?q=${encodeURIComponent(query)}`, 307);
	}

	const [command, ...args] = query.slice(1).split(' ');

	if (command == 'help') {
		const help: Record<string, string> = {};

		for (const [command, [name]] of Object.entries(commands)) {
			help[name] = `!${command}`;
		}

		return c.json(help);
	}

	try {
		const result = await run(command, args);
		return Response.redirect(result, 307);
	} catch (e) {
		return c.json({ message: (e as Error)?.message || e }, 400);
	}
});

export default app;
