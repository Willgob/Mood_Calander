<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { createSvelteAuthClient } from '@mmailaender/convex-better-auth-svelte/svelte';
	import { authClient } from '$lib/auth-client';
	import { ModeWatcher } from "mode-watcher"

	import Footer from '$lib/components/footer.svelte';

	createSvelteAuthClient({ authClient: authClient as any });

	let { children } = $props();

	setupConvex(PUBLIC_CONVEX_URL);
</script>

<ModeWatcher />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen background-background text-foreground antialiased flex flex-col">
	<main class="grow">
		{@render children()}
	</main>
	<Footer />
</div>
