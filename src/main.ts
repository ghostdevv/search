import pkg from '../deno.json' with { type: 'json' };
import { defineCommand, runMain } from 'citty';
import { open_in_browser } from './utils.ts';
import { search } from './search.ts';
import { serve } from './server.ts';

const cmd_serve = defineCommand({
	meta: {
		description: 'Run the search server for use with browsers',
	},
	args: {
		port: {
			type: 'string',
			description: 'Port to run the server on',
			default: '9343',
			alias: 'p',
		},
	},
	run({ args }) {
		const port = parseInt(args.port);

		if (isNaN(port)) {
			throw new Error('Port arg is not a number');
		}

		serve(port);
	},
});

const cmd_search = defineCommand({
	meta: {
		description: 'Search for something',
	},
	args: {
		query: {
			type: 'positional',
			description: 'The query to search for',
			required: true,
		},
	},
	run({ args }) {
		const result = search(args._.join(' '));

		switch (result.type) {
			case 'text':
				console.log(result.text);
				break;

			case 'search': {
				const command = new Deno.Command('ddgr', {
					args: [
						'--url-handler xdg-open',
						'--reg uk-en',
						'--rev',
						'--noua',
						result.query,
					],
				});

				command.spawn();
				break;
			}

			case 'url':
				console.log(`Opening ${result.href}`);
				open_in_browser(result.href);
				break;
		}
	},
});

const main = defineCommand({
	meta: {
		name: 'search',
		version: pkg.version,
		description: 'some description',
	},
	subCommands: {
		serve: cmd_serve,
		search: cmd_search,
	},
});

await runMain(main);
