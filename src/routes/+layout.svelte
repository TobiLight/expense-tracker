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
			: 'fixed top-0 z-[1] nav flex justify-between p-4 bg-white dark:bg-black border-b border-blue-400  w-full sm:w-2/3 md:w-3/5 lg:w-2/5 mx-auto right-0 left-0'}
	>
		{#if $page.url.pathname.includes('/profile')}
			<p>Good evening, {data.user}</p>
		{/if}
		<div class="theme-toggler">
			<button on:click={toggleTheme} class="text-xl">{isDark ? '☀' : '🌑'}</button>
		</div>
	</div>
	<main class="bg-white relative top-[60px] max-h-[85vh] h-[-webkit-fill-available] grid w-full sm:w-2/3 md:w-3/5 lg:w-2/5">
		<slot />
	</main>
	{#if data && data.user}
			<footer class="dark:bg-black bg-white fixed bottom-0 z-[1] p-3 border-t border-blue-400 w-full sm:w-2/3 md:w-3/5 lg:w-2/5 mx-auto right-0 left-0">
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
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* @media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
