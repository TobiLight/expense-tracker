<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	function handleClick(event: MouseEvent | CustomEvent<any>) {
		console.log('Button clicked!', event);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="TrackXpense" />
</svelte:head>

<section>
	<h1 class="font-bold text-2xl text-center">TrackXpense</h1>
	<div class="grid gap-y-4">
		<a href="signup" class="rounded-md bg-blue-500 px-2 py-1 text-gray-100 text-center">Create account</a>
		<a href="/login" class="rounded-md bg-transparent border border-blue-500 text-gray-600 dark:text-gray-100 px-2 py-1 text-center">Login</a>
	</div>
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		gap: 50px 0;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
