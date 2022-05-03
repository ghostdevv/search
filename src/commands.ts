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

            return 'https://cs.github.com/?scopeName=All+repos&scope=&q=$#';
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

    // Images
    pexels: ['Pexels', 'https://www.pexels.com/search/$#'],

    // Linux
    aur: ['AUR', 'https://aur.archlinux.org/packages?K=$#'],
    arch: ['Arch Forums', 'https://bbs.archlinux.org/search.php?action=search&keywords=$#'],

    // Links
    ghost: ['GHOST', 'https://ghostdev.xyz'],
    cf: ['Cloudflare Shortcut', 'https://dash.cloudflare.com/44321e1b7fbd29b56b65c1890a3bbee2'],

    // Misc
    l: ['LocalHost', ([port, ...q]) => `http://localhost:${port}/${q.map(encodeURIComponent).join('/')}`],
    ip: ['IP', 'https://ip.willow.sh'],
    echo: ['Echo', 'https://echo.willow.sh?q=$#'],
    secret: ['Echo Encode (secret)', ([...q]) => `https://echo.willow.sh/?encoded=1&q=${encodeURIComponent(btoa(q.join(' ')))}`],
};
