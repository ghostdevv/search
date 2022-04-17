import { commands } from './commands';

const argFor = (match: string, args: string[]) => {
    if (match == '#') {
        return args;
    }

    const index = Number(match);

    if (isNaN(index) || index > args.length) {
        return `$${match}`;
    }

    return args[index];
};

export const replaceArgs = (template: string, args: string[]) =>
    template.replace(/(\$)(\d|#)/gm, (a, b, match) => {
        const result = argFor(match, args);

        return Array.isArray(result)
            ? result.map(encodeURIComponent).join('+')
            : encodeURIComponent(result);
    });

export const run = async (command: string, args: string[]) => {
    if (!commands[command]) throw new Error('Command does not exist');

    const [, engine] = commands[command];

    return typeof engine == 'string'
        ? replaceArgs(engine, args)
        : replaceArgs(engine(args), args);
};
