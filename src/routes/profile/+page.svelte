<script>
	import ArrowDown from '$lib/components/Arrow/ArrowDown.svelte';
	import ArrowDownAlt from '$lib/components/Arrow/ArrowDownAlt.svelte';
	import ArrowUp from '$lib/components/Arrow/ArrowUp.svelte';
	import ArrowUpAlt from '$lib/components/Arrow/ArrowUpAlt.svelte';
	import RecentSales from '$lib/components/RecentSales.svelte';
</script>

<div class="pb-24">
	<div class="pt-4 bg-transparent p-4">
		<div class="bg-white shado-lg p-3 rounded grid justify-items-center items-center">
			<h1 class="text-sm">This month, you have made</h1>
			<div class="flex items-center gap-x-3">
				<p class="font-bold text-lg">N100,000</p>
				<ArrowUp class="text-xl text-green-500" />
			</div>
			<p>👏 🎉</p>
		</div>
	</div>

	<div class="categories p-4 mx-2 grid gap-y-1">
		<h1 class="text-xl font-semibold mb-3">Categories</h1>
		<div class="flex items-center gap-x-6">
			<a href="/profile/report/cake" class="transition-all delay-100 hover:-translate-y-1 px-3">
				🎂 Cake
			</a>
			<a href="/profile/report/chips" class="transition-all delay-100 hover:-translate-y-1 px-3">
				🍟 Chips
			</a>
		</div>
	</div>

	<div class="recent-transactions flex-1 flex flex-col">
		<div class="flex justify-between items-end p-4">
			<h1 class="font-semibold">Recent sales</h1>
			<a href="/" class="underline">View all</a>
		</div>

		<div class="flex-1 flex flex-col gap-y-6 px-4">
			<RecentSales name="Segun" quantity={3} type="Jars" item="Chips" price={'4,500'} />
			<RecentSales name="Mary" quantity={4} type="Normal" item="Chips" price={'400'} />
			<RecentSales name="Tosin" quantity={3} type="Normal" item="Chips" price={'300'} />
			<RecentSales name="Tall Segun" quantity={3} type="Jars" item="Chips" price={'4,500'} />
			<RecentSales name="IK" quantity={3} type="Jars" item="Chips" price={'4,500'} />
		</div>
	</div>
</div>

<style lang="postcss">
	.welcome {
		@apply p-6 rounded shadow-md bg-gray-700;
	}

	.expense-entries::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	.expense-entries::-webkit-scrollbar-track {
		border-radius: 100vh;
		background: #dbd9d6;
		@apply dark:bg-gray-700;
	}

	.expense-entries::-webkit-scrollbar-thumb {
		@apply bg-blue-300;
		border-radius: 100vh;
	}

	.expense-entries::-webkit-scrollbar-thumb:hover {
		@apply bg-blue-400;
	}
</style>
