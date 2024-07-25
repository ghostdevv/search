type Engine = [name: string, resolver: string | ((args: string[]) => string)];

// prettier-ignore
export const commands: Record<string, Engine> = {
    // Search Engines
    ddg: ['DuckDuckGo', 'https://duckduckgo.com/?q=$#'],

    // Dev
    gh: ['GitHub', ([query]) => {
            if (/(\w)+\/(\w)+/g.test(query)) {
                return `https://github.com/${query}`;
            }

            return 'https://github.com/search?q=$#';
        }],

    ghs: ['Github Self', 'https://github.com/ghostdevv/$0'],
        
    npm: ['Npm', 'https://npmjs.com/search?q=$#'],
    ts: ['TypeScript', 'https://www.typescriptlang.org/play'],
    mdn: ['MDN', 'https://developer.mozilla.org/en-US/search?q=$#'],
    crates: ['Crates.io', 'https://crates.io/search?q=$#'],
    pypi: ['pypi', 'https://pypi.org/search/?q=$#'],
    gitpod: ['Gitpod', ([q]) => `https://gitpod.io/#https://github.com/${q}`],
    whois: ['WhoIs', 'https://whois.com/whois/$0'],
    mod: ['Modrinth', 'https://modrinth.com/mods?q=$#'],
    mods: ['Modrinth', 'https://modrinth.com/mods?q=$#'],

    // Video
    yt: ['Youtube', 'https://www.youtube.com/results?search_query=$#'],

    // Linux
    aur: ['AUR', 'https://aur.archlinux.org/packages?K=$#'],
    arch: ['Arch Forums', 'https://bbs.archlinux.org/search.php?action=search&keywords=$#'],

    // Links
    cf: ['Cloudflare Shortcut', 'https://dash.cloudflare.com/44321e1b7fbd29b56b65c1890a3bbee2'],

    // Misc
    ip: ['IP', 'https://ip.willow.sh'],
};
