<script lang="ts">
	import '../app.css';
	import Button from '../components/Button.svelte';
	import { browser } from '$app/environment';
	import type { LayoutServerData } from './$types';
	import { page } from '$app/stores';
	import Home from '../components/Home.svelte';
	import Logout from '../components/Logout.svelte';
	import Add from '../components/Add/Add.svelte';

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
			: 'fixed top-0 z-[1] nav flex justify-between p-4 bg-white dark:bg-[#393939] border-b border-blue-400 w-full sm:w-2/3 md:w-3/5 lg:w-2/5 mx-auto right-0 left-0'}
	>
		{#if $page.url.pathname.includes('/profile')}
			<p>Good evening, <span class="font-semibold">{data.user}</span> 👋</p>
		{/if}
		<div class="theme-toggler">
			<button on:click={toggleTheme} class="text-xl">{isDark ? '☀' : '🌑'}</button>
		</div>
	</div>
	<main class={`${$page.url.pathname === '/profile/add' ? 'sm:w-2/3 md:w-3/5 lg:w-2/5 max-h-full' : 'max-h-[85vh] sm:w-2/3 md:w-3/5 lg:w-2/5'}`}>
		<slot />
	</main>
	{#if data && data.user}
		<nav>
			<a
				href="/profile"
				class={`${$page.url.pathname === '/profile' ? 'profile-active' : 'profile'}`}
			>
				<Home class="text-2xl text-inherit" />
			</a>
			<a
				href="/profile/add"
				class={`${$page.url.pathname === '/profile/add' ? 'add-active' : 'add'}`}
			>
				<Add class="text-2xl text-inherit" />
			</a>
			<form
				action="?/logout"
				method="POST"
				class={`${
					$page.url.pathname === '/profile/logout'
						? 'text-blue-500 hover:text-blue-400 dark:text-blue-300 hover:dark:text-blue-200'
						: 'hover:text-blue-300 text-gray-600 dark:text-gray-400'
				} logout`}
			>
				<button><Logout class="text-2xl text-inherit" /></button>
			</form>
		</nav>
	{/if}
</div>

<style global lang="postcss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		@apply bg-white dark:bg-[#393939] relative top-[60px] h-[-webkit-fill-available] grid w-full;
		flex: 1;
		margin: 0 auto;
		box-sizing: border-box;
	}

	nav {
		@apply dark:bg-[#393939] bg-white fixed bottom-0 z-[1] p-3 border-t border-blue-400 w-full mx-auto right-0 left-0 grid grid-cols-3 justify-items-center;
	}

	.profile-active,
	.add-active {
		@apply text-blue-500 dark:text-blue-300;
	}

	.profile-active:hover,
	.add-active:hover {
		@apply text-blue-400 dark:text-blue-200;
	}

	.profile,
	.add,
	.logout {
		@apply transition-all duration-300 text-gray-600 dark:text-gray-400;
	}

	.profile:hover,
	.add:hover,
	.logout:hover {
		@apply -translate-y-1 text-blue-400;
	}

	@screen sm {
		main, nav {
			@apply w-2/3;
		}
	}

	@screen md {
		main, nav {
			@apply w-3/5;
		}
	}

	@screen lg {
		main, nav {
			@apply w-2/5;
		}
	}
</style>
