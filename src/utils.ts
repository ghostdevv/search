export function open_in_browser(url: string | URL) {
	const command = new Deno.Command('xdg-open', {
		args: [url.toString()],
	});

	command.spawn();
}
