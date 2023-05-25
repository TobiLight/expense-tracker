<script lang="ts">
	import '../app.css';
	import Button from '../components/Button.svelte';
	import { browser } from '$app/environment';
	import type { LayoutServerData } from './$types';
	import { page } from '$app/stores';

	export let data: LayoutServerData;
	let isDark = false;
	let toggleTheme = () => {
		isDark = !isDark;
		localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
		isDark
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	};

	if (browser) {
		if (
			localStorage['site-theme'] === 'dark' ||
			(!('site-theme' in localStorage) && window.matchMedia('prefers-color-scheme: dark').matches)
		) {
			document.documentElement.classList.add('dark');
			isDark = true;
		} else {
			document.documentElement.classList.remove('dark');
			isDark = false;
		}
	}
</script>

<div class="app">
	<div
		class={$page.url.pathname === '/' ||
		$page.url.pathname.includes('/login') ||
		$page.url.pathname.includes('/signup')
			? 'nav flex justify-end p-4'
			: 'fixed top-0 z-[1] w-full nav flex justify-between p-4 bg-white dark:bg-black border-b border-blue-400'}
	>
		{#if $page.url.pathname.includes('/profile')}
			<p>Good evening, {data.user}</p>
		{/if}
		<div class="theme-toggler">
			<button on:click={toggleTheme} class="text-xl">{isDark ? '☀' : '🌑'}</button>
		</div>
	</div>
	<main class="relative top-[60px] max-h-[85vh] h-[-webkit-fill-available] grid">
		<slot />
	</main>
	{#if data && data.user}
			<footer class="dark:bg-black bg-white fixed bottom-0 z-[1] w-full p-3 border-t border-blue-400">
				<form action="?/logout" method="POST">
					<button>Logout</button>
				</form>
			</footer>
		{/if}
</div>

<style global lang="postcss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* @media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
