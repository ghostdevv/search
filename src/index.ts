import * as Cache from 'worktop/cfw.cache';
import { Router, compose } from 'worktop';
import { reply } from 'worktop/response';
import * as CORS from 'worktop/cors';
import { start } from 'worktop/cfw';

import { commands } from './commands';
import { run } from './utils';

// Create new Router
const API = new Router();

API.prepare = compose(
    // Attach `Cache` lookup -> save
    Cache.sync(),

    // Attach global CORS config
    CORS.preflight({
        maxage: 3600 * 6, // 6 hr
        credentials: true,
    }),
);

API.add('GET', '*', async (request, context) => {
    const url = new URL(request.url);

    if (!url.searchParams.has('q'))
        return reply(400, {
            message: 'Missing query parameter: q',
        });

    const query = url.searchParams.get('q') as string;

    if (!query.startsWith('!'))
        return Response.redirect(
            `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
            307,
        );

    const [command, ...args] = query.slice(1).split(' ');

    if (command == 'help') {
        const help: Record<string, string> = {};

        for (const [command, [name]] of Object.entries(commands))
            help[name] = `!${command}`;

        return reply(200, JSON.stringify(help, null, 2));
    }

    try {
        const result = await run(command, args);
        return Response.redirect(result, 307);
    } catch (e) {
        return reply(400, {
            message: (e as Error).message,
        });
    }
});

export default start(API.run);
