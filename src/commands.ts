type Engine = [name: string, resolver: string | ((args: string[]) => string)];

// prettier-ignore
export const commands: Record<string, Engine> = {
    // Search Engines
    ddg: ['DuckDuckGo', 'https://duckduckgo.com/?q=$#'],
    yandex: ['Yandex', 'https://yandex.com/search/?text=$#'],

    // Dev
    gh: ['GitHub', ([query]) => {
            if (/(\w)+\/(\w)+/g.test(query)) {
                return `https://github.com/${query}`;
            }

            return 'https://github.com/search?q=$#';
        }],

    svelte: ['Svelte', ([query]) => {
            switch (query) {
                case 'docs':
                    return 'https://svelte.dev/docs';

                default:
                case 'repl':
                    return 'https://svelte.dev/repl';

                case 'kit':
                    return 'https://kit.svelte.dev';
            }
        }],
        
    npm: ['Npm', 'https://npmjs.com/search?q=$#'],
    ts: ['TypeScript', 'https://www.typescriptlang.org/play'],
    mdn: ['MDN', 'https://developer.mozilla.org/en-US/search?q=$#'],
    crates: ['Crates.io', 'https://crates.io/search?q=$#'],
    pypi: ['pypi', 'https://pypi.org/search/?q=$#'],
    djs: ['discord.js', 'https://discord.js.org/#/docs/discord.js/stable/search?query=$#'],
    gitpod: ['GitPod', ([q]) => `https://gitpod.io/#https://github.com/${q}`],

    // Video
    yt: ['Youtube', 'https://www.youtube.com/results?search_query=$#'],
    netflix: ['Netflix', 'https://www.netflix.com/search?q=$#'],
    atorrents: ['ATorrents', 'https://atorrents.com/search/$#'],
    pirate: ['The Pirate Bay', 'https://thepiratebay.org/search.php?q=$#'],

    // Links
    ghost: ['GHOST', 'https://ghostdev.xyz'],
};
