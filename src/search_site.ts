import dedent from 'dedent';

export const searchSiteTemplate = dedent`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ghostsui@1/css/ghostsui.css" />
    <title>Search</title>
</head>
<body>
	<main>
		<form>
			<input type="search" name="q" placeholder="Search..." />
			<button class="secondary">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g class="oi-search">
						<path
							class="oi-ellipse"
							d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							class="oi-line"
							d="M21 21L15 15"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>
			</button>
		</form>
	</main>
	
	<style>
		main {
			width: 100%;
			min-height: 100dvh;
			max-width: 1200px;
			margin: 0 auto;
			padding: 32px;
		}	
	
		form {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			gap: 16px;
			margin: 0 auto;
			margin-top: 25dvh;
		}

		input {
			max-width: 500px;
		}

        button {
            border: none;
            border-radius: 100%;
            width: 42px;
            height: 42px;
            padding: 0px;
            display: grid;
            place-items: center;
        }
	</style>
</body>
</html>`;
