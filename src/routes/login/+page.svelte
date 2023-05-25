<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types';
	import Loading from '$lib/icons/Loading.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form: ActionData;
	let loading: boolean = false;

	const logUserIn: SubmitFunction = ({ form, data, action, cancel }) => {
		loading = true;
		const { username, password } = Object.fromEntries(data) as {
			username: string;
			password: string;
		};
		if (!username || !password) {
			loading = false;
			cancel();
		}
		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					loading = false;
					break;
				case 'success':
					loading = false;
					break;
				default:
					break;
			}

			await update({ reset: false });
			if (result.type === 'success') goto('/profile');
		};
	};
</script>

<div class="login-container">
	<a href="/" class="mb-2">◀ Home</a>
	<div class="login-wrapper">
		<form method="POST" action="?/login" use:enhance={logUserIn} class="login">
			<div class="grid gap-y-4">
				<label for="username" class="username">
					Username
					<input
						disabled={loading}
						type="text"
						name="username"
						value={form?.username ?? ''}
						placeholder="Enter your username"
						on:keypress={(e) => {
							if (form) form.failure = false;
						}}
						class={`${loading ? 'dark:bg-gray-900' : 'dark:bg-[#535353]'}`}
					/>
				</label>

				<label for="password" class="password">
					Password
					<input
						disabled={loading}
						type="password"
						name="password"
						value={form?.password ?? ''}
						placeholder="Enter your password"
						on:keypress={(e) => {
							if (form) form.failure = false;
						}}
						class={`${loading ? 'dark:bg-gray-900' : 'dark:bg-[#535353]'}`}
					/>
				</label>
			</div>
			<div class="grid gap-y-4">
				{#if loading}
					<button disabled={true} class="btn-loading flex items-center gap-x-2 justify-center"
						><Loading class="animate animate-spin" /> Logging in...</button
					>
				{:else}
					<button class="btn">Login</button>
				{/if}
				{#if form && form.success}
					<p class="text-sm text-green-500">✅ Logged in successfully!</p>
				{/if}
				{#if form && form.failure}
					<p class="text-sm text-red-500">❌ Invalid login!</p>
				{/if}
				<div class="flex justify-between">
					<a href="/reset-password" class="text-gray-600 dark:text-gray-400 text-sm font-semibold"
						>Forgot password?</a
					>
					<a href="/signup" class="text-blue-500 text-sm font-semibold">Create account</a>
				</div>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	.btn {
		@apply transition-all duration-300 ease-out bg-blue-500 rounded py-2 w-full text-gray-100;
	}

	.btn:hover {
		@apply bg-blue-400;
	}

	.btn-loading {
		@apply opacity-30 cursor-not-allowed bg-blue-500 rounded py-2 w-full text-gray-100;
	}

	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		margin: 0 auto;
	}

	.login {
		transition: all 0.1s ease-in-out;
		@apply flex flex-col justify-center gap-y-6 bg-gray-50 px-6 py-12 w-72 shadow-md rounded dark:bg-[#1f1f1f] border-2 border-transparent dark:border-[#2b2a2a] duration-300;
	}

	.username,
	.password {
		@apply text-xs font-semibold text-gray-500 flex flex-col gap-y-1 tracking-wide;
	}

	input {
		@apply p-2 bg-gray-200 shadow-inner dark:text-gray-200;
	}

	input:focus {
		@apply outline-none;
	}
</style>
