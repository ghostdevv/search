import pkg from '../deno.json' with { type: 'json' };
import { defineCommand, runMain } from 'citty';
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

const main = defineCommand({
	meta: {
		name: 'search',
		version: pkg.version,
		description: 'some description',
	},
	subCommands: {
		serve: cmd_serve,
	},
});

await runMain(main);
