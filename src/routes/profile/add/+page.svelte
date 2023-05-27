<script>
	import ArrowUp from '../../../components/Arrow/ArrowUp.svelte';
</script>

<div class="h-full px-4">
	<form action="?/add" method="POST" class="grid gap-y-8">
		<label for="amount" class="grid gap-y-2 font-semibold">
			How much did you spend?
			<div class="flex justify-center items-end">
				<input
					type="text"
					class="text-xl bg-transparent border-b outline-none w-full p-4"
					placeholder="1000"
				/>
				<sup class="text-lg font-semibold">N</sup>
			</div>
		</label>
		<label for="amount" class="grid gap-y-2 font-semibold">
			What did you spend money on?
			<input
				type="text"
				class="text-xl bg-transparent border-b outline-none w-full p-4"
				placeholder="Airtime, Foodstuff etc..."
			/>
		</label>
		<label for="amount" class="grid gap-y-2 font-semibold">
			What type of expense is this?
			<div class="flex gap-x-8">
				<div class="flex gap-x-3">
					<input
						type="radio"
						class="text-xl bg-transparent border-b outline-none p-4"
						name="expense-type"
						value="debit"
					/>
					<p class="text-sm">Debit</p>
				</div>
				<div class="flex gap-x-3">
					<input
						type="radio"
						class="text-xl bg-transparent border-b outline-none p-4"
						name="expense-type"
						value="credit"
					/>
					<p class="text-sm">Credit</p>
				</div>
			</div>
		</label>
		<label for="amount" class="grid gap-y-2 font-semibold">
			What category does this fall under?
			<select name="category" id="" class="text-sm border-b pb-2">
				<option value="">Select the expense category</option>
				<option value="">Utility Bill</option>
				<option value="">One or two</option>
				<option value="">Restaurant</option>
				<option value="">Fast Food</option>
				<option value="">Cake Order</option>
			</select>
		</label>
		<div class="preview-container grid">
			<h1 class="text-xl font-bold">Preview</h1>
			<div class="preview drop-shadow-lg flex p-3 border-b-2 border-blue-200 dark:border-gray-600">
				<div class="w-[75px]">
					<p class="text-2xl">🎂</p>
				</div>
				<div class="flex justify-between items-start w-full">
					<div>
						<h1 class="font-bold text-gray-700 dark:text-gray-200">Chocolate Cake 12in</h1>
						<p class="text-sm italic">Cake Order</p>
					</div>
					<div class="col-span-2">
						<h1 class="font-semibold text-gray-600 dark:text-gray-300">N8,500</h1>
						<div class="flex justify-center">
							<ArrowUp class="text-green-400 text-xl font-extrabold" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<button
			class="dark:bg-blue-400 border-2 border-blue-200 dark:border-none rounded px-34 py-2 dark:text-gray-100 text-blue-500 font-semibold drop-shadow-lg"
			>Log expense</button
		>
	</form>
</div>

<style lang="postcss">
</style>
