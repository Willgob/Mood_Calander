<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { createSvelteAuthClient } from '@mmailaender/convex-better-auth-svelte/svelte';
	import { authClient } from '$lib/auth-client';
	import { ModeWatcher } from "mode-watcher"
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  	import AppSidebar from "$lib/components/app-sidebar.svelte";

	import Footer from '$lib/components/footer.svelte';

	createSvelteAuthClient({ authClient: authClient as any });

	let { children } = $props();

	setupConvex(PUBLIC_CONVEX_URL);
</script>

<ModeWatcher />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen background-background text-foreground antialiased flex flex-col">
<!-- <Sidebar.Provider>
	<AppSidebar />
	<main class="grow">
	<Sidebar.Trigger />
		{@render children()}
	</main>
	<Footer />
</Sidebar.Provider> -->
	<main class="grow flex flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
