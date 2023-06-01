<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowUpAlt from '$lib/components/Arrow/ArrowUpAlt.svelte';
	import ItemPreview from '$lib/components/ItemPreview.svelte';
	import type { ActionData, SubmitFunction } from './$types';

	type LogCakeErrorType = {
		buyer?: string;
		type?: string;
		quantity?: string;
		price?: string;
		paid?: string;
		paymentMode?: string;
		message?: string;
	};

	let buyer: string = '';
	let type: string = '';
	let quantity: number | undefined = undefined;
	let price: number | undefined = undefined;
	let paid: string = '';
	let paymentMode: string = '';
	let error: LogCakeErrorType = {
		buyer: undefined,
		type: undefined,
		quantity: undefined,
		price: undefined,
		paid: undefined,
		paymentMode: undefined,
		message: undefined
	};

	const logExpense: SubmitFunction = ({ form, data, action, cancel }) => {
		const { buyer, type, quantity, price, paid, paymentMode } = Object.fromEntries(data) as {
			buyer: string;
			type: string;
			quantity: string;
			price: string;
			paid: string;
			paymentMode: string;
		};

		if (!buyer.length) {
			console.log('Stop that!');
			error.buyer = "Buyer's name cannot be empty!";
			cancel();
			return;
		}

		if (!type.length) {
			console.log("You're selling air?");
			error.type = 'Type cannot be empty!';
			cancel();
			return;
		}

		if (!price.length || !parseInt(price) || parseInt(price) <= 0) {
			console.log('Price must be greater than 0');
			error.price = 'Price must be greater than 0';
			cancel();
			return;
		}

		if (!parseInt(quantity) || parseInt(quantity) <= 0) {
			console.log("Again, you're selling air?");
			error.quantity = 'Quantity must be at least 1';
			cancel();
			return;
		}

		if (!paid.length) {
			console.log('You must collect your money!');
			error.paid = 'Option cannot be empty!';
			cancel();
			return;
		}

		if (!paymentMode.length) {
			console.log('Cash or Trasnfer. Pick one!');
			error.paymentMode = 'Option cannot be empty!';
			cancel();
			return;
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					error.buyer = result.data?.buyer;
					error.type = result.data?.type;
					error.price = result.data?.price;
					error.quantity = result.data?.quantity;
					error.paid = result.data?.paid;
					error.paymentMode = result.data?.paymentMode;
					error.message = result.data?.message;
					break;
				case 'success':
					console.log('result', result);
					break;
				default:
					console.log('fail', result && result);
					break;
			}

			return result;
			// await update({ reset: false });
			// if (result.type === 'success') goto('/profile');
		};
	};
</script>

<div class="h-full px-4 pb-24">
	<form action="?/add-cake" method="POST" use:enhance={logExpense} class="flex flex-col gap-y-8">
		<label for="buyer">
			Buyer
			<input
				name="buyer"
				type="text"
				class="font-semibold bg-transparent border-b outline-none w-full p-3"
				placeholder="Segun Alinco"
				aria-invalid={error && error.buyer && error.buyer.length > 0 ? true : false}
				aria-errormessage={(error && error.buyer) || ''}
				aria-required={(error && error.buyer && error.buyer.length > 0) || undefined}
				bind:value={buyer}
				on:keypress={(e) => {
					error.buyer = undefined;
				}}
			/>
			{#if error && error.buyer}
				<p class="text-red-500 text-sm italic">{error.buyer}</p>
			{/if}
		</label>

		<label for="type">
			Type of cake
			<input
				name="type"
				type="text"
				class="font-semibold bg-transparent border-b outline-none w-full p-3"
				placeholder="12in Vanilla cake"
				aria-invalid={error && error.type && error.type.length > 0 ? true : false}
				aria-errormessage={(error && error.type) || ''}
				aria-required={(error && error.type && error.type.length > 0) || undefined}
				bind:value={type}
				on:keypress={(e) => {
					error.type = undefined;
				}}
			/>
			{#if error && error.type}
				<p class="text-red-500 text-sm italic">{error.type}</p>
			{/if}
		</label>

		<label for="price">
			Price
			<input
				name="price"
				type="number"
				class="font-semibold bg-transparent border rounded outline-none w-full p-3"
				bind:value={price}
				min={1}
				aria-invalid={error && error.price && error.price.length > 0 ? true : false}
				aria-errormessage={(error && error.price) || ''}
				aria-required={(error && error.price && error.price.length > 0) || undefined}
				on:keypress={(e) => {
					error.price = undefined;
				}}
			/>
			{#if error && error.price}
				<p class="text-red-500 text-sm italic">{error.price}</p>
			{/if}
		</label>

		<label for="quantity">
			Quantity
			<input
				type="number"
				name="quantity"
				class="bg-transparent border rounded outline-none w-full p-3"
				bind:value={quantity}
				min={1}
				max={1000}
				aria-invalid={error && error.quantity && error.quantity.length > 0 ? true : false}
				aria-errormessage={(error && error.quantity) || ''}
				aria-required={(error && error.quantity && error.quantity.length > 0) || undefined}
				on:keypress={(e) => {
					error.quantity = undefined;
				}}
			/>
			{#if error && error.quantity}
				<p class="text-red-500 text-sm italic">{error.quantity}</p>
			{/if}
		</label>

		<label for="paid">
			Has buyer paid?
			<select
				bind:value={paid}
				name="paid"
				aria-invalid={error && error.paid && error.paid.length > 0 ? true : false}
				aria-errormessage={(error && error.paid) || ''}
				aria-required={(error && error.paid && error.paid.length > 0) || undefined}
				on:change={(e) => {
					error.paid = undefined;
				}}
			>
				<option value="">Select option</option>
				<option value="yes">✔ Yes</option>
				<option value="no">❌ No</option>
			</select>
			{#if error && error.paid}
				<p class="text-red-500 text-sm italic">{error.paid}</p>
			{/if}
		</label>

		<label for="payment-mode">
			Payment mode
			<select
				bind:value={paymentMode}
				name="paymentMode"
				aria-invalid={error && error.paymentMode && error.paymentMode.length > 0 ? true : false}
				aria-errormessage={(error && error.paymentMode) || ''}
				aria-required={(error && error.paymentMode && error.paymentMode.length > 0) || undefined}
				on:change={(e) => {
					error.paymentMode = undefined;
				}}
			>
				<option value="">Select option</option>
				<option value="cash">💵 Cash</option>
				<option value="transfer">📲 Transfer</option>
			</select>
			{#if error && error.paymentMode}
				<p class="text-red-500 text-sm italic">{error.paymentMode}</p>
			{/if}
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
