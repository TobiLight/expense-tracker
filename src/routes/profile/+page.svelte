<div class="pt-4 bg-transparent border border-gray-300 shadow dark:shadow-none dark:bg-[#333] p-4 mx-2 rounded">
	<div class="sec-1 grid gap-y-8">
		<div class="flex justify-between">
			<h1 class="text-xl font-bold">Summary</h1>
			<select
				name=""
				id=""
				class="bg-white dark:text-white dark:bg-transparent dark:border border-blue-400 rounded"
			>
				<option value="today" class="dark:bg-black">Today</option>
				<option value="week" class="dark:bg-black">Last week</option>
				<option value="month" class="dark:bg-black">Last month</option>
			</select>
		</div>

		<div class="summary flex flex-col gap-y-1">
			<h1 class="font-semibold text-center">Spent today</h1>
			<p class="text-2xl font-bold text-center">N120,000</p>
		</div>
	</div>
</div>

<div class="flex-1 max-h-[inheit] flex flex-col">
	<div class="border-b border-blue-400 pb-2 px-2">
		<h1 class="font-bold text-gray-700">Transactions</h1>
	</div>
	<div class="flex-1 flex flex-col">
		<div class="expense-entries max-h-[54vh] overflow-y-scroll scroll-smooth">
			<div class="entry-1">
				<div class="flex justify-between items-end border-b-2 border-blue-400 p-3 bg-[#03a9f433]">
					<h1 class="font-bold text-gray-700">Today</h1>
					<p class="text-sm font-semibold">N4,000</p>
				</div>
				<div class="">
					<div class="flex p-3 border-b-2 border-blue-100">
						<div class="w-[75px]">
							<p class="text-2xl">🍴</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700">Lunch</h1>
								<p class="text-sm italic">Restaurant</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600">N3,000</h1>
								<p />
							</div>
						</div>
					</div>

					<div class="flex p-3 border-b-2 border-blue-100">
						<div class="w-[75px]">
							<p class="text-2xl">📱</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700">Airtime</h1>
								<p class="text-sm italic">Utility</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600">N3,000</h1>
								<p />
							</div>
						</div>
					</div>

					<div class="flex p-3">
						<div class="w-[75px]">
							<p class="text-2xl">🥑</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700">Foodstuff & stuff</h1>
								<p class="text-sm italic">Groceries</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600">N3,000</h1>
								<p />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="entry-2">
				<div class="flex justify-between items-end border-b-2 border-blue-400 p-3 bg-[#03a9f433]">
					<h1 class="font-bold text-gray-700">Yesterday</h1>
					<p class="text-sm font-semibold">N4,000</p>
				</div>
				<div class="">
					<div class="flex p-3 border-b-2 border-blue-100">
						<div class="w-[75px]">
							<p class="text-2xl">🍴</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700">Lunch</h1>
								<p class="text-sm italic">Restaurant</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600">N3,000</h1>
								<p />
							</div>
						</div>
					</div>

					<div class="flex p-3 border-b-2 border-blue-100">
						<div class="w-[75px]">
							<p class="text-2xl">📱</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700">Airtime</h1>
								<p class="text-sm italic">Utility</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600">N3,000</h1>
								<p />
							</div>
						</div>
					</div>

					<div class="flex p-3">
						<div class="w-[75px]">
							<p class="text-2xl">🥑</p>
						</div>
						<div class="flex justify-between items-start w-full">
							<div>
								<h1 class="font-bold text-gray-700">Foodstuff & stuff</h1>
								<p class="text-sm italic">Groceries</p>
							</div>
							<div class="col-span-2">
								<h1 class="font-semibold text-gray-600">N3,000</h1>
								<p />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.welcome {
		@apply p-6 rounded shadow-md bg-gray-700;
	}
</style>
