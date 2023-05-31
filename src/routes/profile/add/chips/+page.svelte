<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowUpAlt from '$lib/components/Arrow/ArrowUpAlt.svelte';
	import ItemPreview from '$lib/components/ItemPreview.svelte';
	import type { ActionData, SubmitFunction } from './$types';

	export let form: ActionData;
	let loading: boolean;

	let buyer: string = '';
	let type: string = '';
	let quantity: { normal: number; jar: number } = { normal: 0, jar: 0 };
	let paid: string = '';
	let paymentMode: string = '';

	const calculateTotalPrice = (qty: number, type: string) => {
		if (type.toLowerCase() === 'normal') {
			return qty * 100;
		}
		return qty * 1200;
	};

	const logExpense: SubmitFunction = ({ form, data, action, cancel }) => {
		const { expenseAmount, expenseName, expenseType, expenseCategory } = Object.fromEntries(
			data
		) as {
			expenseAmount: string;
			expenseName: string;
			expenseType: string;
			expenseCategory: string;
		};
		if (!expenseAmount || !expenseName || !expenseCategory || !expenseType) {
			cancel();
			return;
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					console.log('fail', result.data);
					break;
				case 'success':
					console.log('result', result);
					break;
				default:
					break;
			}

			return result;
			// await update({ reset: false });
			// if (result.type === 'success') goto('/profile');
		};
	};
</script>

<div class="h-full px-4 pb-28">
	<form action="?/log-expense" method="POST" use:enhance={logExpense} class="flex flex-col gap-y-8">
		<label for="buyer">
			Buyer
				<input
					required
					name="buyer"
					type="text"
					class="font-semibold bg-transparent border-b outline-none w-full p-3"
					placeholder="Segun Alinco"
					bind:value={buyer}
				/>
		</label>

		<label for="type">
			Type
			<select
				bind:value={type}
				name="type"
				id="type"
				required
			>
				<option value="">Select an option</option>
				<option value="normal">Normal</option>
				<option value="jar">Jar</option>
				<option value="both">Both</option>
			</select>
		</label>

		<label for="quantity">
			Quantity
			<div class="grid grid-cols-2 gap-x-6 px-4">
				<div class="grid font-semibold text-sm">
					<p>Normal</p>
					<input
						required={type === 'normal' || type == 'both'}
						type="number"
						name="normal-quantity"
						id=""
						bind:value={quantity.normal}
						min={0}
						max={1000}
						class="bg-transparent border rounded outline-none w-full p-3"
					/>
				</div>
				<div class="grid font-semibold text-sm">
					<p>Jar</p>
					<input
						required={type === 'jar' || type === 'both'}
						type="number"
						name="normal-quantity"
						id=""
						bind:value={quantity.jar}
						min={0}
						max={1000}
						class="bg-transparent border rounded outline-none w-full p-3"
					/>
				</div>
			</div>
		</label>

		<label for="paid">
			Has buyer paid?
			<select
				bind:value={paid}
				name="paid"
			>
				<option value="">Select option</option>
				<option value="yes">✔ Yes</option>
				<option value="no">❌ No</option>
			</select>
		</label>

		<label for="payment-mode">
			Payment mode
			<select
				bind:value={paymentMode}
				name="payment-mode"
			>
				<option value="">Select option</option>
				<option value="cash">💵 Cash</option>
				<option value="transfer">📲 Transfer</option>
			</select>
		</label>

		{#if buyer && type && type === 'normal' && quantity.normal > 0}
			<!-- <div class="preview-container grid">
				<h1 class="text-xl font-bold">Preview</h1>
				<div
					class="preview drop-shadow-lg flex p-3 border-b-2 border-blue-200 dark:border-gray-600"
				>
					<div class="w-[75px]">
						<p class="text-2xl grid">🍟</p>
					</div>
					<div class="flex justify-between items-start w-full">
						<div>
							<h1 class="font-bold text-gray-700 dark:text-gray-200">{buyer}</h1>
							<div class="flex items-center gap-x-2">
								{#if type && type === 'normal'}
									<p class="text-sm italic">Normal</p>
								{:else if type && type === 'jar'}
									<p class="text-sm italic">Jar</p>
								{:else if type && type === 'both'}
									<div class="grid">
										<div class="flex text-sm">
											<p>Normal</p>
											<span class="font-bold">({quantity.normal})</span>
										</div>
										<div class="flex text-sm">
											<p>Jar</p>
											<span class="font-bold">({quantity.jar})</span>
										</div>
									</div>
								{/if}
							</div>
						</div>
						<div class="col-span-2">
							{#if type && type === 'normal' && quantity.normal > 0}
								<p class="font-semibold">x {quantity.normal}</p>
							{:else if type && type === 'jar' && quantity.jar > 0}
								<p class="font-semibold">x {quantity.jar}</p>
							{:else if type && type === 'both' && quantity.normal > 0 && quantity.jar > 0}
								<p class="font-semibold">x {quantity.normal + quantity.jar}</p>
							{/if}
							<h1 class="font-semibold text-gray-600 dark:text-gray-300">
								{#if type && type === 'normal' && quantity.normal > 0}
									N{calculateTotalPrice(quantity.normal, 'normal')}
								{:else if type && type === 'jar' && quantity.jar > 0}
									N{calculateTotalPrice(quantity.jar, 'jar')}
								{:else if type && type === 'both' && quantity.normal > 0 && quantity.jar > 0}
									N{calculateTotalPrice(quantity.jar + quantity.normal, 'both')}
								{/if}
							</h1>
							<div class="flex justify-center">
								<ArrowUpAlt class="text-green-400 text-xl font-extrabold" />
							</div>
						</div>
					</div>
				</div>
			</div> -->
			<ItemPreview
				{buyer}
				{type}
				normal={quantity.normal}
				price={calculateTotalPrice(quantity.normal, 'normal')}
				paid={paid === 'yes' ? true : false}
				{paymentMode}
				item="CHIPS"
			/>
		{:else if buyer && type && type === 'jar' && quantity.jar > 0}
			<ItemPreview
				{buyer}
				{type}
				jar={quantity.jar}
				price={calculateTotalPrice(quantity.jar, 'jar')}
				paid={paid === 'yes' ? true : false}
				{paymentMode}
				item="CHIPS"
			/>
		{:else if buyer && type && type === 'both' && quantity.normal > 0 && quantity.jar > 0}
			<ItemPreview
				{buyer}
				{type}
				normal={quantity.normal}
				jar={quantity.jar}
				price={calculateTotalPrice(quantity.normal, 'normal') + calculateTotalPrice(quantity.jar, 'jar')}
				paid={paid === 'yes' ? true : false}
				{paymentMode}
				item="CHIPS"
			/>
		{/if}

		<button
			class="add-btn"
			>Log expense</button
		>
	</form>
</div>

<style lang="postcss">
	label {
		@apply grid gap-y-2 font-bold;
	}
	select {
		@apply text-sm border-b flex gap-x-3 outline-none p-2 font-semibold;
	}

	.add-btn {
		@apply dark:bg-blue-400 border-2 border-blue-200 dark:border-none rounded py-2 dark:text-gray-100 text-blue-500 font-semibold drop-shadow-lg;
	}
</style>
