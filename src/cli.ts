import pkg from '../deno.json' with { type: 'json' };
import { parseArgs } from '@std/cli';
import dedent from 'dedent';

interface CommandHelpOptions {
	name: string;
	description: string;
	flags: { flag: string; description: string }[];
}

export function print_cmd_help(options: CommandHelpOptions): never {
	options.flags.push({ flag: '-h, --help', description: 'Display this message' });

	console.log(dedent`
		Description
		  ${options.description}

		Usage
		  $ search ${options.name} [options]

		Options
		  ${options.flags.map((f) => `${f.flag}\t\t${f.description}`).join('\n')}
	`);

	Deno.exit(1);
}

export function parse_cli<T extends readonly string[]>(valid_commands: T) {
	const args = parseArgs(Deno.args);

	if (args.v || args.version) {
		console.log(pkg.version);
		Deno.exit(0);
	}

	const [command] = args._;

	const is_valid_command = valid_commands.includes(`${command}`);

	if (
		typeof command != 'string' ||
		command.trim().length == 0 ||
		command == 'help' ||
		!is_valid_command
	) {
		console.log(dedent`Search v${pkg.version}

			Usage:
			  $ search <command> [options]

			Available Commands:
			  serve		Serve the search server for use with browsers

			Options
			  -v, --version		Display the current version
			  -h, --help		Display this message
		`);

		Deno.exit(0);
	}

	return {
		command: command as T[number],
		help: !!args.help,
		args,
	};
}
