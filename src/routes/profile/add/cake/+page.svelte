<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowUpAlt from '$lib/components/Arrow/ArrowUpAlt.svelte';
	import ItemPreview from '$lib/components/ItemPreview.svelte';
	import type { ActionData, SubmitFunction } from './$types';

	export let form: ActionData;
	let loading: boolean;

	let buyer: string = '';
	let type: string = '';
	let quantity: number | undefined = undefined;
	let price: number | undefined = undefined;
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

<div class="h-full px-4 pb-24">
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
			Type of cake
			<input
				required
				name="type"
				type="text"
				bind:value={type}
				placeholder="12in Vanilla cake"
				class="font-semibold bg-transparent border-b outline-none w-full p-3"
			/>
		</label>

		<label for="type">
			Amount
			<input
				required
				name="amount"
				type="number"
				bind:value={price}
				class="font-semibold bg-transparent border rounded outline-none w-full p-3"
			/>
		</label>

		<label for="quantity">
			Quantity
			<input
				required
				type="number"
				name="normal-quantity"
				id=""
				bind:value={quantity}
				min={0}
				max={1000}
				class="bg-transparent border rounded outline-none w-full p-3"
			/>
		</label>

		<label for="paid">
			Has buyer paid?
			<select bind:value={paid} name="paid" required>
				<option value="">Select option</option>
				<option value="yes">✔ Yes</option>
				<option value="no">❌ No</option>
			</select>
		</label>

		<label for="payment-mode">
			Payment mode
			<select bind:value={paymentMode} name="payment-mode">
				<option value="">Select option</option>
				<option value="cash">💵 Cash</option>
				<option value="transfer">📲 Transfer</option>
			</select>
		</label>

		{#if buyer && type && quantity && quantity > 0 && price && price > 0}
			<ItemPreview
				{buyer}
				{type}
				price={price * quantity}
				paid={paid === 'yes' ? true : false}
				{paymentMode}
				item="CAKE"
				cakeQty={quantity}
			/>
		{/if}
		<button class="add-btn">Log expense</button>
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
