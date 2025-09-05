import { commands } from './commands.ts';

type Result =
	| { type: 'url'; href: string }
	| { type: 'search'; query: string }
	| { type: 'text'; text: string }
	| { type: 'error'; message: string };

export function search(query: string): Result {
	if (!query.startsWith('!')) {
		return { type: 'search', query };
	}

	const [name, ...args] = query.slice(1).split(' ');

	if (!name) {
		return { type: 'error', message: 'Missing command name' };
	}

	const command = commands.find(
		(command) => command.name == name || command.aliases?.includes(name),
	);

	if (!command) {
		return { type: 'error', message: `Command "${name}" not found` };
	}

	const rawResult = typeof command.handle == 'string' ? command.handle : command.handle(args);

	const result = rawResult.replace(/\$(\d|#)/g, (_, index) => {
		const replacement = index == '#' ? args.join(' ') : args[Number(index)];
		return typeof replacement == 'string' ? replacement : `$${index}`;
	});

	if (result.match(/\$(\d|#)/g)) {
		throw new Error('Missing args');
	}

	return URL.parse(result) ? { type: 'url', href: result } : { type: 'text', text: result };
}
