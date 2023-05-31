<script lang="ts">
	import ArrowUpAlt from './Arrow/ArrowUpAlt.svelte';

	export let type: string;
	export let normal: number | undefined = undefined;
	export let jar: number | undefined = undefined;
	export let buyer: string;
	export let price: number;
	export let paid: boolean;
	export let paymentMode: string;
	export let item: 'CHIPS' | 'CAKE' = 'CHIPS';
	export let cakeQty: number | undefined = undefined;
</script>

<div class="preview-container grid gap-y-2">
	<h1 class="text-xl font-bold">Preview</h1>
	<div
		class="preview drop-shadow-lg flex gap-x-2 p-3 border-b-4 border-blue-200 dark:border-gray-600"
	>
		<div class="w-auto">
			{#if item === 'CHIPS'}
				<p class="text-2xl grid">🍟</p>
			{:else}
				<p class="text-2xl grid">🎂</p>
			{/if}
		</div>
		<div class="flex justify-between items-start w-full">
			<div>
				<h1 class="font-bold text-gray-700 dark:text-gray-200">{buyer}</h1>
				<div class="flex items-center gap-x-2">
					{#if item === 'CHIPS' && type && type === 'normal'}
						<div class="grid">
							<div class="flex items-center gap-x-2">
								<p class="text-sm italic">Normal</p>
								<span class="font-semibold">({normal})</span>
							</div>
							{#if paid}
								{#if paymentMode === 'cash'}
									<p>✔ Paid cash</p>
								{:else if paymentMode === 'transfer'}
									<p>✔ Paid by transfer</p>
								{/if}
							{:else}
								<p>❌ Not paid</p>
							{/if}
						</div>
					{:else if item === 'CHIPS' && type && type === 'jar'}
						<div class="grid">
							<div class="flex items-center gap-x-2">
								<p class="text-sm italic">Jar</p>
								<span class="font-semibold">({jar})</span>
							</div>
							{#if paid}
								{#if paymentMode === 'cash'}
									<p>✔ Paid cash</p>
								{:else if paymentMode === 'transfer'}
									<p>✔ Paid by transfer</p>
								{/if}
							{:else}
								<p>❌ Not paid</p>
							{/if}
						</div>
					{:else if item === 'CHIPS' && type && type === 'both'}
						<div class="grid">
							<div class="grid">
								<div class="flex text-sm">
									<p>Normal</p>
									<span class="font-bold">({normal})</span>
								</div>
								<div class="flex text-sm">
									<p>Jar</p>
									<span class="font-bold">({jar})</span>
								</div>
							</div>
							{#if paid}
								{#if paymentMode === 'cash'}
									<p>✔ Paid cash</p>
								{:else if paymentMode === 'transfer'}
									<p>✔ Paid by transfer</p>
								{/if}
							{:else}
								<p>❌ Not paid</p>
							{/if}
						</div>
					{:else}
						<div class="grid">
							<div class="flex items-center gap-x-2">
								<p class="text-sm italic">{type}</p>
							</div>
							{#if paid}
									<p>✔ Paid {paymentMode === 'cash' ? 'cash' : paymentMode === 'transfer' ? 'by transfer' : ""}</p>
							{:else}
								<p>❌ Not paid</p>
							{/if}
						</div>
					{/if}
				</div>
			</div>
			<div class="col-span-2 grid justify-items-center">
				{#if item === 'CHIPS' && type && type === 'both' && normal && normal > 0 && jar && jar > 0}
					<p class="font-semibold">x {normal + jar}</p>
				{:else if item === 'CAKE'}
					<p class="font-semibold">x {cakeQty}</p>
				{/if}
				<h1 class="font-semibold text-gray-600 dark:text-gray-300">
					N{price}
				</h1>
				<div class="flex justify-center">
					<ArrowUpAlt class="text-green-400 text-xl font-extrabold" />
				</div>
			</div>
		</div>
	</div>
</div>
