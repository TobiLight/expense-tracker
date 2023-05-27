<script>
	import ArrowDown from '../../components/Arrow/ArrowDown.svelte';
	import ArrowUp from '../../components/Arrow/ArrowUp.svelte';
</script>

<div
	class="pt-4 bg-transparent border-2 border-gray-300 shadow p-4 mx-2 rounded dark:shadow-none dark:bg-[#333] dark:border-blue-300"
>
	<div class="sec-1 grid gap-y-8">
		<div class="flex justify-between">
			<h1 class="text-xl font-bold">Summary</h1>
			<select
				name=""
				id=""
				class="bg-white dark:text-white dark:bg-transparent dark:border-b border-blue-400"
			>
				<option value="today" class="dark:bg-black">Today</option>
				<option value="week" class="dark:bg-black">Last week</option>
				<option value="month" class="dark:bg-black">Last month</option>
			</select>
		</div>

		<div class="flex justify-between">
			<div class="summary flex flex-col gap-y-1">
				<h1 class="font-semibold text-sm text-center">Spent</h1>
				<p class="text-md font-bold text-center">N120,000</p>
			</div>
			<div class="summary flex flex-col gap-y-1">
				<h1 class="font-semibold text-sm text-center">Received</h1>
				<p class="text-md font-bold text-center">N120,000</p>
			</div>
			<div class="summary flex flex-col gap-y-1">
			<h1 class="font-semibold text-sm text-center">Total</h1>
			<p class="text-md font-bold text-center">N120,000</p>
		</div>
		</div>
	</div>
</div>

<div class="flex-1 max-h-[inheit] flex flex-col">
	<div class="border-b border-blue-400 pb-2 px-2">
		<h1 class="font-bold text-gray-700 dark:text-gray-200">Transactions</h1>
	</div>
	<div class="expense-entries flex-1 flex flex-col max-h-[54vh] overflow-y-scroll scroll-smooth">
		<div class="expense-entries-container">
			<div class="entry-1">
				<div class="flex justify-between items-end border-b-2 border-blue-400 p-3 bg-[#03a9f433]">
					<h1 class="font-bold text-gray-700 dark:text-gray-200">Today</h1>
					<p class="text-sm font-semibold dark:text-gray-200">N4,000</p>
				</div>
				<div class="">
					<div class="flex p-3 border-b-2 border-blue-100 dark:border-gray-600">
						<div class="w-[75px]">
							<p class="text-2xl">🍴</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700 dark:text-gray-200">Lunch</h1>
								<p class="text-sm italic">Restaurant</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600 dark:text-gray-300">N3,000</h1>
								<div class="flex justify-center">
									<ArrowDown class="text-red-400 text-xl font-extrabold" />
								</div>
							</div>
						</div>
					</div>

					<div class="flex p-3 border-b-2 border-blue-100 dark:border-gray-600">
						<div class="w-[75px]">
							<p class="text-2xl">📱</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700 dark:text-gray-200">Airtime</h1>
								<p class="text-sm italic">Utility</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600 dark:text-gray-300">N3,000</h1>
								<div class="flex justify-center">
									<ArrowUp class="text-green-400 text-xl font-extrabold" />
								</div>
							</div>
						</div>
					</div>

					<div class="flex p-3">
						<div class="w-[75px]">
							<p class="text-2xl">🥑</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700 dark:text-gray-200">Foodstuff & stuff</h1>
								<p class="text-sm italic">Groceries</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600 dark:text-gray-300">N3,000</h1>
								<div class="flex justify-center">
									<ArrowDown class="text-red-400 text-xl font-extrabold" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="entry-2">
				<div class="flex justify-between items-end border-b-2 border-blue-400 p-3 bg-[#03a9f433]">
					<h1 class="font-bold text-gray-700 dark:text-gray-200">Yesterday</h1>
					<p class="text-sm font-semibold dark:text-gray-200">N4,000</p>
				</div>
				<div class="">
					<div class="flex p-3 border-b-2 border-blue-100 dark:border-gray-600">
						<div class="w-[75px]">
							<p class="text-2xl">🍴</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700 dark:text-gray-200">Lunch</h1>
								<p class="text-sm italic">Restaurant</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600 dark:text-gray-300">N3,000</h1>
								<div class="flex justify-center">
									<ArrowUp class="text-green-400 text-xl font-extrabold" />
								</div>
							</div>
						</div>
					</div>

					<div class="flex p-3 border-b-2 border-blue-100 dark:border-gray-600">
						<div class="w-[75px]">
							<p class="text-2xl">📱</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700 dark:text-gray-200">Airtime</h1>
								<p class="text-sm italic">Utility</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600 dark:text-gray-300">N3,000</h1>
								<div class="flex justify-center">
									<ArrowUp class="text-green-400 text-xl font-extrabold" />
								</div>
							</div>
						</div>
					</div>

					<div class="flex p-3">
						<div class="w-[75px]">
							<p class="text-2xl">🥑</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700 dark:text-gray-200">Foodstuff & stuff</h1>
								<p class="text-sm italic">Groceries</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600 dark:text-gray-300">N3,000</h1>
								<div class="flex justify-center">
									<ArrowUp class="text-green-400 text-xl font-extrabold" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-t dark:border-gray-600 pt-4 flex justify-center">
			<a
				href="/"
				class="text-center mb-6 px-3 py-1 rounded-full bg-blue-400 text-white w-fit hover:bg-blue-500"
				>Load more</a
			>
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
