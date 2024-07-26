import { parse_cli, print_cmd_help } from './cli.ts';
import { serve } from './server.ts';

const VALID_COMMANDS = ['serve'] as const;

const { command, help, args } = parse_cli(VALID_COMMANDS);

switch (command) {
	case 'serve': {
		if (help) {
			print_cmd_help({
				name: 'serve',
				description: 'Serve the search server for use with browsers',
				flags: [],
			});
		}

		const port_arg = args.port && parseInt(args.port);
		const port = isNaN(port_arg) ? 9343 : port_arg;
		serve(port);
		break;
	}
}
