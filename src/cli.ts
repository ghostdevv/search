import { parseArgs } from '@std/cli';

export function parse_cli<T extends readonly string[]>(valid_commands: T) {
	const args = parseArgs(Deno.args);
	const [command] = args._;

	const is_valid_command = valid_commands.includes(`${command}`);

	if (
		typeof command != 'string' ||
		command.trim().length == 0 ||
		command == 'help' ||
		!is_valid_command
	) {
		console.log('search help page tbd');
		Deno.exit(0);
	}

	return {
		command: command as T[number],
		help: !!args.help,
		args,
	};
}
