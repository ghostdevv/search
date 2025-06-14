import { Table } from '@sauber/table';
import ansiRegex from 'npm:ansi-regex';

interface Command {
	name: string;
	description: string;
	aliases?: string[];
	handle: string | ((args: string[]) => string);
}

export const commands: Command[] = [
	{
		name: 'ddg',
		description: 'DuckDuckGo',
		handle: 'https://duckduckgo.com/?q=$#',
	},
	{
		name: 'brave',
		description: 'Brave Search',
		handle: 'https://search.brave.com/search?q=$#',
	},
	{
		name: 'gh',
		description: 'GitHub',
		handle: ([query]) => {
			if (/^([\w-])+(\/[\w-]+)?$/g.test(query!)) {
				return `https://github.com/${query}`;
			}

			return 'https://github.com/search?q=$#';
		},
	},
	{
		name: 'ghs',
		description: 'Github Self',
		handle: ([query]) => `https://github.com/ghostdevv${query?.length ? `/${query}` : ''}`,
	},
	{
		name: 'npm',
		description: 'Npm',
		handle: 'https://npmjs.com/search?q=$#',
	},
	{
		name: 'jsr',
		description: 'Search JSR for a package',
		handle: 'https://jsr.io/packages?search=$#',
	},
	{
		name: 'ts',
		description: 'TypeScript',
		handle: 'https://www.typescriptlang.org/play',
	},
	{
		name: 'mdn',
		description: 'MDN',
		handle: 'https://developer.mozilla.org/en-US/search?q=$#',
	},
	{
		name: 'caniuse',
		description: 'Query caniuse',
		handle: 'https://caniuse.com/?search=$#',
	},
	{
		name: 'crate',
		aliases: ['crates'],
		description: 'Crates.io',
		handle: 'https://crates.io/search?q=$#',
	},
	{
		name: 'pypi',
		description: 'pypi',
		handle: 'https://pypi.org/search/?q=$#',
	},
	{
		name: 'gitpod',
		aliases: ['gp'],
		description: 'Gitpod',
		handle([repo]) {
			return repo
				? `https://gitpod.io/#${URL.parse(repo) ? repo : `https://github.com/${repo}`}`
				: 'https://gitpod.new';
		},
	},
	{
		name: 'whois',
		description: 'WhoIs',
		handle: 'https://whois.com/whois/$0',
	},
	{
		name: 'mod',
		aliases: ['mods'],
		description: 'Modrinth',
		handle: 'https://modrinth.com/mods?q=$#',
	},
	{
		name: 'rtt',
		description: 'realtimetrains',
		handle: 'https://www.realtimetrains.co.uk/search/simple/gb-nr:$0',
	},
	{
		name: 'train',
		aliases: ['tt'],
		description: 'train times',
		handle: 'https://traintimes.org.uk/$0/$1',
	},
	{
		name: 'yt',
		description: 'Youtube',
		handle: 'https://www.youtube.com/results?search_query=$#',
	},
	{
		name: 'aur',
		description: 'AUR',
		handle: 'https://aur.archlinux.org/packages?K=$#',
	},
	{
		name: 'arch',
		description: 'Arch Forums',
		handle: 'https://bbs.archlinux.org/search.php?action=search&keywords=$#',
	},
	{
		name: 'flathub',
		aliases: ['flatpak'],
		description: 'Search flathub',
		handle: 'https://flathub.org/apps/search?q=$#',
	},
	{
		name: 'docker',
		description: 'Search the docker hub',
		handle: 'https://hub.docker.com/search?q=$#',
	},
	{
		name: 'cf',
		description: 'Cloudflare Shortcut',
		handle: 'https://dash.cloudflare.com/44321e1b7fbd29b56b65c1890a3bbee2',
	},
	{ name: 'ip', description: 'IP', handle: 'https://ip.willow.sh' },
	{
		name: 'echo',
		description: 'Echo the text back to you',
		handle: (query) => `${query.join(' ')}`,
	},
	{
		name: 'help',
		aliases: ['?'],
		description: 'List all the commands',
		handle() {
			const table = new Table();
			table.theme = Table.wideTheme;
			table.headers = ['Command', 'Aliases', 'Description'];
			table.rows = commands.map((command) => [
				command.name,
				command.aliases?.join(', ') || '',
				command.description,
			]);

			return table.toString().replace(ansiRegex(), '');
		},
	},
];
